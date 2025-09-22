import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import ScrollRevealGroup from '@/components/ui/scroll-reveal-group';

const SceneHeroParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ y: y1, opacity }} className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl bg-primary/15" />
        <motion.div style={{ y: y2 }} className="absolute -bottom-28 -left-28 w-96 h-96 rounded-full blur-3xl bg-secondary/15" />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div style={{ y: y1 }} className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-gradient-primary">Motion-first Experiences</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We build dynamic, scroll-driven interfaces that feel alive. Smooth parallax, staged reveals, and responsive layouts tuned for mobile, tablet, and desktop.
            </p>
          </motion.div>
          <motion.div style={{ y: y2 }} className="glass rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                { t: 'Performance', d: '60fps animations with Framer Motion' },
                { t: 'Responsive', d: 'Adaptive layouts for all screens' },
                { t: 'Accessible', d: 'Keyboard and screen reader friendly' },
                { t: 'Theming', d: 'Light/Dark with consistent contrast' },
              ].map((it) => (
                <div key={it.t} className="rounded-xl bg-muted/30 p-4">
                  <div className="text-sm text-secondary font-medium mb-1">{it.t}</div>
                  <div className="text-sm text-muted-foreground">{it.d}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SceneSmartProcess = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const steps = [
    { title: 'Discover', desc: 'Goals, users, constraints' },
    { title: 'Design', desc: 'Prototype motion-first' },
    { title: 'Develop', desc: 'Accessible & performant' },
    { title: 'Deliver', desc: 'Measure and iterate' },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-card/30" data-sr-group data-sr-stagger="100">
      <div className="container mx-auto px-4">
        <motion.div style={{ scale, opacity }} className="max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-3xl md:text-5xl font-bold text-gradient-primary">Smart Adaptive Process</h3>
          <p className="text-muted-foreground text-lg mt-4">Clear, sequential reveal without jumps. Optimized for mobile, tablet, and desktop.</p>
        </motion.div>

        <ScrollRevealGroup className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6" direction="up" stagger={0.12}>
          {steps.map((s) => (
            <div key={s.title} className="glass rounded-2xl p-5">
              <div className="text-xl font-semibold text-neon-primary">{s.title}</div>
              <div className="text-sm text-muted-foreground mt-2">{s.desc}</div>
            </div>
          ))}
        </ScrollRevealGroup>
      </div>
    </section>
  );
};

const SceneParallaxGallery = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const yB = useTransform(scrollYProgress, [0, 1], [-10, 30]);
  const yC = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const cards = [
    { k: 'studio', c: 'from-primary/20 to-secondary/20', title: 'Cinematic', desc: 'Studio-grade visuals' },
    { k: 'web', c: 'from-secondary/20 to-accent/20', title: 'Web Apps', desc: 'Robust digital products' },
    { k: 'brand', c: 'from-accent/20 to-primary/20', title: 'Brand', desc: 'Expressive identities' },
  ];

  return (
    <section ref={ref} className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div style={{ y: yA }} className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15" />
              <div className="mt-4 text-lg font-semibold text-neon-primary">{cards[0].title}</div>
              <div className="text-sm text-muted-foreground">{cards[0].desc}</div>
            </div>
          </motion.div>
          <motion.div style={{ y: yB }} className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-secondary/15 to-accent/15" />
              <div className="mt-4 text-lg font-semibold text-neon-secondary">{cards[1].title}</div>
              <div className="text-sm text-muted-foreground">{cards[1].desc}</div>
            </div>
          </motion.div>
          <motion.div style={{ y: yC }} className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-accent/15 to-primary/15" />
              <div className="mt-4 text-lg font-semibold text-primary">{cards[2].title}</div>
              <div className="text-sm text-muted-foreground">{cards[2].desc}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ScrollScenes = () => {
  return (
    <div className={cn('w-full')}> 
      <SceneHeroParallax />
      <SceneSmartProcess />
      <SceneParallaxGallery />
    </div>
  );
};

export default ScrollScenes;
