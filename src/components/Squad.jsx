import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, RefreshCw, Share2 } from "lucide-react";
import { useTranslation } from "../context/TranslationContext";
import ZelligePattern from "./ZelligePattern";
import { squadData } from "../data/mockData";

// Eagerly glob-import all assets from the players directory to resolve paths correctly in Vite
const playerImages = import.meta.glob("../assets/players/*", { eager: true });

const positions = ["Tous", "Gardiens", "Défenseurs", "Milieux", "Attaquants"];

// Card Component with 3D Tilt and Image Fallback
const PlayerCard = ({ player, t, isRtl }) => {
  const cardRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleShare = (name, e) => {
    e.stopPropagation();
    const text = `${name} - Lions de l'Atlas 2026`;
    if (navigator.share) {
      navigator.share({
        title: text,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text} - ${window.location.href}`);
      alert("Lien de partage copié dans le presse-papiers !");
    }
  };

  // Helper to fetch initials from translated player name
  const getInitials = (name) => {
    if (!name) return "M";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  // 3D Mouse Tilt Effect Handler
  const handleMouseMove = (e) => {
    if (isFlipped || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt calculations
    const rotateX = ((centerY - y) / centerY) * 12; // Max 12 deg
    const rotateY = ((x - centerX) / centerX) * 12; // Max 12 deg

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    // Reset rotation smoothly
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(${isFlipped ? 180 : 0}deg) scale3d(1, 1, 1)`;
  };

  useEffect(() => {
    // Reset transform rotation when card flip state changes
    const card = cardRef.current;
    if (card) {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(${isFlipped ? 180 : 0}deg) scale3d(1, 1, 1)`;
    }
  }, [isFlipped]);

  // Retrieve the bundled asset URL from the globbed map
  const resolvePlayerImage = (path) => {
    const key = `../assets/${path}`;
    return playerImages[key]?.default || null;
  };

  const playerName = t(`players.${player.id}.name`);
  const playerBio = t(`players.${player.id}.bio`);
  const playerInitials = getInitials(playerName);
  const playerImageSrc = resolvePlayerImage(player.imagePath);

  return (
    <div className="perspective-1000 w-full h-[400px]">
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        onClick={toggleFlip}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={`${playerName}. ${
          isFlipped ? t("squad.click_close") : t("squad.stats_title")
        }`}
        className={`relative w-full h-full preserve-3d transition-transform duration-500 ease-out cursor-pointer ${
          isFlipped ? "rotate-y-180" : "rotate-y-0"
        }`}
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden glass-card flex flex-col justify-between p-6 select-none">
          {/* Watermark Number */}
          <div className="absolute -top-12 -right-8 font-display font-black text-[180px] text-morocco-clay/20 leading-none select-none pointer-events-none">
            {player.number}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between relative z-10">
            <span className="font-sans font-bold text-[10px] tracking-widest text-morocco-green uppercase border border-morocco-green/20 bg-morocco-green/5 px-2.5 py-1 rounded-full">
              {t(player.positionKey)}
            </span>
            <div className="flex gap-2 relative z-20">
              <button
                onClick={(e) => handleShare(playerName, e)}
                className="w-8 h-8 rounded-full bg-morocco-clay/30 hover:bg-morocco-red hover:text-white flex items-center justify-center text-morocco-charcoal/50 transition-all cursor-pointer focus-visible:outline-1"
                aria-label="Partager ce joueur"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-morocco-clay/35 flex items-center justify-center text-morocco-charcoal/40 hover:text-morocco-red transition-colors">
                <RefreshCw className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Player Photo with Fallback Monogram */}
          <div className="w-full h-[210px] rounded-xl overflow-hidden relative bg-gradient-to-tr from-morocco-clay/20 to-morocco-clay/40 my-3 z-10">
            {/* Highlight Captains */}
            {player.isCaptain && (
              <div className="absolute top-3 right-3 bg-morocco-gold text-morocco-charcoal p-1 rounded-full shadow-md z-20">
                <Shield className="w-3.5 h-3.5 fill-morocco-charcoal" />
              </div>
            )}

            {/* Try loading image. Fallback to vector initials on error or empty source */}
            {!imageError && playerImageSrc ? (
              <img
                src={playerImageSrc}
                alt={playerName}
                loading="lazy"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              /* Premium Zellige Vector Fallback */
              <div className={`w-full h-full bg-gradient-to-tr ${player.photoColor} flex flex-col items-center justify-center relative`}>
                <ZelligePattern opacity={0.15} />
                <span className="font-display font-black text-5xl text-white tracking-wider relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                  {playerInitials}
                </span>
                <span className="text-[10px] font-bold text-morocco-gold-light tracking-widest uppercase relative z-10 mt-2 drop-shadow-sm">
                  MAROC
                </span>
              </div>
            )}
          </div>

          {/* Footer Card Meta */}
          <div className="text-start relative z-10">
            <span className="font-sans font-bold text-xs text-morocco-gold-dark">
              N° {player.number} {player.isCaptain && `• ${t("squad.captain")}`}
            </span>
            <h3 className="font-display font-black text-2xl text-morocco-charcoal uppercase leading-tight mt-0.5">
              {playerName}
            </h3>
            <p className="font-sans text-xs text-morocco-charcoal/70 mt-1">
              {player.club}
            </p>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden glass-card flex flex-col justify-between p-6 border-2 border-morocco-gold/30 bg-gradient-to-b from-white to-morocco-gold/5 select-none">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="font-sans font-bold text-[10px] tracking-widest text-morocco-gold-dark uppercase border border-morocco-gold/20 bg-morocco-gold/5 px-2.5 py-1 rounded-full">
              {t("squad.stats_title")}
            </span>
            <div className="w-8 h-8 rounded-full bg-morocco-gold/10 flex items-center justify-center text-morocco-gold-dark">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>

          {/* Player Bio details */}
          <div className="text-start my-4">
            <h4 className="font-display font-extrabold text-lg text-morocco-charcoal uppercase leading-none">
              {playerName}
            </h4>
            <div className="flex gap-4 mt-2.5 mb-4 text-[10px] font-bold text-morocco-charcoal/70 uppercase">
              <span>{t("squad.age_label")}: {player.age}</span>
              <span>{t("squad.caps_label")}: {player.caps}</span>
              {player.goals > 0 && (
                <span>{t("squad.goals_label")}: {player.goals}</span>
              )}
            </div>
            <p className="font-sans text-[11px] leading-relaxed text-morocco-charcoal/80 italic border-l-2 border-morocco-gold pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
              "{playerBio}"
            </p>
          </div>

          {/* Performance stats bar */}
          <div className="space-y-3.5 mb-2">
            {player.stats.map((stat, idx) => (
              <div key={idx} className="text-left">
                <div className="flex justify-between text-[10px] font-bold text-morocco-charcoal/80 uppercase mb-1">
                  <span>{t(stat.labelKey)}</span>
                  <span className="text-morocco-red font-display font-extrabold">{stat.value}</span>
                </div>
                <div className="h-1.5 w-full bg-morocco-clay/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-morocco-red to-morocco-gold"
                    style={{
                      width: stat.value.includes("%")
                        ? stat.value
                        : stat.value.includes("/")
                        ? `${parseFloat(stat.value) * 100}%`
                        : "80%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Return footer text */}
          <p className="font-sans text-[9px] font-bold text-morocco-charcoal/40 uppercase tracking-widest text-center mt-2">
            {t("squad.click_close")}
          </p>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader Component
const CardSkeleton = () => (
  <div className="w-full h-[400px] bg-white/40 border border-morocco-clay/60 rounded-2xl p-6 flex flex-col justify-between shadow-sm animate-pulse">
    <div className="flex justify-between items-center">
      <div className="w-16 h-5 bg-morocco-clay/40 rounded-full"></div>
      <div className="w-8 h-8 bg-morocco-clay/40 rounded-full"></div>
    </div>
    <div className="flex justify-center my-6">
      <div className="w-32 h-32 bg-morocco-clay/45 rounded-full"></div>
    </div>
    <div className="space-y-3">
      <div className="w-12 h-3 bg-morocco-clay/35 rounded-full"></div>
      <div className="w-3/4 h-6 bg-morocco-clay/50 rounded-full"></div>
      <div className="w-1/2 h-4 bg-morocco-clay/35 rounded-full"></div>
    </div>
  </div>
);

const Squad = () => {
  const { t, isRtl } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [loading, setLoading] = useState(true);

  // Simulate skeleton loaders on mount
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredSquad = squadData.filter((player) => {
    if (activeFilter === "Tous") return true;
    if (activeFilter === "Gardiens") return player.positionKey === "squad.filter_gk";
    if (activeFilter === "Défenseurs") return player.positionKey === "squad.filter_df";
    if (activeFilter === "Milieux") return player.positionKey === "squad.filter_mf";
    if (activeFilter === "Attaquants") return player.positionKey === "squad.filter_fw";
    return true;
  });

  return (
    <section
      id="joueurs"
      className="relative py-24 bg-morocco-ivory border-t border-morocco-clay/50 overflow-hidden"
    >
      <ZelligePattern opacity={0.06} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans font-bold text-xs tracking-widest text-morocco-red uppercase mb-3 block">
            {t("squad.tagline")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-morocco-charcoal uppercase tracking-tight mb-6">
            {t("squad.title")}
          </h2>
          <div className="h-1 w-16 bg-morocco-gold mx-auto mb-6" />
          <p className="font-sans text-sm md:text-base text-morocco-charcoal/70 leading-relaxed">
            {t("squad.description")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {positions.map((pos) => {
            const filterKey = 
              pos === "Tous" ? "squad.filter_all" : 
              pos === "Gardiens" ? "squad.filter_gk" : 
              pos === "Défenseurs" ? "squad.filter_df" : 
              pos === "Milieux" ? "squad.filter_mf" : 
              "squad.filter_fw";
            return (
              <button
                key={pos}
                onClick={() => setActiveFilter(pos)}
                className={`font-sans font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-morocco-gold ${
                  activeFilter === pos
                    ? "bg-morocco-red text-white border-morocco-red shadow-md"
                    : "bg-transparent text-morocco-charcoal/70 border-morocco-clay hover:bg-morocco-clay/30"
                }`}
              >
                {t(filterKey)}
              </button>
            );
          })}
        </div>

        {/* Players Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {loading
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <CardSkeleton key={`skeleton-${idx}`} />
                ))
              : filteredSquad.map((player) => (
                  <motion.div
                    layout
                    key={player.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <PlayerCard player={player} t={t} isRtl={isRtl} />
                  </motion.div>
                ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Squad;
