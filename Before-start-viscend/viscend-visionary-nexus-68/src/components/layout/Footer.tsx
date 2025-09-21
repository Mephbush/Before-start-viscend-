import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
// Hosted logo URL (transparent)
const hostedLogo = "https://cdn.builder.io/api/v1/image/assets%2F522d531155314df58f36d2874dd36af0%2F61d0cf36a2c94c91bd5ed392f155fa37?format=webp&width=800";

interface FooterProps {
  language: "en" | "ar";
}

const Footer = ({ language }: FooterProps) => {
  const content = {
    en: {
      tagline: "Your partner for visual creativity and integrated technical innovation",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact Info",
      followUs: "Follow Us",
      newsletter: "Newsletter",
      newsletterText: "Stay updated with our latest projects and insights",
      subscribe: "Subscribe",
      emailPlaceholder: "Enter your email",
      copyright: "© 2025 VisCend. All rights reserved.",
      studioServices: ["VFX & CGI", "3D Animation", "Motion Graphics", "Brand Storytelling"],
      webServices: ["Corporate Sites", "E-Commerce", "Portfolio Sites", "Custom Web Apps"],
      address: "Sana'a, Yemen",
      email: "hello@viscend.com",
      phone: "+971 50 123 4567"
    },
    ar: {
      tagline: "شريكك لإبداع مرئي وابتكار تقني متكامل",
      quickLinks: "روابط سريعة",
      services: "الخدمات",
      contact: "معلومات التواصل",
      followUs: "تابعنا",
      newsletter: "النشرة الإخبارية",
      newsletterText: "ابق على اطلاع بأحدث مشاريعنا ورؤانا",
      subscribe: "اشترك",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      copyright: "© 2025 فِسند. جميع الحقوق محفوظة.",
      studioServices: ["المؤثرات البصرية", "الرسوم ثلاثية الأبعاد", "الجرافيك المتحرك", "سرد العلامة التجارية"],
      webServices: ["المواقع المؤسسية", "التجارة الإلكترونية", "مواقع المعارض", "تطبيقات الويب المخصصة"],
      address: "صنعاء، اليمن",
      email: "hello@viscend.com",
      phone: "+971 50 123 4567"
    }
  };

  const links = {
    en: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Studio", href: "/studio" },
      { name: "Web", href: "/web" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Contact", href: "/contact" }
    ],
    ar: [
      { name: "الرئيسية", href: "/" },
      { name: "من نحن", href: "/about" },
      { name: "الاستوديو", href: "/studio" },
      { name: "الويب", href: "/web" },
      { name: "المعرض", href: "/portfolio" },
      { name: "تواصل", href: "/contact" }
    ]
  };

  const t = content[language];

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img src={hostedLogo} alt="VisCend" className="h-10 w-auto logo-hover" />
              <span className="text-2xl font-bold text-gradient-primary">
                {language === 'ar' ? 'فِسند' : 'VisCend'}
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-neon-primary">
              {t.quickLinks}
            </h3>
            <ul className="space-y-3">
              {links[language].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-neon-secondary">
              {t.services}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary mb-2">Studio</h4>
                <ul className="space-y-1">
                  {t.studioServices.map((service, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-secondary mb-2">Web</h4>
                <ul className="space-y-1">
                  {t.webServices.map((service, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-neon-accent">
              {t.contact}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {t.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${t.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href={`tel:${t.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {t.copyright}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {language === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {language === "en" ? "Terms of Service" : "شروط الخدمة"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
