import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollRevealGroup from "@/components/ui/scroll-reveal-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Eye, 
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Users
} from "lucide-react";

const Services = () => {
  const { language } = useOutletContext<{ language: "en" | "ar" }>();

  const content = {
    en: {
      heroTitle: "Our Services",
      heroSubtitle: "Complete Creative & Digital Solutions",
      heroDescription: "From cinematic visual productions to powerful web solutions, we offer comprehensive services to transform your brand and drive your business forward.",

      overviewTitle: "Service Overview",
      studioTab: "Studio Services",
      webTab: "Web Services",
      
      studioServices: [
        {
          title: "VFX & CGI",
          description: "High-end visual effects and CGI that elevate storytelling and product visuals.",
          features: ["Compositing", "3D Integration", "Particle Systems", "Photorealistic Rendering"]
        },
        {
          title: "3D Animation",
          description: "Creative, production-ready 3D animation for products, characters and immersive experiences.",
          features: ["Character Animation", "Product Visualization", "Architectural Walkthrough", "Motion Capture"]
        },
        {
          title: "Motion Graphics",
          description: "Clear, on-brand motion design and kinetic typography to communicate complex ideas simply.",
          features: ["2D Animation", "Kinetic Typography", "Logo Animation", "Infographic Design"]
        },
        {
          title: "Brand Films",
          description: "Cinematic films focused on narrative and brand positioning to build emotional connections.",
          features: ["Concept Development", "Storyboarding", "Cinematography", "Color Grading"]
        },
        {
          title: "Promotional & Campaign Videos",
          description: "Strategic video content crafted for campaigns, product launches and social conversion — focused on storytelling and distribution-ready formats.",
          features: ["Scripted Campaigns", "Explainer Videos", "Social Media Ads", "Cut-downs & Edits for Platforms"]
        },
        {
          title: "Post-Production",
          description: "Finishing services including editing, color grading and audio design for broadcast-quality results.",
          features: ["Video Editing", "Color Grading", "Audio Mixing", "Sound Design"]
        }
      ],

      webServices: [
        {
          title: "End-to-End Website Development",
          description: "We design and build websites from concept to production: strategy, UI/UX, frontend, backend, hosting and ongoing support. Ready for growth.",
          features: ["Strategy & Planning", "UI/UX Design", "Frontend Development (React)", "Backend & APIs", "Deployment & Hosting", "Maintenance & Monitoring"]
        },
        {
          title: "E‑Commerce & Marketplaces",
          description: "Robust commerce platforms with secure payments, inventory management and merchant tools built for conversion and scale.",
          features: ["Secure Payment Integration", "Inventory & Orders", "Admin Dashboards", "Analytics & Optimization"]
        },
        {
          title: "Portfolio & Showcase Sites",
          description: "Fast, visually-driven portfolio sites that highlight your work and convert visitors to leads.",
          features: ["Gallery Systems", "Project Case Studies", "Fast Performance", "Contact & Lead Capture"]
        },
        {
          title: "Custom Web Applications",
          description: "Custom applications with scalable architecture, strong security and performance tuning for complex needs.",
          features: ["Custom APIs", "Database Design", "Auth & Permissions", "Scalable Infrastructure"]
        },
        {
          title: "Responsive & Performance-First Websites",
          description: "Design and build websites optimized for mobile and desktop with fast performance and touch-friendly interactions — focused on web standards and progressive enhancement.",
          features: ["Responsive Layout", "Performance Optimization", "Progressive Enhancement"]
        },
        {
          title: "Digital Presence & Brand Identity",
          description: "We combine design, messaging and product to build a coherent digital identity and strong online presence.",
          features: ["Brand Strategy", "Visual Identity", "Content Guidance", "Go-to-market Support"]
        }
      ],

      // packages removed — offerings are presented as independent services and digital presence solutions

      whyChooseTitle: "Why Choose Our Services?",
      benefits: [
        {
          icon: Star,
          title: "Award-Winning Quality",
          description: "Recognized for exceptional creative work and technical excellence"
        },
        {
          icon: Users,
          title: "Expert Team",
          description: "Skilled professionals with years of industry experience"
        },
        {
          icon: Clock,
          title: "Timely Delivery",
          description: "Consistent project timelines and reliable communication"
        },
        {
          icon: CheckCircle,
          title: "Full Support",
          description: "Comprehensive support from concept to completion and beyond"
        }
      ],

      ctaTitle: "Ready to Get Started?",
      ctaDescription: "Choose the perfect service package for your needs",
      ctaButton: "Contact Us Today"
    },
    ar: {
      heroTitle: "خدماتنا",
      heroSubtitle: "حلول إبداعية ورقمية شاملة",
      heroDescription: "من الإنتاج المرئي السينمائي إلى حلول الويب القوية، نقدم خدمات شاملة لتحويل علامتك التجارية ودفع عملك إلى الأمام.",
      
      overviewTitle: "نظرة عامة على الخدمات",
      studioTab: "خدمات الاستوديو",
      webTab: "خدمات الويب",
      
      studioServices: [
        {
          title: "المؤثرات البصرية والرسوم الحاسوبية",
          description: "مؤثرات بصرية عالية الجودة تعزز السرد البصري والمنتجات.",
          features: ["التركيب", "التكامل ثلاثي الأبعاد", "أنظمة الجسيمات", "الرندر الفوتوغرافي"]
        },
        {
          title: "الرسوم المتحركة ثلاثية الأبعاد",
          description: "رسوم ثلاثية الأبعاد إنتاجية تبرز المنتجات والشخصيات بأعلى جودة.",
          features: ["رسوم الشخصيات المتحركة", "تصور المنتجات", "جولات معمارية", "التقاط الحركة"]
        },
        {
          title: "الرسوم المتحركة الحركية",
          description: "تصميم حركة واضح ومتناسق يعزز رسالتك البصرية.",
          features: ["رسوم متحركة ثنائية الأبعاد", "طباعة حركية", "شعارات متحركة", "تصميم إنفوجرافيك"]
        },
        {
          title: "أفلام العلامات التجارية",
          description: "أفلام قصيرة تركّز على السرد وبناء هوية العلامة.",
          features: ["تطوير المفاهيم", "لوحات العمل", "السينماتوغرافيا", "تدريج الألوان"]
        },
        {
          title: "الفيديوهات التجارية",
          description: "محتوى فيديو استراتيجي للحملات وإطلاق المنتجات.",
          features: ["تصوير المنتجات", "التصوير التجاري", "المحتوى الحياتي", "إعلانات الشبكات الاجتماعية"]
        },
        {
          title: "ما بعد الإنتاج",
          description: "خدمات إنهاء احترافية من مونتاج حتى الصوت واللون.",
          features: ["مونتاج الفيديو", "تدريج الألوان", "خلط الصوت", "تصميم الصوت"]
        }
      ],

      webServices: [
        {
          title: "بناء مواقع متكاملة من الألف إلى الياء",
          description: "نحن نبني المواقع من الفكرة حتى الإطلاق: تخطيط، تصميم، تطوير، استضافة ودعم مستمر. حلول قابلة للتوسع ومصممة لنتائج فعلية.",
          features: ["استراتيجية وهوية رقمية", "تصميم واجهات مميز", "تطوير الواجهة الأمامية", "الخلفيات والبُنى التحتية", "نشر واستضافة", "دعم وصيانة"]
        },
        {
          title: "منصات التجارة الإلكترونية",
          description: "منصات تجارة إلكترونية آمنة وقابلة للتوسع مع بوابات دفع وإدارة مخزون وتجربة مستخدم مُحسّنة.",
          features: ["بوابات دفع آمنة", "إدارة الطلبات والمخزون", "لوحة تحكم للإدارة", "تحليلات وتحسين التحويلات"]
        },
        {
          title: "مواقع المعارض والمحافظ",
          description: "مواقع سريعة وجذابة تعرض أعمالك وتحوّل الزوار إلى عملاء.",
          features: ["نظم عرض الأعمال", "دراسات حالة للمشاريع", "أداء وسرعة", "نماذج تواصل" ]
        },
        {
          title: "تطبيقات ويب مخصصة",
          description: "تطبيقات مصممة بمعمارية قابلة للتوسع، امان عال واداء محسن لحالات الاستخدام المعقدة.",
          features: ["تصميم قواعد بيانات", "��اجهات برمجة تطبيقات مخصصة", "مصادقة وصلاحيات", "البنية التحتية القابلة للتوسع"]
        },
        {
          title: "تجارب موبايل-أولاً",
          description: "تصميم وبناء تجارب تعمل بشكل مثالي على الهواتف مع أداء قريب من تطبيقات الهواتف.",
          features: ["تصميم متجاوب", "تحسين اللمس", "تحسين الأداء"]
        },
        {
          title: "الهوية الرقمية وبناء الحضور",
          description: "نساعدك في بناء هوية رقمية متكاملة تجمع الرسالة، التصاميم ومنتجك لوجود رقمي مقنع وواضح.",
          features: ["استراتيجية العلامة", "هوية بصرية", "إرشاد المحتوى", "دعم إطلاق المنتج"]
        }
      ],

      // تم إزالة حزم الخدمات — العروض الآن معروضة كخدمات مستقلة وحلول لبناء الهوية والحضور الرقمي

      whyChooseTitle: "لماذا تختار خدماتنا؟",
      benefits: [
        {
          icon: Star,
          title: "جودة حائزة على جوائز",
          description: "معترف بها للعمل الإبداعي الاستثنائي والتميز التقني"
        },
        {
          icon: Users,
          title: "فريق خبير",
          description: "محترفون مهرة بسنوات من الخبرة في الصناعة"
        },
        {
          icon: Clock,
          title: "تسليم في الوقت المحدد",
          description: "جداول زمنية ثابتة للمشاريع وتواصل موثوق"
        },
        {
          icon: CheckCircle,
          title: "دعم كامل",
          description: "دعم شامل من المفهوم إلى الإكمال وما بعده"
        }
      ],

      ctaTitle: "هل أنت مستعد للبدء؟",
      ctaDescription: "تواصل معنا لنصمم الحل الرقمي المتكامل الذي يناسب أعمالك",
      ctaButton: "تواصل معنا اليوم"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="text-gradient-primary animate-gradient-shift bg-[length:200%_auto]">
                {t.heroTitle}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-neon-secondary mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {t.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              {t.overviewTitle}
            </h2>
          </div>

          <Tabs defaultValue="studio" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 glass">
              <TabsTrigger value="studio" className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>{t.studioTab}</span>
              </TabsTrigger>
              <TabsTrigger value="web" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{t.webTab}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="studio" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.studioServices.map((service, index) => (
                  <Card 
                    key={index} 
                    className="glass border-border/20 hover:border-primary/30 transition-all duration-300 group hover:scale-105"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-neon-primary group-hover:text-primary transition-colors mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* price/duration removed per request */}

                      <ul className="text-sm text-muted-foreground space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="web" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.webServices.map((service, index) => (
                  <Card 
                    key={index} 
                    className="glass border-border/20 hover:border-secondary/30 transition-all duration-300 group hover:scale-105"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-neon-secondary group-hover:text-secondary transition-colors mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* price/duration removed per request */}

                      <ul className="text-sm text-muted-foreground space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-secondary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              {t.whyChooseTitle}
            </h2>
          </div>

          <ScrollRevealGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.12} direction="up">
            {t.benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-neon-primary group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 hero-pattern">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="text-gradient-primary animate-gradient-shift bg-[length:200%_auto]">
                {t.ctaTitle}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {t.ctaDescription}
            </p>
            
            <Button 
              size="lg"
              className="btn-cinematic text-white border-none px-8 py-6 text-lg animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
              asChild
            >
              <Link to="/contact">
                {t.ctaButton}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
