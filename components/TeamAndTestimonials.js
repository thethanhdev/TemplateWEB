import Image from 'next/image';
import { useLocale } from '../context/LocaleContext';
import useInView from './useInView';

export default function TeamAndTestimonials() {
  const { t } = useLocale();

  const [teamRef, teamInView] = useInView({ once: true, threshold: 0.12 });
  const [testRef, testInView] = useInView({ once: true, threshold: 0.12 });

  const artists = [
    { img: '/images/hero1.jpg', name: t('team.artists.0') },
    { img: '/images/hero2.jpg', name: t('team.artists.1') },
    { img: '/images/hero3.jpg', name: t('team.artists.2') },
  ];

  const testimonials = [
    { quote: t('testimonials.items.0.quote'), author: t('testimonials.items.0.author') },
    { quote: t('testimonials.items.1.quote'), author: t('testimonials.items.1.author') },
  ];

  return (
    <div className="space-y-12">
      {/* Team / Artists section */}
      <section ref={teamRef} className="text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Left: heading + description */}
            <div className={`${teamInView ? 'reveal-visible' : 'reveal-hidden'} flex flex-col items-start gap-4`} style={{ transitionDelay: teamInView ? '120ms' : '0ms' }}>
              <h2 className="text-xl md:text-6xl  leading-none uppercase">
                <span className="block">{t('team.title_line1')}</span>
                <span className="block text-gray-300">{t('team.title_line2')}</span>
              </h2>
              <p className="text-amber-100/90 w-[260px]">{t('team.description')}</p>

              <div className="flex items-center gap-6 mt-4">
                <button className="text-white/80 hover:text-white">←</button>
                <button className="text-white/80 hover:text-white">→</button>
              </div>
            </div>

            {/* Right: artist cards */}
            <div className="flex gap-6 justify-start lg:justify-end">
              {artists.map((a, i) => {
                const delay = `${Math.min(600, i * 140)}ms`;
                return (
                  <div key={i} className={`w-48 h-64 relative group ${teamInView ? 'reveal-visible' : 'reveal-hidden'}`} style={{ transitionDelay: teamInView ? delay : '0ms' }}>
                    <div className="absolute inset-0 border-4 border-gray-300/30 p-1 rounded-sm" />
                    <div className="relative w-48 h-64 overflow-hidden">
                      <Image src={a.img} alt={a.name || `artist-${i}`} layout="fill" objectFit="cover" className="rounded-sm" />
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">{a.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section ref={testRef} className="bg-section-muted text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className={`${testInView ? 'reveal-visible' : 'reveal-hidden'} text-4xl uppercase mb-8`} style={{ transitionDelay: testInView ? '80ms' : '0ms' }}>{t('testimonials.heading')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((it, idx) => (
              <blockquote key={idx} className={`${testInView ? 'reveal-visible' : 'reveal-hidden'} bg-black/20 p-6 rounded`} style={{ transitionDelay: testInView ? `${Math.min(600, idx * 160)}ms` : '0ms' }}>
                <p className="text-lg text-amber-100/90">“{it.quote}”</p>
                <footer className="mt-4 text-sm text-gray-300">— {it.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
