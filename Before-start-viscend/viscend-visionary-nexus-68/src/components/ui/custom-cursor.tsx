import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;
const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CustomCursor = () => {
  // Disable effects on mobile or when user prefers reduced motion
  if (isMobile() || prefersReducedMotion()) return null;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      const lastPosition = lastPositionRef.current;

      const dx = newPosition.x - lastPosition.x;
      const dy = newPosition.y - lastPosition.y;
      const speed = Math.hypot(dx, dy);

      // Generate particles based on movement speed
      if (speed > 6) {
        const particleCount = Math.min(Math.floor(speed / 15), 2);
        const newParticles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
          newParticles.push({
            id: Date.now() + Math.random(),
            x: lastPosition.x + (Math.random() - 0.5) * 12,
            y: lastPosition.y + (Math.random() - 0.5) * 12,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            life: 24,
            maxLife: 24,
          });
        }
        setParticles(prev => [...prev, ...newParticles].slice(-20)); // Keep max 20 particles
      }

      lastPositionRef.current = newPosition;
      setPosition(newPosition);
    };

    document.addEventListener('mousemove', updatePosition);
    return () => {
      document.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 1,
          vx: p.vx * 0.985,
          vy: p.vy * 0.985 + 0.08,
        }))
        .filter(p => p.life > 0)
      );
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9999]"
          style={{ left: particle.x - 2, top: particle.y - 2, width: '4px', height: '4px' }}
        >
          <div
            className={cn('w-full h-full rounded-full transition-all duration-100', 'bg-gradient-to-r from-primary to-secondary')}
            style={{ opacity: particle.life / particle.maxLife, transform: `scale(${particle.life / particle.maxLife})` }}
          />
        </div>
      ))}
    </>
  );
};

export default CustomCursor;
