import React, { useRef, useEffect, useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import useInView from './useInView';

export default function Gallery({ photos = [] }) {
  const { t } = useLocale();
  const sliderRef = useRef(null);

  // Load react-slick only on client (avoid SSR issues) and capture the real Slider
  const [LoadedSlider, setLoadedSlider] = useState(null);
  useEffect(() => {
    let mounted = true;
    import('react-slick').then((mod) => {
      if (mounted) setLoadedSlider(() => mod.default || mod);
      console.log('Gallery: react-slick loaded');
    }).catch((err) => {
      console.error('Failed to load react-slick', err);
    });
    return () => { mounted = false; };
  }, []);

  const PrevArrow = ({ className, style, onClick }) => (
    <button
      type="button"
      className={`${className} p-3 rounded-full  text-white shadow-md`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
      aria-label="Previous"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );

  const NextArrow = ({ className, style, onClick }) => (
    <button
      type="button"
      className={`${className} p-3 rounded-full text-white shadow-md`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
      aria-label="Next"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    // hide slick's internal overlay arrows; we'll use custom buttons in the right column
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const prev = () => {
    if (sliderRef.current && typeof sliderRef.current.slickPrev === 'function') {
      sliderRef.current.slickPrev();
    } else {
      console.warn('Gallery: sliderRef not ready (prev)', sliderRef.current);
    }
  };

  const next = () => {
    if (sliderRef.current && typeof sliderRef.current.slickNext === 'function') {
      sliderRef.current.slickNext();
    } else {
      console.warn('Gallery: sliderRef not ready (next)', sliderRef.current);
    }
  };

  const [ref, inView] = useInView({ once: true, threshold: 0.12 });

  // Individual slide component so each image can reveal when scrolled into view
  const PhotoSlide = ({ src, idx = 0 }) => {
    const [itemRef, itemInView] = useInView({ once: true, threshold: 0.12 });
  const delay = Math.min(800, idx * 150);
    return (
      <div className="px-0">
        <div
          ref={itemRef}
          className={`${itemInView ? 'reveal-visible' : 'reveal-hidden'} h-70 rounded overflow-hidden flex items-center justify-center`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <img
            src={src}
            alt={`gallery-${idx}`}
            loading="lazy"
            className="object-cover w-full h-full transform transition-transform duration-500 ease-out hover:scale-105"
          />
        </div>
      </div>
    );
  };

  return (
    <section ref={ref} className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-center ${inView ? 'reveal-visible' : 'reveal-hidden'}`}>
          {/* Left: slick slider showing two images side-by-side on wide screens */}
          <div className="md:col-span-2">
            {/* striped background applied only behind the slider area */}
            <div className="rounded overflow-hidden p-2">
              {photos.length ? (
                LoadedSlider ? (
                  <LoadedSlider ref={(c) => { sliderRef.current = c; console.log('Gallery: sliderRef set', c); }} {...settings}>
                    {photos.map((p, i) => (
                      <div key={i} className="px-2">
                        <PhotoSlide src={p} idx={i} />
                      </div>
                    ))}
                  </LoadedSlider>
                ) : (
                  <div className="h-80 w-full" />
                )
              ) : (
                <div className="h-80 w-full" />
              )}
            </div>
          </div>

          {/* Right: heading, description and nav */}
          <div className="text-right md:text-left flex flex-col items-end md:items-start">
            <h2 className="text-4xl md:text-5xl lg:text-6xl  leading-tight uppercase mb-4">
              {t('gallery.recent_heading')}
            </h2>

            <p className="max-w-md text-amber-100/80 mb-6">
              {t('gallery.description')}
            </p>

            {/* custom horizontal arrows under the description that control the slider */}
            <div className="flex items-center gap-8 mt-6">
              <button
                aria-label="previous"
                onClick={prev}
                className="flex items-center justify-center w-14 h-10 border border-amber-200/30 text-amber-200 hover:bg-white/5 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                aria-label="next"
                onClick={next}
                className="flex items-center justify-center w-14 h-10 border border-amber-200/30 text-amber-200 hover:bg-white/5 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
