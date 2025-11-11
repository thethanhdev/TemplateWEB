import Image from 'next/image';
import { useLocale } from '../context/LocaleContext';

export default function Achievements() {
  const { t } = useLocale();

  return (
    <section className=" text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Left: two images */}
          <div className="flex gap-6 justify-start">
            <div className="w-64 h-80 md:w-64 md:h-80 border-4 border-gray-300/30 p-1 bg-gray-800/10">
              <Image src="/images/123123hero.jpg" alt={t('achievements.image1_alt') || 'achievement1'} layout="fill" objectFit="cover" className="rounded-sm" />
            </div>

            <div className="w-64 h-80 md:w-64 md:h-80 border-4 border-gray-300/30 p-1 bg-gray-800/10">
              <Image src="/images/21321321hero.jpg" alt={t('achievements.image2_alt') || 'achievement2'} layout="fill" objectFit="cover" className="rounded-sm" />
            </div>
          </div>

          {/* Right: heading + details */}
          <div className="flex flex-col items-end lg:items-end text-right gap-4">
            <h2 className="text-4xl md:text-5xl  uppercase  leading-none">
              <span className="block">{t('achievements.title_line1')}</span>
              <span className="block text-2xl  text-gray-300">{t('achievements.title_line2')}</span>
            </h2>

            <div className="text-sm md:text-base text-amber-100/90 max-w-md">
              <p className="font-semibold">{t('achievements.detail_line1')}</p>
              <p className="mt-2">{t('achievements.detail_line2')}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
