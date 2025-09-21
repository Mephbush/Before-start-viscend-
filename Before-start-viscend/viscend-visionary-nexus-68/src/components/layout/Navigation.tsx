import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  language: "en" | "ar";
  onLanguageChange: (lang: "en" | "ar") => void;
  theme: "dark" | "light";
  onThemeChange: (theme: "dark" | "light") => void;
}

const Navigation = ({ language, onLanguageChange, theme, onThemeChange }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = {
    en: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Studio", href: "/studio" },
      { name: "Web", href: "/web" },
      { name: "Services", href: "/services" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Contact", href: "/contact" },
    ],
    ar: [
      { name: "الرئيسية", href: "/" },
      { name: "من نحن", href: "/about" },
      { name: "الاستوديو", href: "/studio" },
      { name: "الويب", href: "/web" },
      { name: "الخدمات", href: "/services" },
      { name: "المعرض", href: "/portfolio" },
      { name: "تواصل", href: "/contact" },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 animate-fade-in"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F522d531155314df58f36d2874dd36af0%2F61d0cf36a2c94c91bd5ed392f155fa37?format=webp&width=800"
              alt="VisCend"
              className="h-10 w-auto logo-hover"
            />
            <span className="text-2xl font-bold text-gradient-primary">
              {language === 'ar' ? 'فِسند' : 'VisCend'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={cn("hidden lg:flex items-center gap-8", language === 'ar' && "flex-row-reverse")}>
            {navigationItems[language].map((item, index) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 link-underline",
                  "animate-fade-in",
                  isActive(item.href)
                    ? "text-neon-primary"
                    : "text-foreground hover:text-primary"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLanguageChange(language === "en" ? "ar" : "en")}
              className="hidden md:flex items-center space-x-2 hover:bg-muted/10"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === "en" ? "العربية" : "English"}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
              className="hover:bg-muted/10"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* CTA Button */}
            <Button 
              className="hidden md:flex btn-cinematic text-white border-none"
              asChild
            >
              <Link to="/contact">
                {language === "en" ? "Start Project" : "ابدأ مشروعك"}
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 glass">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Logo */}
                  <div className={cn("flex items-center gap-3 pb-6 border-b border-border/20", language === 'ar' && "flex-row-reverse")}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F522d531155314df58f36d2874dd36af0%2F61d0cf36a2c94c91bd5ed392f155fa37?format=webp&width=800" alt="VisCend" className="h-8 w-auto logo-hover" />
                    <span className="text-xl font-bold text-gradient-primary">
                      {language === 'ar' ? 'فِسند' : 'VisCend'}
                    </span>
                  </div>

                  {/* Mobile Navigation */}
                  <div className={cn("flex flex-col space-y-4", language === 'ar' && "flex-col-reverse")}>
                    {navigationItems[language].map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-lg font-medium transition-colors duration-200",
                          isActive(item.href)
                            ? "text-neon-primary"
                            : "text-foreground hover:text-primary"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Controls */}
                  <div className="flex flex-col space-y-4 pt-6 border-t border-border/20">
                    <Button
                      variant="ghost"
                      onClick={() => onLanguageChange(language === "en" ? "ar" : "en")}
                      className="justify-start"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      {language === "en" ? "العربية" : "English"}
                    </Button>
                    
                    <Button 
                      className="btn-cinematic text-white border-none"
                      onClick={() => setIsOpen(false)}
                      asChild
                    >
                      <Link to="/contact">
                        {language === "en" ? "Start Project" : "ابدأ مشروعك"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
