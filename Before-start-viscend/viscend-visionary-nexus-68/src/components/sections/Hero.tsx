import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ChevronDown, Sparkles, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface HeroProps {
  language: "en" | "ar";
}

const Hero = ({ language }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { elementRef, isVisible } = useScrollAnimation();

  const content = {
    en: {
      subtitle: "Your Digital Success Partner",
      title: "VisCend - Your Partner for",
      titleHighlight: "Digital Success",
      description: "Our goal is to help you succeed in the digital world. We transform your ideas into powerful visual productions and cutting-edge web solutions that drive real results.",
      ctaPrimary: "Start Your Project",
      ctaSecondary: "View Our Work",
      stats: [
        { number: "150+", label: "Projects Completed" },
        { number: "50+", label: "Happy Clients" },
        { number: "5+", label: "Years Experience" },
        { number: "24/7", label: "Support Available" }
      ],
      services: [
        { 
          icon: Sparkles, 
          title: "Studio", 
          subtitle: "Visual Productions",
          description: "VFX, 3D Animation, Motion Graphics"
        },
        {
          icon: Code,
          title: "Web",
          subtitle: "Digital Solutions",
          description: "Websites, E-commerce, Custom Apps"
        }
      ]
    },
    ar: {
      subtitle: "شريكك في النجاح الرقمي",
      title: "فِسند - شريكك في",
      titleHighlight: "النجاح الرقمي",
      description: "هدفنا هو مساعدتك على النجاح في العالم الرقمي. نحول أفكارك إلى إنتاج مرئي قوي وحلول ويب متطورة تحقق نتائج حقيقية.",
      ctaPrimary: "ابدأ مشروعك",
      ctaSecondary: "شاهد أعمالنا",
      stats: [
        { number: "150+", label: "مشروع مكتمل" },
        { number: "50+", label: "عميل سعيد" },
        { number: "5+", label: "سنوات خبرة" },
        { number: "24/7", label: "دعم متاح" }
      ],
      services: [
        { 
          icon: Sparkles, 
          title: "الاستوديو", 
          subtitle: "الإنتاج المرئي",
          description: "المؤثرات البصرية، الرسوم ثلاثية الأبعاد، الجرافيك المتحرك"
        },
        { 
          icon: Code, 
          title: "الويب", 
          subtitle: "الحلول الرقمية",
          description: "المواقع، التجارة الإلكترونية، التطبيقات المخصصة"
        }
      ]
    }
  };

  const t = content[language];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % t.services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [t.services.length]);

  return (
    <motion.section 
      ref={elementRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 pointer-events-none z-0" />
      
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="dynamic-hero-bg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-3xl opacity-90" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full glass border border-primary/20 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Sparkles className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary relative z-[10]">
                {t.subtitle}
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="block text-foreground mb-2 relative z-[30]">
                {t.title}
              </span>
              <span className="block text-gradient-primary animate-gradient-shift bg-[length:200%_auto] relative z-[30]">
                {t.titleHighlight}
              </span>
            </motion.h1>

            <motion.div
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-7 relative z-[10] pt-[34px] pointer-events-none"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {language === 'en' ? (
                <p>
                  Our <strong>goal </strong>is to <strong>help you succeed in the digital world</strong>. We transform your ideas into powerful visual productions and cutting-edge web solutions that drive real results.
                </p>
              ) : (
                <p>
                  هدفنا هو <strong>مساعدتك على النجاح في العالم الرقمي</strong>. نحول أفكارك إلى إنتاج مرئي قوي وحلول ويب متطورة تحقق نتائج حقيقية.
                </p>
              )}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button 
                size="lg"
                className="btn-cinematic text-white border-none px-8 py-6 text-lg relative z-[10]"
                asChild
              >
                <Link to="/contact">
                  {t.ctaPrimary}
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="glass border-primary/30 hover:border-primary/50 px-8 py-6 text-lg relative z-[10]"
                asChild
              >
                <Link to="/portfolio" className="flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>{t.ctaSecondary}</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Services Preview */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8 mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {t.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className={cn(
                    "glass rounded-2xl p-8 transition-all duration-500 cursor-pointer group relative z-[10]",
                    "hover:scale-105 hover:shadow-cinematic",
                    currentSlide === index && "ring-2 ring-primary/50 shadow-neon"
                  )}
                  onClick={() => setCurrentSlide(index)}
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  animate={isVisible ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-primary group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-secondary font-medium mb-3">
                        {service.subtitle}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {t.stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 relative z-[10]">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground relative z-[10]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <ChevronDown className="h-6 w-6 text-primary" />
      </motion.div>
    </motion.section>
  );
};

export default Hero;
