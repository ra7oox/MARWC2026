import React from "react";
import { motion } from "framer-motion";
import { Award, Quote, Share2 } from "lucide-react";
import { useTranslation } from "../context/TranslationContext";
import ZelligePattern from "./ZelligePattern";
import { legendsData } from "../data/mockData";

const Legends = () => {
  const { t, isRtl } = useTranslation();

  const handleShare = (name) => {
    const text = `${name} - Légende des Lions de l'Atlas`;
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="legendes"
      className="relative py-28 bg-[#15120C] text-morocco-ivory border-y border-morocco-gold/20 overflow-hidden"
    >
      {/* Decorative subtle Zellige pattern in gold lines */}
      <ZelligePattern opacity={0.04} className="text-morocco-gold" />

      {/* Gold Sand Radial Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-morocco-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-morocco-red/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-sans font-bold text-xs tracking-widest text-morocco-gold uppercase mb-3 block">
            {t("legends.tagline")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tight mb-6">
            {t("legends.title")}
          </h2>
          <div className="h-1 w-16 bg-morocco-gold mx-auto mb-6" />
          <p className="font-sans text-sm md:text-base text-morocco-ivory/70 leading-relaxed">
            {t("legends.description")}
          </p>
        </div>

        {/* Legends Grid (items-stretch for uniform heights) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch"
        >
          {legendsData.map((legend) => {
            const legendName = t(`legends.${legend.id}.name`);
            const legendQuote = t(`legends.${legend.id}.quote`);
            const legendBio = t(`legends.${legend.id}.bio`);
            const legendDistinction = t(legend.distinctionKey);
            const legendCaps = t(legend.capsKey);

            return (
              <motion.div
                key={legend.id}
                variants={cardVariants}
                className="group relative bg-[#1E1A12] border border-morocco-gold/15 rounded-2xl p-8 transition-all duration-500 hover:border-morocco-gold/40 hover:shadow-2xl hover:shadow-morocco-gold/5 flex flex-col justify-between h-full"
              >
                {/* Double border effect for classic museum feel */}
                <div className="absolute inset-2 border border-morocco-gold/5 rounded-xl pointer-events-none group-hover:border-morocco-gold/15 transition-colors" />

                <div className="text-start">
                  {/* Meta / Years */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-morocco-gold">
                      <Award className="w-4 h-4" />
                      <span className="font-sans font-extrabold text-[10px] tracking-widest uppercase">
                        {legendDistinction}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 relative z-20">
                      <button
                        onClick={() => handleShare(legendName)}
                        className="p-1.5 rounded-full bg-white/5 hover:bg-morocco-red text-white/60 hover:text-white transition-all cursor-pointer focus-visible:outline-1"
                        aria-label="Partager cette légende"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-sans text-[11px] font-bold text-white/40 tracking-wider">
                        {legend.years}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-black text-3xl text-white uppercase tracking-tight mb-1">
                    {legendName}
                  </h3>
                  <p className="font-sans text-xs text-morocco-gold/70 font-semibold mb-6">
                    {legendCaps}
                  </p>

                  {/* Quote Block (Logical border padding) */}
                  <div className="relative mb-6 ps-6 border-s border-morocco-gold/30">
                    <Quote className="absolute top-0 start-0 -translate-x-1.5 -translate-y-1.5 w-4 h-4 text-morocco-gold/40 rotate-180 rtl:translate-x-1.5 rtl:rotate-0" />
                    <p className="font-sans text-sm italic text-morocco-ivory/90 leading-relaxed">
                      "{legendQuote}"
                    </p>
                  </div>
                </div>

                {/* Bio description (Improved contrast text-morocco-ivory/70) */}
                <p className="font-sans text-xs md:text-sm text-morocco-ivory/70 leading-relaxed border-t border-white/5 pt-6 mt-4 text-start">
                  {legendBio}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Legends;
