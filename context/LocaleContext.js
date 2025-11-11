import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '../locales/en.json';
import vi from '../locales/vi.json';

const LOCALES = { en, vi };

function getNested(obj, key) {
  if (!key) return '';
  return key.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), obj) || key;
}

const LocaleContext = createContext({ locale: 'vi', setLocale: () => {}, t: (k) => k });

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('vi');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('site-locale');
      if (saved && (saved === 'vi' || saved === 'en')) setLocale(saved);
      else {
        const nav = (typeof navigator !== 'undefined' && navigator.language) || 'vi';
        if (nav && nav.startsWith && nav.startsWith('en')) setLocale('en');
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('site-locale', locale);
    } catch (e) {}
  }, [locale]);

  const translations = useMemo(() => LOCALES[locale] || LOCALES.vi, [locale]);

  const t = (key) => getNested(translations, key);

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

export default LocaleContext;
