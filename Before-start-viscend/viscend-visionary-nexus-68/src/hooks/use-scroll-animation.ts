import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let didIntersect = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          didIntersect = true;
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);

      // Fallback: if observer hasn't fired (some embed/design previews), reveal only if element is already near viewport
      const fallback = setTimeout(() => {
        if (!didIntersect && currentElement) {
          const rect = currentElement.getBoundingClientRect();
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          // reveal only if element is within or near the viewport
          if (rect.top < viewportHeight * (1 + threshold) && rect.bottom > 0) {
            setIsVisible(true);
          }
        }
      }, 500);

      return () => {
        clearTimeout(fallback);
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    }

    return () => {};
  }, [threshold]);

  return { elementRef, isVisible };
};
