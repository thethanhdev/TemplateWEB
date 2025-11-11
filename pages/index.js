import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import ContactForm from '../components/ContactForm';
import { useLocale } from '../context/LocaleContext';
import Introduction from '../components/Introduction';
import FeaturedServices from '../components/FeaturedServices';
import Achievements from '../components/Achievements';
import TeamAndTestimonials from '../components/TeamAndTestimonials';
import Footer from '../components/Footer';

const mockPhotos = [
  '/images/thumb1.jpeg',
  '/images/thumb2.jpeg',
  '/images/thumb3.jpeg',
  '/images/thumb4.jpeg',
  '/images/thumb5.jpeg',
];

export default function Home() {
  const { t } = useLocale();
  return (
    <>
      <Head>
        <title>PHUC CO Tatto - Demo</title>
        <meta name="description" content="Demo site built with Next.js + Tailwind" />
      </Head>
       <div className="min-h-screen text-white">
        <Navbar />
        <main>
          <Hero />
          <section className="bg-section-dark text-white">
            <div className="max-w-6xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-semibold mb-6"></h2>
                <Introduction />
            </div>
          </section>

          <section className="bg-section-muted text-white">
            <div className="max-w-6xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-semibold mb-6"></h2>
                <Gallery photos={mockPhotos} />
            </div>
          </section>

          <section className="bg-section-dark text-white">
            <div className="max-w-6xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-semibold mb-6"></h2>
                <FeaturedServices  />
            </div>
          </section>
        <section className="bg-section-muted text-white">
            <div className="max-w-6xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-semibold mb-6"></h2>
                <TeamAndTestimonials  />
            </div>
          </section>
        </main>

        <Footer />

      </div>
    </>
  );
}
