import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '../context/LocaleContext';

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer
      className="text-white mt-12 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/footer.png')" }}
    >
      {/* overlay for contrast */}
      <div className="bg-black/60">
        <div className="max-w-6xl mx-auto px-6 py-16">

          {/* centered logo/icon */}
          <div className="flex justify-center mb-8">
            <div className="w-40 h-40 relative">
              <Image src="/images/logo.jpg" alt="logo" layout="fill" objectFit="contain" />
            </div>
          </div>

          {/* nav links row (centered) */}
          <nav className="border-t border-gray-700 pt-6">
            <ul className="flex flex-wrap justify-center gap-8 text-sm uppercase tracking-wider">
              <li>
                <Link href="/">{t('nav.home')}</Link>
              </li>
              <li>
                <Link href="/about">{t('nav.about')}</Link>
              </li>
              <li>
                <Link href="/gallery">{t('nav.gallery')}</Link>
              </li>
              <li>
                <Link href="/news">{t('nav.news')}</Link>
              </li>
              <li>
                <Link href="/contact">{t('nav.contact')}</Link>
              </li>
            </ul>
          </nav>

          {/* copyright / meta */}
          <div className="mt-8 text-center text-sm text-gray-300">
            <p>{t('footer.copyright')}</p>
            <p className="mt-1">{t('footer.design_by')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
