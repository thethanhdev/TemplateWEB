import { useEffect, useState, useRef } from 'react';

// Simple reusable hook that returns a ref and a boolean indicating
// whether the element is in the viewport. Uses IntersectionObserver.
export default function useInView(options = { once: true, threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      // Server or very old browser fallback: consider visible.
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          if (options && options.once) observer.unobserve(el);
        } else {
          if (!options || !options.once) setInView(false);
        }
      },
      { threshold: options.threshold ?? 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return [ref, inView];
}
