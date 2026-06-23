import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTranslation } from "../context/TranslationContext";

const Navbar = () => {
  const { t, locale, changeLanguage, isRtl } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("atlas_lions_theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Easter egg clicks state
  const [logoClicks, setLogoClicks] = useState(0);
  const [showRoar, setShowRoar] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("atlas_lions_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const triggerEasterEgg = () => {
    setShowRoar(true);
    setTimeout(() => setShowRoar(false), 2200);

    // Canvas Confetti animation
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const colors = ["#C1272D", "#006233", "#D4AF37", "#E9D785", "#E03E44", "#008F4A"];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * -height - 20,
        r: Math.random() * 6 + 4,
        d: Math.random() * height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0,
        speed: Math.random() * 3 + 2,
      });
    }

    let animationFrameId;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      let active = false;
      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += p.speed;
        p.x += Math.sin(p.tiltAngle) * 0.5;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();

        if (p.y < height) {
          active = true;
        }
      });

      if (active) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        if (document.body.contains(canvas)) {
          document.body.removeChild(canvas);
        }
      }
    };

    draw();

    setTimeout(() => {
      if (document.body.contains(canvas)) {
        cancelAnimationFrame(animationFrameId);
        document.body.removeChild(canvas);
      }
    }, 4000);
  };

  const handleLogoClick = () => {
    setLogoClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        triggerEasterEgg();
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    if (logoClicks > 0) {
      const timer = setTimeout(() => setLogoClicks(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [logoClicks]);

  const navLinks = [
    { href: "#accueil", labelKey: "nav.home" },
    { href: "#histoire", labelKey: "nav.history" },
    { href: "#joueurs", labelKey: "nav.squad" },
    { href: "#legendes", labelKey: "nav.legends" },
    { href: "#selectionneur", labelKey: "nav.staff" },
    { href: "#ambiance", labelKey: "nav.stadiums" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = navLinks.map((link) => document.querySelector(link.href));
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const LanguageSelector = () => (
    <div className="flex items-center gap-1 bg-morocco-clay/20 border border-morocco-clay/50 rounded-full p-0.5">
      {["fr", "en", "ar"].map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer focus-visible:outline-1 focus-visible:outline-morocco-gold ${
            locale === lang
              ? "bg-morocco-red text-white shadow-sm"
              : "text-morocco-charcoal/50 hover:text-morocco-red"
          }`}
        >
          {lang === "ar" ? "عربي" : lang}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav py-3 shadow-sm" : "bg-transparent py-5"
        }`}
      >
        <div
          className={`absolute bottom-0 h-[3px] bg-gradient-to-r from-morocco-red via-morocco-gold to-morocco-green transition-all duration-100 ${
            isRtl ? "right-0" : "left-0"
          }`}
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo with Easter Egg Click Handler */}
          <div
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleLogoClick();
              }
            }}
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-morocco-gold cursor-pointer"
            aria-label={t("nav.home")}
          >
            <div className="relative w-9 h-9 rounded-full bg-morocco-red flex items-center justify-center font-display font-bold text-white shadow-md transition-transform group-hover:scale-105">
              <span>M</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-morocco-gold rounded-full flex items-center justify-center border-2 border-morocco-ivory">
                <svg className="w-2.5 h-2.5 text-morocco-green-dark" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col text-start">
              <span className="font-display font-black text-sm tracking-wider text-morocco-charcoal uppercase leading-none">
                {t("nav.home") === "الرئيسية" ? "أسود الأطلس" : "Lions de l'Atlas"}
              </span>
              <span className="font-sans font-medium text-[9px] tracking-widest text-morocco-gold-dark uppercase mt-0.5">
                {t("hero.tagline")}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-sans font-bold text-xs tracking-wider uppercase transition-colors relative py-1 focus-visible:outline-2 focus-visible:outline-morocco-gold ${
                    isActive ? "text-morocco-red" : "text-morocco-charcoal/70 hover:text-morocco-red"
                  }`}
                >
                  {t(link.labelKey)}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-morocco-red rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Language Selector */}
            <LanguageSelector />

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-morocco-clay/20 text-morocco-charcoal/70 hover:text-morocco-red transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-morocco-gold"
              aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#joueurs"
              className="inline-flex items-center gap-1.5 bg-morocco-green hover:bg-morocco-green-dark text-morocco-ivory text-[10px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-morocco-gold"
            >
              {t("nav.button")}
              <svg className="w-3 h-3 rtl-mirror" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </nav>

          {/* Mobile Menu Trigger & Controls */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <LanguageSelector />
            
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-morocco-charcoal/70 hover:text-morocco-red transition-colors cursor-pointer"
              aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 text-morocco-charcoal hover:text-morocco-red transition-colors focus-visible:outline-2 focus-visible:outline-morocco-gold"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Easter Egg Roar Overlay */}
      <AnimatePresence>
        {showRoar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-none select-none bg-morocco-charcoal/20 backdrop-blur-[2px]"
          >
            <h1 className="font-display font-black text-6xl md:text-8xl text-morocco-red uppercase drop-shadow-[0_4px_25px_rgba(193,39,45,0.75)] text-center px-4">
              ROOOAAAAR !!! 🦁🇲🇦
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-morocco-ivory pt-24 px-8 pb-10 flex flex-col justify-between lg:hidden border-b border-morocco-clay"
          >
            <div className="absolute inset-0 z-0 zellige-pattern opacity-10" />

            <div className="relative z-10 flex flex-col gap-6 mt-4 text-start">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`font-display font-black text-3xl tracking-wide uppercase transition-colors ${
                      isActive ? "text-morocco-red" : "text-morocco-charcoal hover:text-morocco-red"
                    }`}
                  >
                    {t(link.labelKey)}
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 flex flex-col gap-4 border-t border-morocco-clay/50 pt-6"
            >
              <a
                href="#joueurs"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-morocco-red hover:bg-morocco-red-dark text-white font-bold tracking-wider uppercase py-4 rounded-xl shadow-md transition-colors"
              >
                {t("hero.cta_discover")}
                <svg className="w-5 h-5 rtl-mirror" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <p className="text-center font-sans text-xs text-morocco-charcoal/40">
                {t("footer.brand_desc")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
