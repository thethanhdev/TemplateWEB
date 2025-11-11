import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Introduction from '../components/Introduction';
import TeamAndTestimonials from '../components/TeamAndTestimonials';
import Achievements from '../components/Achievements';
import Gallery from '../components/Gallery';
import ContactForm from '../components/ContactForm';
import { useLocale } from '../context/LocaleContext';

const galleryPhotos = ['/images/thumb1.jpeg', '/images/thumb2.jpeg', '/images/thumb3.jpeg', '/images/thumb4.jpeg'];

export default function GioiThieuPage() {
  const { t } = useLocale();

  return (
    <>
      <Head>
        <title>{t('introduction.title') || 'Giới thiệu'}</title>
        <meta name="description" content={t('introduction.paragraph') || 'Giới thiệu'} />
      </Head>

  <div className="text-white">
        <Navbar />

        {/* spacer to account for fixed navbar on md+ (uses height utility instead of padding) */}
        <div className="hidden md:block h-20" aria-hidden="true" />

        {/* Breadcrumb only (hide hero content) - white background */}
        <header className="bg-gray-300 border-b mt-8">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <div className="text-sm text-gray-700">{t('nav.home')} / {t('introduction.title') || 'Giới thiệu'}</div>
          </div>
        </header>
        {/* Hero / Intro (dark) - placed under breadcrumb like the provided screenshot */}
        <section className="bg-[#1b1b1b] text-white">
          <div className="max-w-6xl mx-auto px-6 py-12 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-hero uppercase tracking-wide mb-4">{t('introduction.brand') || 'XĂM MỰC THẬT'}</h1>
            {t('introduction.subtitle') && (
              <p className="italic text-xl md:text-2xl text-amber-100/90 mb-4">{t('introduction.subtitle')}</p>
            )}

            <h3 className="text-lg md:text-xl font-semibold mb-4">{t('introduction.title') || 'Giới thiệu về chúng tôi'}</h3>

            <div className="max-w-3xl mx-auto text-sm md:text-base text-amber-100/80 leading-relaxed">
              {t('introduction.paragraph')}
            </div>
          </div>

          {/* Large image below the intro text */}
          <div className="flex justify-center pb-12">
            <img src="/images/it1.jpg" alt="intro" className="w-[85%] max-w-4xl object-cover rounded-md shadow-lg" />
          </div>
          
            {/* Vision / Mission / Values block */}
            {t('introduction.vision_title') && (
              <div className="max-w-3xl mx-auto mt-8 text-left p-6 rounded">
                <h4 className="text-xl font-semibold mb-3 text-amber-100">{t('introduction.vision_title')}</h4>
                <p className="mb-3 text-amber-100/85">{t('introduction.vision_text')}</p>

                <h5 className="font-semibold mt-4 text-amber-100">{t('introduction.mission_title')}</h5>
                <p className="mb-3 text-amber-100/85">{t('introduction.mission_text')}</p>

                <h5 className="font-semibold mt-4 text-amber-100">{t('introduction.values_title')}</h5>
                {Array.isArray(t('introduction.values')) ? (
                  <ul className="list-disc list-inside mt-2 space-y-2 text-amber-100/85">
                    {t('introduction.values').map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}
            <div className="flex justify-center pb-12">
            <img src="/images/it2.jpg" alt="intro" className="w-[85%] max-w-4xl object-cover rounded-md shadow-lg" />
          </div>
            {/* About us block inserted under the it2 image */}
            {t('about_us') && (
              <div className="max-w-4xl mx-auto px-6 py-8 text-left text-amber-100/90">
                {t('about_us.heading') && <h2 className="text-2xl font-semibold mb-4">{t('about_us.heading')}</h2>}

                {Array.isArray(t('about_us.paragraphs')) ? (
                  t('about_us.paragraphs').map((p, i) => (
                    <p key={i} className="mb-3 text-amber-100/85">{p}</p>
                  ))
                ) : (
                  <p className="mb-3 text-amber-100/85">{t('about_us.paragraphs')}</p>
                )}

                {t('about_us.services') && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">{t('about_us.services.title')}</h3>
                    <p className="mb-4 text-amber-100/85">{t('about_us.services.intro')}</p>

                    {Array.isArray(t('about_us.services.items')) && t('about_us.services.items').map((item, idx) => (
                      <div key={idx} className="mb-4">
                        {item.title && <div className="font-semibold text-amber-100">{item.title}</div>}
                        {item.text && <div className="mb-2 text-amber-100/85">{item.text}</div>}
                        {Array.isArray(item.styles) && (
                          <ul className="list-disc list-inside ml-4 text-amber-100/85">
                            {item.styles.map((s, i2) => <li key={i2}>{s}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
        </section>

        <Footer />
      </div>
    </>
  );
}

