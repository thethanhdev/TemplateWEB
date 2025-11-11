import '../styles/globals.css';
// slick-carousel global styles (must be imported in _app.js)
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';
import { LocaleProvider } from '../context/LocaleContext';

export default function App({ Component, pageProps }) {
  return (
    <LocaleProvider>
      <Head>
        {/* Fonts: Montserrat for headings, Inter for body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />
  {/* Distinctive display font for hero title */}
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </LocaleProvider>
  );
}
