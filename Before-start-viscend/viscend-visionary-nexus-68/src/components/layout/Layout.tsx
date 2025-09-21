import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import PageLoader from "@/components/ui/page-loader";
import Footer from "./Footer";
import CustomCursor from "@/components/ui/custom-cursor";
import IntroAnimation from "@/components/ui/intro-animation";
import { cn } from "@/lib/utils";

const Layout = () => {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showIntro, setShowIntro] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const location = useLocation();
  const skipFirstNav = useRef(true);

  // Disable intro in design environments (Builder preview) to avoid overlaying design canvas
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.href.includes('builder')) {
      setShowIntro(false);
      // In Builder design mode client-side scripts may not run — ensure animations are visible there
      try {
        document.documentElement.classList.add('sr-play');
      } catch (e) {}
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  // Apply language direction
  useEffect(() => {
    const root = document.documentElement;
    root.dir = language === "ar" ? "rtl" : "ltr";
    root.lang = language;
  }, [language]);

  // Check if this is the first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('viscend-visited');
    if (hasVisited) {
      setShowIntro(false);
    } else {
      // Ensure intro shows on first visit
      setShowIntro(true);
    }
  }, []);

  // Show a lightweight page loader for client-side navigation (distinct from intro)
  useEffect(() => {
    if (skipFirstNav.current) {
      skipFirstNav.current = false;
      return;
    }

    // Brief loader on navigation to indicate page transition
    setIsPageLoading(true);
    const t = setTimeout(() => setIsPageLoading(false), 600);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Handle intro completion
  const handleIntroComplete = () => {
    setShowIntro(false);
    localStorage.setItem('viscend-visited', 'true');
  };

  // Keep default cursor visible with particle effects
  useEffect(() => {
    document.body.style.cursor = 'auto';
    // Ensure proper z-index layering
    document.body.style.position = 'relative';
  }, []);

  // Initialize global scroll reveal for elements that rely on CSS animations
  useEffect(() => {
    // Import dynamically to avoid SSR issues and call the init function
    import('@/hooks/use-global-scroll-reveal').then((mod) => {
      try {
        if (mod && mod.initGlobalScrollReveal) {
          mod.initGlobalScrollReveal(90);
        }
      } catch (e) {
        // ignore
      }
    }).catch(() => {});
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Intro Animation */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} language={language} />}

      {/* Page Loader shown on client-side navigation (different from intro) */}
      <PageLoader isLoading={isPageLoading && !showIntro} />

      <div className={cn("min-h-screen", language === "ar" && "font-arabic")}>
        <Navigation
          language={language}
          onLanguageChange={setLanguage}
          theme={theme}
          onThemeChange={setTheme}
        />
        
        <main className="pt-20">
          <Outlet context={{ language }} />
        </main>
        
        <Footer language={language} />
      </div>
    </>
  );
};

export default Layout;
