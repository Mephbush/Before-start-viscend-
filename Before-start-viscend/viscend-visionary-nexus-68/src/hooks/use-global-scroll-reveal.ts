import { useEffect } from 'react';

const SELECTOR = [
  '.animate-fade-in-up',
  '.animate-fade-in',
  '.animate-scale-in',
  '.animate-slide-in-left',
  '.animate-slide-in-right',
  '.animate-glow-pulse',
  '.animate-gradient-shift'
].join(',');

export const useGlobalScrollReveal = (stagger = 80) => {
  useEffect(() => {
    const cleanup = initGlobalScrollReveal(stagger);
    return () => cleanup && cleanup();
  }, [stagger]);
};

export const initGlobalScrollReveal = (stagger = 80) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const items = Array.from(document.querySelectorAll(SELECTOR)) as HTMLElement[];
  if (items.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    visible.forEach((entry, i) => {
      const el = entry.target as HTMLElement;
      const delay = i * stagger;
      setTimeout(() => {
        el.classList.add('sr-play');
      }, delay);
    });
  }, { threshold: 0.12 });

  items.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
};

export default useGlobalScrollReveal;
