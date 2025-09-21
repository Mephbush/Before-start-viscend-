import { Link, useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/scroll-reveal";
import ScrollRevealGroup from "@/components/ui/scroll-reveal-group";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award,
  CheckCircle,
  Star
} from "lucide-react";

const About = () => {
  const { language } = useOutletContext<{ language: "en" | "ar" }>();

  const content = {
    en: {
      heroTitle: "About VisCend",
      heroSubtitle: "Where Vision Meets Innovation",
      heroDescription: "We craft visual products and digital solutions that connect audiences to memorable brand experiences.",

      // Mission, Vision & Goal
      missionTitle: "Our Mission",
      missionText: "To empower businesses and creators with cutting-edge visual productions and digital solutions that inspire, engage, and deliver exceptional results.",
      visionTitle: "Our Vision",
      visionText: "To be the leading creative digital agency that sets new standards in visual storytelling and digital innovation.",
      goalTitle: "Our Goal",
      goalText: "To transform your digital presence through innovative visual storytelling and cutting-edge web solutions that drive measurable business growth and create lasting brand impact.",

      // Values
      valuesTitle: "Our Core Values",
      values: [
        {
          icon: Lightbulb,
          title: "Relentless Innovation",
          description: "We don't just follow trends - we create them. Our R&D investments ensure you're always ahead of the competition."
        },
        {
          icon: Users,
          title: "True Partnership",
          description: "Your success is our success. We become an extension of your team, invested in your long-term growth."
        },
        {
          icon: Target,
          title: "Obsessive Excellence",
          description: "Good enough isn't good enough. We iterate until every pixel, every line of code, every detail is perfect."
        },
        {
          icon: Award,
          title: "Absolute Transparency",
          description: "No hidden costs, no scope creep, no surprises. You know exactly what you're getting and when."
        }
      ],

      // Why Choose Us
      whyChooseTitle: "Why Choose VisCend?",
      whyChooseSubtitle: "Your success is our commitment - here's why we're your ideal digital partner",
      reasons: [
        {
          icon: Award,
          title: "10+ Years Combined Expertise",
          description: "Our team brings decades of experience from Hollywood productions to Fortune 500 digital transformations"
        },
        {
          icon: Users,
          title: "100% Client Satisfaction Rate",
          description: "Every project delivered on time, within budget, with zero compromises on quality"
        },
        {
          icon: Star,
          title: "Industry-Leading Technology",
          description: "We use the same tools as Disney, Netflix, and Apple - ensuring premium results for every project"
        },
        {
          icon: CheckCircle,
          title: "ROI-Focused Approach",
          description: "Every creative decision and technical choice is made to maximize your return on investment"
        }
      ],

      // Story
      storyTitle: "Our Story",
      storyText: "Founded with a passion for visual storytelling and digital innovation, VisCend has grown from a small creative studio to a full-service digital agency. Our journey began with a simple belief: that powerful visuals and smart digital solutions can transform businesses and captivate audiences.",

      // CTA
      ctaTitle: "Ready to Work Together?",
      ctaDescription: "Let's create something amazing for your brand",
      ctaButton: "Start Your Project"
    },
    ar: {
      heroTitle: "من نحن",
      heroSubtitle: "حيث تلتقي الرؤية بالابتكار", 
      heroDescription: "نقدّم شراكة تجمع الابداع والتقنية لبناء سرد بصري مؤثر وحلول رقمية متقنة تمنح علامتك قيمة وتحقق نتائج قابلة للقياس.",
      
      missionTitle: "مهمتنا",
      missionText: "تمكين الشركات والمبدعين بانتاج مرئي متطور وحلول رقمية تلهم وتشارك وتحقق نتائج استثنائية.",
      visionTitle: "رؤيتنا", 
      visionText: "أن نكون الوكالة الإبداعية الرقمية الرائدة التي تضع معايير جديدة في السرد المرئي والابتكار الرقمي.",
      goalTitle: "هدفنا",
      goalText: "تحويل حضورك الرقمي من خلال السرد المرئي المبتكر وحلول الويب المتطورة التي تحقق نموًا تجاريًا قابلاً للقياس وتخلق تأثيرًا دائمًا للعلامة التجارية.",

      valuesTitle: "قيمنا الأساسية",
      values: [
        {
          icon: Lightbulb,
          title: "الابتكار اللا محدود",
          description: "نحن لا نتبع الاتجاهات فحسب - بل نصنعها. استثماراتنا في البحث والتطوير تضمن أن تكون دائمًا في المقدمة."
        },
        {
          icon: Users,
          title: "الشراكة الحقيقية",
          description: "نجاحك هو نجاحنا. نصبح امتدادًا لفريقك، مستثمرين في نموك طويل الأمد."
        },
        {
          icon: Target,
          title: "التميز المطلق",
          description: "الجيد ليس كافيًا. نكرر العمل حتى تصبح كل بكسل، كل سطر من الكود، كل تفصيلة مثالية."
        },
        {
          icon: Award,
          title: "الشفافية المطلقة",
          description: "لا توجد تكاليف مخفية، لا تجاوز للنطاق، لا مفاجآت. تعرف بالضبط ما تحصل عليه ومتى."
        }
      ],

      whyChooseTitle: "لماذا تختار فِسند؟",
      whyChooseSubtitle: "نجاحك هو التزامنا - إليك لماذا نحن شريكك الرقمي الأمثل",
      reasons: [
        {
          icon: Award,
          title: "خبرة مجمعة تزيد عن 10 سنوات",
          description: "فريقنا يجلب عقودًا من الخبرة من إنتاجات هوليوود إلى التحولات الرقمية لشركات Fortune 500"
        },
        {
          icon: Users,
          title: "معدل رضا العملاء 100%",
          description: "كل مشروع يُسلم في الوقت المحدد، ضمن الميزانية، بدون أي تنازل عن الجودة"
        },
        {
          icon: Star,
          title: "جودة حائزة على جوائز",
          description: "جودة معترف بها من جوائز ومنصات دولية، نقدم معايير عالية في كل مشروع"
        },
        {
          icon: CheckCircle,
          title: "نهج مركز على العائد على الاستثمار",
          description: "كل قرار إبداعي وخيار تقني يُتخذ لتعظيم عائدك على الاستثمار"
        }
      ],

      storyTitle: "قصتنا",
      storyText: "تاسست بشغف للسرد المرئي والابتكار الرقمي، نمت فسند من استوديو ابداعي صغير الى شريك رقمي متكامل الخدمات. بدأت رحلتنا بايمان بسيط: ان المرئيات القوية والحلول الرقمية الذكية يمكن ان تحول الاعمال وتاسر الجماهير.",

      ctaTitle: "هل أنت مستعد للعمل معًا؟",
      ctaDescription: "دعنا نصنع شيئا مذهلا لعلامتك التجارية",
      ctaButton: "ابدأ مشروعك"
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
            <p className="text-2xl md:text-3xl font-light text-primary mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {t.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Goal */}
      <ScrollReveal>
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                {t.missionTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t.missionText}
              </p>
            </div>
            <div style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl font-bold mb-6 text-secondary">
                {t.visionTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t.visionText}
              </p>
            </div>
            <div style={{ animationDelay: "0.4s" }}>
              <h2 className="text-3xl font-bold mb-6 text-accent">
                {t.goalTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t.goalText}
              </p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              {t.valuesTitle}
            </h2>
          </div>

          <ScrollRevealGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.12} direction="up">
            {t.values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="glass border-border/20 hover:border-primary/30 transition-all duration-300 group hover:scale-105"
                >
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-secondary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient-primary">
              {t.storyTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in-up">
              {t.storyText}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              {t.whyChooseTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.whyChooseSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Card 
                  key={index} 
                  className="glass border-border/20 hover:border-primary/30 transition-all duration-300 group hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-secondary transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
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

export default About;
