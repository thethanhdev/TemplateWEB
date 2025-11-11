import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useLocale } from '../context/LocaleContext';
import useInView from './useInView';

SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);

const SLIDES = [
  '/images/hero.jpg',
  '/images/hero1.jpg',
  '/images/hero4.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg',
];

export default function Hero() {
  const { t } = useLocale();

  // Show navigation when mouse enters (desktop) or when user touches the hero (mobile).
  // On mobile we show it for a short time and then auto-hide to avoid always-blocking UI.
  const [showNav, setShowNav] = useState(false);
  const hideTimer = useRef(null);

  useEffect(() => {
    // On unmount, clear timer
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // On mount, briefly show nav for touch devices so users discover controls
  useEffect(() => {
    try {
      const isTouch = (typeof window !== 'undefined') && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      if (isTouch) {
        // show shortly to indicate controls, then hide
        triggerShowNav(2200);
      }
    } catch (e) {
      // ignore in non-browser environments
    }
  }, []);

  const triggerShowNav = (duration = 3000) => {
    setShowNav(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowNav(false), duration);
  };

  const handleTouchStart = () => {
    // show nav briefly on touch devices
    triggerShowNav(3500);
  };

  const handleMouseEnter = () => {
    // desktop: keep visible while hovering
    setShowNav(true);
  };

  const handleMouseLeave = () => {
    // desktop: hide when leaving
    setShowNav(false);
  };

  const [ref, inView] = useInView({ once: true, threshold: 0.15 });

  return (
  // On small screens the header is sticky and occupies layout space.
  // Set the hero container to a fixed 340px height on mobile so the visible image area equals 340px.
  // Keep desktop/md behaviour as before (min-h 60vh).
    <section
      ref={ref}
      className={`relative group ${showNav ? 'show-nav' : ''} h-[340px] md:h-auto md:min-h-[60vh] overflow-hidden ${inView ? 'reveal-visible' : 'reveal-hidden'}`}
      onTouchStart={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full"> 
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full"
      >
        {SLIDES.map((src, idx) => (
          <SwiperSlide key={idx} className="h-full">
            <div className="h-full w-full relative">
              <img src={src} alt={`hero-${idx}`} className="object-cover w-full h-full brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      {/* Centered hero text */}
      {/* Overlay for centered text - ensure it's above slides */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
        <div className="max-w-4xl text-center px-4 pointer-events-auto">
          {/* Main title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-hero text-white tracking-wide leading-tight hero-title" style={{ textShadow: '0 6px 18px rgba(0,0,0,0.7)' }}>
            {t('hero.title')}
          </h1>

          {/* Subtitle (smaller, slightly muted) */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-amber-100/90 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* Since line */}
          <div className="mt-4 text-amber-100/80 uppercase text-xs tracking-widest">
            SINCE 2013
          </div>

          {/* CTA: prominent bordered button */}
          <div className="mt-6 sm:mt-8">
            <a
              href="#contact"
              className="inline-block border-2 border-amber-300 text-amber-100 px-6 py-3 rounded-md font-semibold shadow-sm hover:bg-amber-400 hover:text-black transition-colors"
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>
      </div>

      {/* Floating circular user/contact button bottom-right */}
      <button aria-label="Chat" className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-gray-800/80 text-white flex items-center justify-center shadow-lg">👤</button>
    </section>
  );
}
