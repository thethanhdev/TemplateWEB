import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '../context/LocaleContext';
import useInView from './useInView';

export default function FeaturedServices() {
  const { t } = useLocale();
  const [ref, inView] = useInView({ once: true, threshold: 0.12 });

  return (
    <section className="text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left column: heading + CTA */}
          <div className={`${inView ? 'reveal-visible' : 'reveal-hidden'} flex flex-col items-start gap-6`} style={{ transitionDelay: inView ? '120ms' : '0ms' }}>
            <div className="flex items-center gap-6">
              <h2 className="text-5xl md:text-6xl  leading-none">
                <span className="block">{t('featured.title_line1')}</span>
                <span className="block text-gray-300">{t('featured.title_line2')}</span>
              </h2>
              <div className="hidden md:block flex-1 h-px bg-gray-700/50 ml-6" />
            </div>

          

            <div className="flex items-center gap-4">
              <Link href="/services" legacyBehavior>
                <a aria-label={t('featured.cta')} className="px-6 py-3 border-2 border-gray-300/40 rounded-md text-white hover:bg-white/10 transition">{t('featured.cta')}</a>
              </Link>
            </div>
          </div>

          {/* Right column: gallery / featured image */}
          <div className={`${inView ? 'reveal-visible' : 'reveal-hidden'} flex justify-center lg:justify-end`} style={{ transitionDelay: inView ? '320ms' : '0ms' }}>
            <div className="w-72 h-72 md:w-80 md:h-80 relative group">
              <Image src="/images/hero1.jpg" alt={t('featured.image_alt') || 'featured'} layout="fill" objectFit="cover" className="rounded-sm" priority={false} />

              {/* decorative border */}
              <div className="absolute -inset-2 border-2 border-gray-300/30 rounded-sm transform group-hover:scale-105 transition-transform pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
