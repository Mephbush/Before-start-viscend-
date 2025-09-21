import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface IntroAnimationProps {
  onComplete: () => void;
  language?: "en" | "ar";
}

const IntroAnimation = ({ onComplete, language = "en" }: IntroAnimationProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),   // Logo fade in
      setTimeout(() => setStage(2), 1200),  // Text appear
      setTimeout(() => setStage(3), 2200),  // Description appear
      setTimeout(() => setStage(4), 3000),  // Fade out
      setTimeout(() => onComplete(), 3500), // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const brandName = language === 'ar' ? 'فِسند' : 'VisCend';

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500",
      "bg-gradient-to-br from-background via-background to-background/95",
      stage === 4 && "opacity-0 pointer-events-none"
    )}>
      <div className="relative z-10 text-center space-y-6">
        {/* Logo Animation - Clean SVG text */}
        <div className={cn(
          "transition-all duration-1000 transform",
          stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <div className="text-6xl font-bold text-primary">
            {brandName}
          </div>
        </div>

        {/* Company Name and Tagline */}
        <div className={cn(
          "transition-all duration-800 transform space-y-3",
          stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <h1 className="text-2xl font-semibold text-foreground">
            {language === 'ar' ? `شركة ${brandName} للتقنية` : `${brandName} Technologies`}
          </h1>
          <p className="text-lg text-muted-foreground">
            {language === 'ar' ? 'شريكك في النجاح الرقمي' : 'Your Digital Success Partner'}
          </p>
        </div>

        {/* Description */}
        <div className={cn(
          "transition-all duration-800 transform",
          stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            {language === 'ar'
              ? 'نساعدك لتحقيق أهدافك في العالم الرقمي من خلال حلول مبتكرة وتصميمات بصرية مبهرة'
              : 'We help you achieve your goals in the digital world through innovative solutions and striking visual design.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
