import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import React, { ReactNode, Children } from 'react';

interface ScrollRevealGroupProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: number; // per-item extra delay multiplier
  threshold?: number;
}

const ScrollRevealGroup = ({
  children,
  className = '',
  direction = 'up',
  stagger = 0.08,
  threshold = 0.12
}: ScrollRevealGroupProps) => {
  const distance = 40;
  const itemInitial = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: -distance, opacity: 0 },
    right: { x: distance, opacity: 0 }
  } as any;

  const childArray = Children.toArray(children);

  const RevealItem = ({ child, idx }: { child: ReactNode; idx: number }) => {
    const { elementRef, isVisible } = useScrollAnimation(threshold);

    const variants = {
      hidden: itemInitial[direction] || { y: distance, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: idx * stagger
        }
      }
    } as any;

    return (
      <motion.div
        ref={elementRef as any}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={variants}
      >
        {child}
      </motion.div>
    );
  };

  return (
    <div className={className}>
      {childArray.map((child, idx) => (
        <RevealItem key={idx} child={child} idx={idx} />
      ))}
    </div>
  );
};

export default ScrollRevealGroup;
