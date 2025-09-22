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

  const groups = Array.from(document.querySelectorAll('[data-sr-group]')) as HTMLElement[];
  const groupObservers: IntersectionObserver[] = [];

  // Observe groups first for stable per-section sequencing
  groups.forEach((group) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const children = Array.from(
          group.querySelectorAll(`${SELECTOR}, [data-sr]`)
        ) as HTMLElement[];

        children.forEach((el, i) => {
          const idx = Number(el.dataset.srIndex ?? i);
          const itemStagger = Number(el.dataset.srStagger ?? group.dataset.srStagger ?? stagger);
          const delay = idx * itemStagger;
          // Allow custom per-item delay override
          const overrideDelay = el.dataset.srDelay ? Number(el.dataset.srDelay) : null;
          const finalDelay = overrideDelay ?? delay;

          // Set CSS animation delay if not already specified inline
          if (!el.style.animationDelay) {
            el.style.animationDelay = `${finalDelay}ms`;
          }

          window.setTimeout(() => {
            el.classList.add('sr-play');
          }, finalDelay);
        });

        // Once played, unobserve group to avoid re-triggering
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    observer.observe(group);
    groupObservers.push(observer);
  });

  // Fallback: observe loose items not inside a group
  const groupedSet = new Set<HTMLElement>(groups.flatMap(g => Array.from(g.querySelectorAll('*')) as HTMLElement[]));
  const looseItems = (Array.from(document.querySelectorAll(SELECTOR)) as HTMLElement[])
    .filter((el) => !groupedSet.has(el));

  const looseObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    visible.forEach((entry, i) => {
      const el = entry.target as HTMLElement;
      const delay = i * stagger;
      el.style.animationDelay = `${delay}ms`;
      setTimeout(() => {
        el.classList.add('sr-play');
      }, delay);
    });
  }, { threshold: 0.12 });

  looseItems.forEach((el) => looseObserver.observe(el));

  return () => {
    groupObservers.forEach((o) => o.disconnect());
    looseObserver.disconnect();
  };
};

export default useGlobalScrollReveal;
