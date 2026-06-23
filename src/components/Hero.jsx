import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, animate } from "framer-motion";
import { Trophy, Calendar } from "lucide-react";
import { useTranslation } from "../context/TranslationContext";
import ThreeCanvas from "./ThreeCanvas";
import ZelligePattern from "./ZelligePattern";
import { countdownTarget, keyStatsData } from "../data/mockData";

// Stagger word animation variants
const wordVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

// Count-up helper component
const CountUpNumber = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const parsedValue = useMemo(() => {
    if (typeof value !== "string") return { num: Number(value) || 0, suffix: "" };
    // Match first sequence of digits
    const numMatch = value.match(/^(\d+)/);
    if (!numMatch) return { num: null, suffix: value };
    const num = Number(numMatch[1]);
    const suffix = value.slice(numMatch[1].length);
    return { num, suffix };
  }, [value]);

  useEffect(() => {
    if (!inView || parsedValue.num === null || !ref.current) return;

    const controls = animate(0, parsedValue.num, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = Math.floor(latest) + parsedValue.suffix;
        }
      }
    });

    return () => controls.stop();
  }, [inView, parsedValue]);

  if (parsedValue.num === null) {
    return <span ref={ref}>{value}</span>;
  }

  return <span ref={ref}>0{parsedValue.suffix}</span>;
};

// Animated Digit Roll for countdown numbers
const AnimatedDigit = ({ value, reducedMotion }) => {
  if (reducedMotion) {
    return <span className="font-display font-black text-2xl text-morocco-red dark:text-morocco-red-light">{value}</span>;
  }
  return (
    <div className="relative h-8 overflow-hidden w-4.5 inline-block">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center font-display font-black text-2xl text-morocco-red dark:text-morocco-red-light"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const AnimatedCountdownBox = ({ value, label, reducedMotion }) => {
  const digits = String(value).padStart(2, "0").split("");
  return (
    <div className="flex flex-col bg-morocco-clay/30 dark:bg-morocco-clay/10 border border-morocco-clay/10 rounded-xl p-2.5 min-w-[70px] shadow-sm select-none">
      <div className="flex justify-center items-center h-8">
        <AnimatedDigit value={digits[0]} reducedMotion={reducedMotion} />
        <AnimatedDigit value={digits[1]} reducedMotion={reducedMotion} />
      </div>
      <span className="font-sans text-[9px] font-bold text-morocco-charcoal/50 dark:text-morocco-charcoal/40 uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );
};

const Hero = () => {
  const { t, isRtl } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMatchDay, setIsMatchDay] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Parallax scroll hook
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 500], [0, 70]);
  const cardY = useTransform(scrollY, [0, 500], [0, -30]);

  // Reduced motion media query check
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(countdownTarget) - +new Date();
      let timeLeftData = {};

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
        setTimeLeft(timeLeftData);
        setIsMatchDay(false);
      } else {
        setIsMatchDay(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const title1Words = useMemo(() => t("hero.title_1").split(" "), [t]);
  const title2Words = useMemo(() => t("hero.title_2").split(" "), [t]);

  const yTitle = reducedMotion ? 0 : titleY;
  const yCard = reducedMotion ? 0 : cardY;

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 overflow-hidden bg-gradient-to-b from-morocco-ivory to-white/40 dark:from-[#121513] dark:to-transparent"
    >
      {/* Subtle Moroccan motif backdrop */}
      <ZelligePattern opacity={0.04} className="dark:text-white/20" />

      {/* 3D WebGL Canvas Layer */}
      <ThreeCanvas />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Main text container (Left side) */}
          <motion.div 
            style={{ y: yTitle }}
            className="lg:col-span-7 text-start flex flex-col items-start"
          >
            {/* Top Badge with subtle entry & pulsing trophy */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-morocco-red/10 border border-morocco-red/20 mb-6 shadow-sm"
            >
              <Trophy className="w-3.5 h-3.5 text-morocco-red dark:text-morocco-red-light animate-pulse" />
              <span className="font-sans font-extrabold text-[10px] tracking-widest text-morocco-red dark:text-morocco-red-light uppercase">
                {t("hero.tagline")}
              </span>
            </motion.div>

            {/* Title with stagger word-by-word animation */}
            <motion.h1
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
              className="font-display font-black text-5xl md:text-7xl tracking-tight text-morocco-charcoal uppercase leading-[1.02] mb-6 flex flex-col gap-1.5"
            >
              <span className="flex flex-wrap gap-x-3 overflow-hidden">
                {title1Words.map((word, idx) => (
                  <motion.span key={idx} variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="flex flex-wrap gap-x-3 overflow-hidden text-morocco-red dark:text-morocco-red-light">
                {title2Words.map((word, idx) => (
                  <motion.span key={idx} variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-sans text-base md:text-lg text-morocco-charcoal/80 max-w-xl mb-8 leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#joueurs"
                className="inline-flex items-center gap-2 bg-morocco-red hover:bg-morocco-red-dark text-white font-sans font-bold text-xs tracking-wider uppercase px-6 py-4 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus-visible:outline-3 focus-visible:outline-morocco-gold group"
              >
                {t("hero.cta_discover")}
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 rtl-mirror" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <a
                href="#histoire"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-morocco-red/10 dark:hover:bg-morocco-red/20 text-morocco-charcoal hover:text-morocco-red font-sans font-bold text-xs tracking-wider uppercase px-6 py-4 rounded-xl border border-morocco-clay hover:border-morocco-red/30 active:scale-[0.98] transition-all duration-300 focus-visible:outline-3 focus-visible:outline-morocco-gold"
              >
                {t("hero.cta_history")}
              </a>
            </motion.div>
          </motion.div>

          {/* Countdown Card (Right side, offset parallax) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              style={{ y: yCard }}
              variants={itemVariants}
              className="glass-card w-full max-w-[380px] p-6 rounded-2xl relative overflow-hidden transition-all duration-500 hover:shadow-xl dark:hover:shadow-black/30 group/card"
            >
              {/* Pulsing card shadow base */}
              <div className="absolute inset-0 bg-morocco-gold/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none rounded-2xl" />

              {/* Gold borders */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-morocco-gold" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-morocco-gold" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-morocco-gold" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-morocco-gold" />

              <div className="flex items-center gap-2 mb-4 text-morocco-gold-dark dark:text-morocco-gold-light relative z-10">
                <Calendar className="w-4 h-4" />
                <span className="font-sans font-bold text-xs tracking-wider uppercase">{t("hero.countdown_title")}</span>
              </div>

              <h3 className="font-display font-extrabold text-xl text-morocco-charcoal uppercase mb-1 relative z-10">
                {t("hero.countdown_match")}
              </h3>
              <p className="font-sans text-xs text-morocco-charcoal/60 dark:text-morocco-charcoal/40 mb-6 relative z-10">{t("hero.countdown_sub")}</p>

              {isMatchDay ? (
                <div className="py-4 text-center bg-morocco-green/10 border border-morocco-green/20 rounded-xl relative z-10" aria-live="assertive">
                  <span className="font-display font-black text-xl text-morocco-green uppercase tracking-wider animate-pulse">
                    {t("hero.matchday")}
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 text-center relative z-10" aria-live="polite">
                  <AnimatedCountdownBox value={timeLeft.days} label={t("hero.days")} reducedMotion={reducedMotion} />
                  <AnimatedCountdownBox value={timeLeft.hours} label={t("hero.hours")} reducedMotion={reducedMotion} />
                  <AnimatedCountdownBox value={timeLeft.minutes} label={t("hero.min")} reducedMotion={reducedMotion} />
                  <AnimatedCountdownBox value={timeLeft.seconds} label={t("hero.sec")} reducedMotion={reducedMotion} />
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats Band at Bottom */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 mt-6 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="border-t border-morocco-clay/60 dark:border-morocco-clay/20 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
        >
          {keyStatsData.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col text-start group/stat cursor-default py-2.5 px-3.5 rounded-xl transition-all duration-300 hover:bg-morocco-clay/10 dark:hover:bg-morocco-clay/5 hover:translate-y-[-2px]"
            >
              <span className="font-display font-black text-2xl md:text-3xl text-morocco-green dark:text-morocco-green-light group-hover/stat:text-morocco-red dark:group-hover/stat:text-morocco-red-light transition-colors duration-300 select-none">
                <CountUpNumber value={stat.valueKey ? t(stat.valueKey) : stat.value} />
              </span>
              <span className="font-sans text-[10px] font-bold text-morocco-charcoal/60 dark:text-morocco-charcoal/40 uppercase tracking-wider mt-1 select-none">
                {t(stat.labelKey)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
