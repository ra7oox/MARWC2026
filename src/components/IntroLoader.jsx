import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/TranslationContext";
import ZelligePattern from "./ZelligePattern";

const IntroLoader = ({ finishLoading }) => {
  const { t, locale } = useTranslation();
  const [isSkipped, setIsSkipped] = useState(false);

  // Check for reduced motion preference
  const isReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Check if loaded in this session to play a shortened version
  const isSubsequentVisit = useMemo(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("atlas_lions_loaded") === "true";
  }, []);

  useEffect(() => {
    // Record visit in sessionStorage
    try {
      sessionStorage.setItem("atlas_lions_loaded", "true");
    } catch (e) {
      console.warn("sessionStorage is not accessible", e);
    }
  }, []);

  // Speed multiplier based on visit status and reduced motion settings
  const speedMultiplier = useMemo(() => {
    if (isReduced) return 0.01;
    if (isSubsequentVisit) return 0.15; // 6x speedup for returning users
    return 1;
  }, [isReduced, isSubsequentVisit]);

  // Séquence de chargement timeouts
  useEffect(() => {
    let timer;
    if (isReduced) {
      timer = setTimeout(finishLoading, 300);
    } else if (isSubsequentVisit) {
      timer = setTimeout(finishLoading, 600);
    } else {
      // Full cinematic loader completes at 3.3s
      timer = setTimeout(finishLoading, 3300);
    }
    return () => clearTimeout(timer);
  }, [isReduced, isSubsequentVisit, finishLoading]);

  const handleSkip = () => {
    if (isSkipped) return;
    setIsSkipped(true);
    finishLoading();
  };

  // Keyboard skip triggers
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip on any key press
      handleSkip();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSkipped]);

  // Skip translation helper
  const skipText = useMemo(() => {
    if (locale === "ar") return "انقر أو اضغط على أي مفتاح للتخطي";
    if (locale === "en") return "Click or press any key to skip";
    return "Clic ou touche pour passer";
  }, [locale]);

  // Framer Motion Animation Variants
  const starTransition = {
    pathLength: { duration: 0.6 * speedMultiplier, delay: 0.2 * speedMultiplier, ease: "easeInOut" },
    fillOpacity: { duration: 0.4 * speedMultiplier, delay: 0.8 * speedMultiplier, ease: "easeOut" }
  };

  const wordContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12 * speedMultiplier,
        delayChildren: 0.8 * speedMultiplier
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5 * speedMultiplier,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scaleX: 0.8 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.5 * speedMultiplier,
        delay: 1.2 * speedMultiplier,
        ease: "easeOut"
      }
    }
  };

  const subTextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5 * speedMultiplier,
        delay: 1.5 * speedMultiplier
      }
    }
  };

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 1.0 * speedMultiplier,
        delay: 1.8 * speedMultiplier,
        ease: "easeInOut"
      }
    }
  };

  const shineVariants = {
    hidden: { left: "-100%" },
    visible: {
      left: "100%",
      transition: {
        duration: 0.8 * speedMultiplier,
        delay: 2.8 * speedMultiplier,
        ease: "easeOut"
      }
    }
  };

  const titleText = useMemo(() => {
    return locale === "ar" ? "أسود الأطلس" : "LIONS DE L'ATLAS";
  }, [locale]);

  const words = useMemo(() => {
    return titleText.split(" ");
  }, [titleText]);

  return (
    <motion.div
      onClick={handleSkip}
      className="fixed inset-0 z-50 bg-morocco-ivory flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      {/* Background drifting zellige pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08, x: [0, -60], y: [0, -60] }}
        transition={{
          opacity: { duration: 0.2 },
          x: { repeat: Infinity, ease: "linear", duration: 30 },
          y: { repeat: Infinity, ease: "linear", duration: 30 }
        }}
        className="absolute -inset-16 w-[calc(100%+128px)] h-[calc(100%+128px)] pointer-events-none select-none"
      >
        <ZelligePattern opacity={1} />
      </motion.div>

      {/* Main cinematic content layout */}
      <div className="relative flex flex-col items-center z-10 max-w-md px-6 text-center">
        
        {/* Moroccan Star Container */}
        <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
          
          {/* Gold glowing blur star behind green star (pulsing after draw finishes) */}
          {!isReduced && (
            <motion.svg
              viewBox="0 0 24 24"
              className="absolute inset-0 w-full h-full text-morocco-gold blur-[6px] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.7, 0.1]
              }}
              transition={{
                opacity: {
                  repeat: Infinity,
                  duration: 2.0,
                  ease: "easeInOut",
                  delay: 1.2 * speedMultiplier
                }
              }}
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </motion.svg>
          )}

          {/* Green Moroccan Star - Path drawing animation */}
          <svg viewBox="0 0 24 24" className="w-full h-full text-morocco-green relative z-10">
            <motion.path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="currentColor"
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={starTransition}
            />
          </svg>
        </div>

        {/* Title stagger animation */}
        <motion.h2
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
          className="font-display font-black text-3xl md:text-4xl tracking-wider text-morocco-charcoal uppercase leading-none flex gap-2.5 justify-center flex-wrap"
        >
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Badge imprint scale-x animation */}
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-morocco-red/10 border border-morocco-red/20 shadow-sm mt-4 relative z-10"
        >
          <span className="font-sans font-extrabold text-[10px] tracking-widest text-morocco-red uppercase">
            {t("hero.tagline")}
          </span>
        </motion.div>

        {/* Sub-text breathing typing animation */}
        <motion.div
          variants={subTextVariants}
          initial="hidden"
          animate="visible"
          className="mt-8"
        >
          <p className="font-sans text-xs font-semibold text-morocco-charcoal/60 uppercase tracking-wider inline-flex items-center gap-0.5">
            <span>{t("loader.loading_text").replace("...", "")}</span>
            <span className="inline-block animate-dots">...</span>
          </p>
        </motion.div>

        {/* Progress Bar filling & shining */}
        <div className="w-56 h-[3px] bg-morocco-clay/40 rounded-full mt-6 overflow-hidden relative">
          <motion.div
            variants={progressVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-0 bottom-0 start-0 bg-gradient-to-r from-morocco-red via-morocco-gold to-morocco-green"
          />
          {/* Shine effect passing over once loaded */}
          {!isReduced && (
            <motion.div
              variants={shineVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
            />
          )}
        </div>

        {/* Skip instruction helper at bottom */}
        {!isReduced && !isSubsequentVisit && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2.0, duration: 0.5 }}
            className="absolute top-72 font-sans text-[9px] font-extrabold text-morocco-charcoal uppercase tracking-widest pointer-events-none whitespace-nowrap"
          >
            {skipText}
          </motion.p>
        )}
      </div>

      {/* Styled dots letter-spacing pulsation */}
      <style>{`
        @keyframes dots-pulse {
          0%, 100% {
            letter-spacing: 0.05em;
          }
          50% {
            letter-spacing: 0.35em;
            margin-inline-end: -0.3em;
          }
        }
        .animate-dots {
          animation: dots-pulse 1.5s infinite ease-in-out;
          display: inline-block;
          font-weight: bold;
        }
      `}</style>
    </motion.div>
  );
};

export default IntroLoader;
