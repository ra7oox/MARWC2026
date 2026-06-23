import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, ChevronRight, X, ChevronLeft, Share2, ZoomIn } from "lucide-react";
import { useTranslation } from "../context/TranslationContext";
import ZelligePattern from "./ZelligePattern";
import { stadiumsData } from "../data/mockData";

// Interactive Map Component
const StadiumMapSVG = ({ selectedStadium, setSelectedStadium, t }) => {
  const markers = [
    { id: 0, name: "MetLife Stadium", x: 330, y: 110 }, // New York/NJ
    { id: 1, name: "SoFi Stadium", x: 90, y: 140 },    // Los Angeles
    { id: 2, name: "BC Place", x: 80, y: 50 },         // Vancouver
    { id: 3, name: "Estadio Azteca", x: 170, y: 250 }  // Mexico City
  ];

  return (
    <div className="relative w-full bg-morocco-clay/20 dark:bg-morocco-clay/10 rounded-2xl p-5 border border-morocco-clay/50 overflow-hidden select-none flex flex-col gap-4">
      <span className="text-[10px] font-extrabold tracking-widest text-morocco-charcoal/40 dark:text-morocco-charcoal/50 uppercase text-start">
        {t("stadiums.arena_title")}
      </span>
      
      {/* 4:3 Aspect Ratio Container locking SVG & Markers together */}
      <div className="relative w-full aspect-[4/3] max-h-[250px] mx-auto">
        <svg viewBox="0 0 400 300" className="w-full h-full text-morocco-clay/80 dark:text-morocco-clay/30 pointer-events-none">
          {/* Ocean Grid Lines */}
          <line x1="30" y1="50" x2="370" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,15" opacity="0.3" />
          <line x1="30" y1="120" x2="370" y2="120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,15" opacity="0.3" />
          <line x1="30" y1="190" x2="370" y2="190" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,15" opacity="0.3" />
          <line x1="30" y1="260" x2="370" y2="260" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,15" opacity="0.3" />
          
          {/* Canada Landmass */}
          <path 
            d="M 30,30 L 70,30 L 90,40 L 120,40 L 150,30 L 220,35 L 280,25 L 340,35 L 380,30 L 370,60 L 340,75 L 320,70 L 260,85 L 220,75 L 180,82 L 140,75 L 100,85 L 70,80 L 50,75 Z"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          {/* USA Landmass */}
          <path 
            d="M 70,80 L 120,85 L 170,78 L 220,83 L 260,78 L 320,70 L 335,90 L 332,110 L 350,145 L 342,165 L 328,155 L 290,158 L 240,165 L 200,160 L 185,152 L 160,165 L 130,155 L 90,150 L 80,142 L 72,110 Z"
            fill="currentColor"
            fillOpacity="0.35"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          {/* Mexico Landmass */}
          <path 
            d="M 80,142 L 95,150 L 130,155 L 160,165 L 185,152 L 200,160 L 210,180 L 195,195 L 185,188 L 175,200 L 165,245 L 150,265 L 135,220 L 110,195 Z"
            fill="currentColor"
            fillOpacity="0.5"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.7"
          />

          {/* Golden connecting arcs between the stadiums */}
          <path d="M 80,50 Q 70,95 90,140" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3,3" fill="none" opacity="0.65" />
          <path d="M 90,140 Q 120,195 170,250" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3,3" fill="none" opacity="0.65" />
          <path d="M 170,250 Q 260,200 330,110" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3,3" fill="none" opacity="0.65" />
          <path d="M 330,110 Q 200,60 80,50" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3,3" fill="none" opacity="0.65" />
        </svg>

        {/* Pulsing Interactive Markers */}
        {markers.map((marker) => {
          const isActive = selectedStadium === marker.id;
          return (
            <button
              key={marker.id}
              onClick={() => setSelectedStadium(marker.id)}
              style={{ left: `${(marker.x / 400) * 100}%`, top: `${(marker.y / 300) * 100}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-20"
              aria-label={marker.name}
            >
              {isActive && (
                <span className="absolute inline-flex h-8 w-8 rounded-full bg-morocco-red/30 dark:bg-morocco-red-light/30 animate-ping -left-2.25 -top-2.25" />
              )}
              
              <span className={`relative flex h-3.5 w-3.5 rounded-full border-2 transition-all ${
                isActive 
                  ? "bg-morocco-red border-white scale-125 shadow-md" 
                  : "bg-white border-morocco-green hover:bg-morocco-green dark:border-morocco-green-light dark:hover:bg-morocco-green-light"
              }`} />

              <span className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-morocco-charcoal text-[9px] font-bold text-white whitespace-nowrap shadow-md pointer-events-none transition-all duration-300 ${
                isActive 
                  ? "opacity-100 translate-y-0 scale-100" 
                  : "opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
              }`}>
                {marker.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Ambiance = () => {
  const { t, isRtl } = useTranslation();
  const [selectedStadium, setSelectedStadium] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = [
    { id: 0, src: "/stadium_metlife.png", tagKey: "stadiums.final_tag", title: "MetLife Stadium", heightClass: "h-64 sm:h-80" },
    { id: 1, src: "/moroccan_fans.png", tagKey: "stadiums.fans_tag", title: "La Ferveur Nationale", heightClass: "h-64" },
    { id: 2, src: "/stadium_bcplace.png", tagKey: "stadiums.arena_title", title: "BC Place Stadium", heightClass: "h-64 sm:h-72" },
    { id: 3, src: "/stadium_sofi.png", tagKey: "stadiums.arena_title", title: "SoFi Stadium", heightClass: "h-64" },
    { id: 4, src: "/moroccan_fans_cheering.png", tagKey: "stadiums.fans_tag", title: "L'ambiance Rouge & Verte", heightClass: "h-64 sm:h-72" },
    { id: 5, src: "/stadium_azteca.png", tagKey: "stadiums.arena_title", title: "Estadio Azteca", heightClass: "h-64 sm:h-80" },
  ];

  // Lightbox Keyboard Navigation Controls
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const handleShare = (title, e) => {
    e.stopPropagation(); // Avoid opening lightbox on button click
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${title} - ${window.location.href}`);
      alert("Lien copié dans le presse-papiers !");
    }
  };

  return (
    <section
      id="ambiance"
      className="relative py-24 bg-morocco-ivory border-t border-morocco-clay/50 dark:border-morocco-clay/20 overflow-hidden"
    >
      <ZelligePattern opacity={0.06} className="dark:text-white/20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-sans font-bold text-xs tracking-widest text-morocco-red uppercase mb-3 block">
            {t("stadiums.tagline")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-morocco-charcoal uppercase tracking-tight mb-6">
            {t("stadiums.title")}
          </h2>
          <div className="h-1 w-16 bg-morocco-gold mx-auto mb-6" />
          <p className="font-sans text-sm md:text-base text-morocco-charcoal/70 leading-relaxed">
            {t("stadiums.description")}
          </p>
        </div>

        {/* Map & Selectors Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Stadium SVG Map */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <StadiumMapSVG selectedStadium={selectedStadium} setSelectedStadium={setSelectedStadium} t={t} />
          </div>

          {/* Right Column: Stadium Selector and Info */}
          <div className="lg:col-span-6 flex flex-col gap-8 text-start">
            <h3 className="font-display font-black text-2xl text-morocco-charcoal uppercase tracking-wide pl-1 rtl:pr-1 rtl:pl-0">
              {t("stadiums.arena_title")}
            </h3>

            {/* Selector list */}
            <div className="flex flex-col gap-3">
              {stadiumsData.map((stadium, idx) => {
                const isSelected = selectedStadium === idx;
                return (
                  <button
                    key={stadium.name}
                    onClick={() => setSelectedStadium(idx)}
                    className={`w-full flex items-center justify-between p-5 rounded-xl border text-start transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-morocco-gold ${
                      isSelected
                        ? "bg-white dark:bg-[#1e2320] border-morocco-red shadow-md"
                        : "bg-transparent border-morocco-clay hover:bg-morocco-clay/20"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span
                        className={`font-display font-extrabold text-base uppercase transition-colors ${
                          isSelected ? "text-morocco-red dark:text-morocco-red-light" : "text-morocco-charcoal"
                        }`}
                      >
                        {stadium.name}
                      </span>
                      <span className="font-sans text-xs text-morocco-charcoal/60 mt-1">
                        {t(stadium.cityKey)}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform rtl-mirror ${
                        isSelected ? "text-morocco-red dark:text-morocco-red-light translate-x-1 rtl:-translate-x-1" : "text-morocco-charcoal/30"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Selected Stadium Details Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStadium}
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-[#1e2320] border border-morocco-clay/70 dark:border-morocco-clay/20 p-6 rounded-2xl shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-morocco-gold rtl:right-0 rtl:left-auto rtl:border-r rtl:border-l-0" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-morocco-gold rtl:left-0 rtl:right-auto rtl:border-l rtl:border-r-0" />

                <div className="flex flex-wrap gap-6 mb-4 pb-4 border-b border-morocco-clay/50 dark:border-morocco-clay/20">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-morocco-green dark:text-morocco-green-light" />
                    <span className="font-sans text-xs font-bold text-morocco-charcoal/70 uppercase">
                      {t(stadiumsData[selectedStadium].cityKey)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-morocco-red dark:text-morocco-red-light" />
                    <span className="font-sans text-xs font-bold text-morocco-charcoal/70 uppercase">
                      {stadiumsData[selectedStadium].capacity} {t("stadiums.capacity_label")}
                    </span>
                  </div>
                </div>

                <p className="font-sans text-sm md:text-base text-morocco-charcoal/80 leading-relaxed text-start">
                  {t(stadiumsData[selectedStadium].descriptionKey)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Masonry Photo Gallery & Lightbox */}
        <div className="mt-20">
          <h3 className="font-display font-black text-2xl text-morocco-charcoal uppercase tracking-wide text-start mb-8 pl-1 rtl:pr-1 rtl:pl-0">
            {t("stadiums.fans_title")}
          </h3>

          <div className="columns-1 sm:columns-2 gap-6 space-y-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setLightboxIndex(index)}
                className={`relative w-full overflow-hidden rounded-2xl glass-card group cursor-pointer break-inside-avoid ${item.heightClass}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-morocco-charcoal/85 via-morocco-charcoal/20 to-transparent z-10" />
                
                {/* Visual Indicators */}
                <div className="absolute top-4 end-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => handleShare(item.title, e)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-morocco-red flex items-center justify-center text-white transition-all"
                    aria-label="Partager cette photo"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-6 left-6 right-6 z-20 text-left text-white rtl:text-right">
                  <span className="font-sans font-bold text-[9px] tracking-widest text-morocco-gold uppercase block mb-1">
                    {t(item.tagKey)}
                  </span>
                  <h4 className="font-display font-black text-xl uppercase tracking-tight">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-between p-6 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Lightbox Header */}
            <div className="flex justify-between items-center text-white w-full max-w-7xl mx-auto z-10" onClick={(e) => e.stopPropagation()}>
              <div className="text-start">
                <span className="text-[10px] font-bold text-morocco-gold uppercase tracking-widest">
                  {t(galleryItems[lightboxIndex].tagKey)}
                </span>
                <h4 className="font-display font-extrabold text-xl uppercase">{galleryItems[lightboxIndex].title}</h4>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-morocco-red text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fermer la galerie"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Main Image & Arrows */}
            <div className="flex-grow flex items-center justify-center relative w-full max-w-5xl mx-auto" onClick={(e) => e.stopPropagation()}>
              {/* Previous Arrow */}
              <button
                onClick={() => setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1))}
                className="absolute start-4 w-12 h-12 rounded-full bg-white/10 hover:bg-morocco-gold text-white hover:text-black flex items-center justify-center transition-all cursor-pointer z-10"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-6 h-6 rtl-mirror" />
              </button>

              {/* Image Frame */}
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].title}
                className="max-w-full max-h-[70vh] rounded-xl object-contain shadow-2xl"
              />

              {/* Next Arrow */}
              <button
                onClick={() => setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1))}
                className="absolute end-4 w-12 h-12 rounded-full bg-white/10 hover:bg-morocco-gold text-white hover:text-black flex items-center justify-center transition-all cursor-pointer z-10"
                aria-label="Suivant"
              >
                <ChevronRight className="w-6 h-6 rtl-mirror" />
              </button>
            </div>

            {/* Lightbox Footer */}
            <div className="text-center text-white/50 text-[10px] uppercase font-bold tracking-widest relative z-10 pb-4">
              {lightboxIndex + 1} / {galleryItems.length} • Utiliser ← et → ou Échap
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Ambiance;
