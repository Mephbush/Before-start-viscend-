import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

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

const ScenePinnedSteps = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.75, 1]);

  const steps = [
    { title: 'Discover', desc: 'Understand goals, users, and constraints' },
    { title: 'Design', desc: 'Prototype motion-first, refine interactions' },
    { title: 'Develop', desc: 'Implement accessible, performant UI' },
    { title: 'Deliver', desc: 'Measure, iterate, and scale' },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div style={{ scale, opacity }} className="max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-3xl md:text-5xl font-bold text-gradient-primary">Scroll Staged Journey</h3>
          <p className="text-muted-foreground text-lg mt-4">Each step animates in sequence as you scroll, keeping focus and story flow.</p>
        </motion.div>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              style={{ opacity: useTransform(scrollYProgress, [0, 0.2 + i*0.2, 0.4 + i*0.2, 1], [0, 0, 1, 1]) }}
              className="glass rounded-2xl p-5"
            >
              <div className="text-xl font-semibold text-neon-primary">{s.title}</div>
              <div className="text-sm text-muted-foreground mt-2">{s.desc}</div>
            </motion.div>
          ))}
        </div>
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
      <ScenePinnedSteps />
      <SceneParallaxGallery />
    </div>
  );
};

export default ScrollScenes;
