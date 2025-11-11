import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLocale } from '../context/LocaleContext';
import { useState, useEffect, useRef } from 'react';
import useInView from './useInView';

export default function Navbar() {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();

  const [scrolled, setScrolled] = useState(false);
  const isHome = router.asPath === '/' || router.pathname === '/';
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [logoReady, setLogoReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open and allow Esc to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      // add a class so we can hide other interactive UI (carousel arrows) while menu open
      document.body.classList.add('menu-open');
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const linkClass = (active) =>
    `border-b-2 border-transparent hover:border-amber-400 transition-colors py-1 ${active ? 'border-amber-400' : ''}`;

  // Draw shimmer effect continuously - runs every 1-2 seconds
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(DPR, DPR);

    let raf = null;
    let pos = 0;
    let animationComplete = false;

    function drawShimmer() {
      // Clear only if logo is ready, otherwise keep transparent
      if (logoReady) {
        ctx.clearRect(0, 0, w, h);
      } else {
        // Draw placeholder shimmer when logo not loaded
        ctx.clearRect(0, 0, w, h);
        const baseAlpha = 0.03;
        ctx.fillStyle = `rgba(0,0,0,${baseAlpha})`;
        const baseBarH = Math.max(4, Math.floor(h * 0.25));
        const baseY = (h - baseBarH) / 2;
        ctx.fillRect(0, baseY, w, baseBarH);
      }

      // Draw moving shimmer band (horizontal)
      const bandW = w * 0.28;
      const bandH = Math.max(6, Math.floor(h * 0.18));
      const x = (pos % (w + bandW)) - bandW;
      const g = ctx.createLinearGradient(x, 0, x + bandW, 0);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(0.5, logoReady ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.18)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      const y = (h - bandH) / 2;
      ctx.fillRect(x, y, bandW, bandH);

      pos += 3;

      // Check if shimmer completed one full cycle
      if (pos >= w + bandW) {
        animationComplete = true;
        pos = 0;
        // Wait 1 second before next shimmer
        setTimeout(() => {
          animationComplete = false;
          drawShimmer();
        }, 1000);
      } else {
        raf = requestAnimationFrame(drawShimmer);
      }
    }
    
    drawShimmer();

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [logoReady]);

  function handleLogoLoad() {
    setLogoReady(true);
    // Don't remove canvas - keep it for shimmer effect
  }

  const headerBg = scrolled ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/60 md:bg-transparent';
  const [navRef, navInView] = useInView({ once: true, threshold: 0 });

  return (
  // use sticky header on small screens so it occupies layout space (no need for hero padding)
  <header ref={navRef} className={`sticky top-0 md:fixed w-full z-50 transition-colors duration-300 ${headerBg} h-20 md:h-auto ${navInView ? 'reveal-visible' : 'reveal-hidden'}`} style={{ '--navbar-height': '5rem' }}>
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4 md:p-6 relative">
        {/* Left: hamburger on mobile and logo on desktop */}
        <div className="flex items-center">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="md:hidden p-2 rounded-md text-white hover:bg-black/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo: centered on small screens, left on md+ */}
          <Link href="/" legacyBehavior>
            <a className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none md:ml-4" style={{ padding: 0, border: '0 none', outline: 0, display: 'block' }} aria-label="Home">
              <div style={{ width: 184, height: 68, position: 'relative' }}>
                <img
                  ref={imgRef}
                  src="/images/logo.jpg"
                  alt="True Ink Studio"
                  onError={(e) => { e.currentTarget.src = '/images/noimage.png'; }}
                  onLoad={() => handleLogoLoad()}
                  style={{ border: '0 none', outline: 0, margin: 2, width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
                <canvas
                  ref={canvasRef}
                  width="184"
                  height="68"
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    width: '100%', 
                    height: '100%', 
                    pointerEvents: 'none'
                  }}
                ></canvas>
              </div>
            </a>
          </Link>
        </div>

        {/* Centered menu */}
  <ul className="hidden md:flex gap-8 items-center text-xs lg:text-sm uppercase text-white/90 absolute left-1/2 transform -translate-x-1/2">
          <li>
            <Link href="/" legacyBehavior>
              <a className={linkClass(isHome)}>{t('nav.home')}</a>
            </Link>
          </li>
          <li>
            <Link href="/gioi-thieu" legacyBehavior>
              <a className={linkClass(false)} onClick={() => { /* keep client nav simple */ }}>{t('nav.about')}</a>
            </Link>
          </li>
          <li>
            <a className={linkClass(false)} href="#">{t('nav.gallery')}</a>
          </li>
          <li>
            <a className={linkClass(false)} href="#news">{t('nav.news')}</a>
          </li>
          <li>
            <a className={linkClass(false)} href="#contact">{t('nav.contact')}</a>
          </li>
        </ul>

        {/* Right controls: phone + flags (flags visible on mobile to the right) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            {/* language flags: visible on mobile and desktop */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-full">
              <button
                onClick={() => setLocale('vi')}
                aria-label="Vietnamese"
                className={`p-0.5 rounded ${locale === 'vi' ? 'ring-2 ring-amber-400' : 'opacity-80 hover:opacity-100'}`}>
                <img src="/images/vi.jpg" alt="VI" className="h-5 w-7 object-cover rounded-sm" />
              </button>
              <button
                onClick={() => setLocale('en')}
                aria-label="English"
                className={`p-0.5 rounded ${locale === 'en' ? 'ring-2 ring-amber-400' : 'opacity-80 hover:opacity-100'}`}>
                <img src="/images/en.jpg" alt="EN" className="h-5 w-7 object-cover rounded-sm" />
              </button>
            </div>
          </div>

          <a className="hidden md:inline-flex bg-black/90 px-4 py-2 rounded-full text-white text-sm shadow-md hover:bg-black transition-colors flex items-center gap-2" href="tel:0387097651">📞 <span className="hidden sm:inline">038 709 7651</span></a>
        </div>
      </nav>

      {/* Mobile off-canvas menu (slides from left) */}
      {/* Mobile off-canvas menu (slides from left) */}
      <div className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* backdrop (fades) */}
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        <aside className={`relative left-0 w-72 sm:w-80 bg-gray-50 text-gray-900 shadow-xl h-full transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-3 flex items-center justify-between border-b border-gray-200">
              {/* left spacer (logo hidden in panel) */}
              <div className="w-6" />
              <div className="flex-1 text-center text-sm font-semibold">Menu</div>
              <button onClick={() => setMobileOpen(false)} aria-label="Close" className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-2">
              <ul className="flex flex-col text-base uppercase">
                <li className="border-b border-gray-200">
                  <Link href="/" legacyBehavior>
                    <a className={`flex justify-between items-center py-3 px-3 ${isHome ? 'text-amber-500' : ''}`} onClick={() => setMobileOpen(false)}>
                      <span>{t('nav.home')}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </Link>
                </li>
                <li className="border-b border-gray-200">
                  <Link href="/about" legacyBehavior>
                    <a onClick={() => setMobileOpen(false)} className="flex justify-between items-center py-3 px-3">{t('nav.about')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
                  </Link>
                </li>
                <li className="border-b border-gray-200">
                  <a onClick={() => setMobileOpen(false)} className="flex justify-between items-center py-3 px-3" href="#">{t('nav.gallery')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
                </li>
                <li className="border-b border-gray-200">
                  <a onClick={() => setMobileOpen(false)} className="flex justify-between items-center py-3 px-3" href="#news">{t('nav.news')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
                </li>
                <li className="border-b border-gray-200">
                  <a onClick={() => setMobileOpen(false)} className="flex justify-between items-center py-3 px-3" href="#contact">{t('nav.contact')}<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
                </li>
              </ul>

            </nav>
        </aside>
      </div>
    </header>
  );
}