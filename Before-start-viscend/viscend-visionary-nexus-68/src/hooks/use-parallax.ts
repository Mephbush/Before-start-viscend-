import { RefObject } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

export interface ParallaxConfig {
  start?: number; // start offset in px
  end?: number;   // end offset in px
  distance?: number; // translate distance in px
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  { start = 0, end = 400, distance = 60 }: ParallaxConfig = {}
): { y: MotionValue<string> } => {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yRaw = useTransform(scrollYProgress, [0, 1], [start, -end]);
  const y = useTransform(yRaw, (v) => `translateY(${(v / end) * distance}px)`);
  return { y };
};
