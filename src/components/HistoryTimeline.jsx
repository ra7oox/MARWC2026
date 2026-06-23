import React from "react";
import { motion } from "framer-motion";
import { Star, Award, MapPin } from "lucide-react";
import { useTranslation } from "../context/TranslationContext";
import ZelligePattern from "./ZelligePattern";
import { historyData } from "../data/mockData";

const HistoryTimeline = () => {
  const { t, isRtl } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <section
      id="histoire"
      className="relative py-24 bg-morocco-ivory border-t border-morocco-clay/50 overflow-hidden"
    >
      {/* Subtle Moroccan motif background */}
      <ZelligePattern opacity={0.05} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-sans font-bold text-xs tracking-widest text-morocco-red uppercase mb-3 block">
            {t("history.tagline")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-morocco-charcoal uppercase tracking-tight mb-6">
            {t("history.title")}
          </h2>
          <div className="h-1 w-16 bg-morocco-gold mx-auto mb-6" />
          <p className="font-sans text-sm md:text-base text-morocco-charcoal/70 leading-relaxed">
            {t("history.description")}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-12">
          {/* Vertical Center Line (Logical start positioning) */}
          <motion.div
            className={`absolute start-4 md:start-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-morocco-red via-morocco-gold to-morocco-green-light ${
              isRtl ? "md:translate-x-1/2" : "md:-translate-x-1/2"
            }`}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            {historyData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  } relative`}
                >
                  {/* Anchor Point (Dot) */}
                  <div className={`absolute start-4 md:start-1/2 top-6 z-20 ${
                    isRtl 
                      ? "transform translate-x-[7px] md:translate-x-[9px]" 
                      : "transform -translate-x-[7px] md:-translate-x-[9px]"
                  }`}>
                    <motion.div
                      className={`w-[16px] h-[16px] md:w-[20px] md:h-[20px] rounded-full border-4 ${
                        item.highlight
                          ? "bg-morocco-gold border-morocco-green animate-pulse"
                          : "bg-morocco-red border-morocco-ivory"
                      } shadow-md`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    />
                  </div>

                  {/* Left Spacer / Right Content depending on index */}
                  <div className="w-full md:w-1/2" />

                  {/* Timeline Content Block */}
                  <motion.div
                    className={`w-full md:w-1/2 ps-12 md:ps-0 ${
                      isEven ? "md:pe-12 md:text-end text-start" : "md:ps-12 md:text-start text-start"
                    }`}
                    initial={{ opacity: 0, x: isEven ? (isRtl ? -30 : 30) : (isRtl ? 30 : -30) }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      className={`glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all ${
                        item.highlight
                          ? "border-2 border-morocco-gold/70 bg-gradient-to-br from-white to-morocco-gold/5 shadow-xl shadow-morocco-gold/5"
                          : "border border-morocco-clay/70 hover:border-morocco-red/30"
                      }`}
                    >
                      {/* Highlighted Ribbon */}
                      {item.highlight && (
                        <div className={`absolute top-0 bg-morocco-gold text-morocco-charcoal font-sans font-extrabold text-[9px] tracking-widest uppercase py-1 px-4 flex items-center gap-1 shadow-sm ${
                          isRtl ? "left-0 rounded-br-xl" : "right-0 rounded-bl-xl"
                        }`}>
                          <Star className="w-3 h-3 fill-morocco-charcoal" />
                          {t("history.historic_feat")}
                        </div>
                      )}

                      {/* Header info */}
                      <div
                        className={`flex flex-col ${
                          isEven ? "md:items-end" : "items-start"
                        } mb-4`}
                      >
                        <span
                          className={`font-display font-black text-4xl md:text-5xl leading-none ${
                            item.highlight ? "text-morocco-gold-dark" : "text-morocco-red"
                          }`}
                        >
                          {item.year}
                        </span>
                        <div className="flex items-center gap-1.5 mt-2 font-sans font-bold text-xs tracking-wider text-morocco-charcoal/60 uppercase">
                          <MapPin className="w-3.5 h-3.5 text-morocco-green" />
                          <span>{t("history.host_label")} {item.host}</span>
                        </div>
                      </div>

                      {/* Result Badge */}
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 ${
                          item.highlight
                            ? "bg-morocco-green text-morocco-ivory"
                            : "bg-morocco-clay/50 text-morocco-charcoal/70"
                        }`}
                      >
                        {t(item.resultKey)}
                      </div>

                      {/* Anecdote Text */}
                      <p className="font-sans text-sm md:text-base text-morocco-charcoal/70 leading-relaxed">
                        {t(item.anecdoteKey)}
                      </p>

                      {/* Decorative elements for Highlighted 2022 */}
                      {item.highlight && (
                        <div className={`mt-6 flex ${isEven ? "md:justify-end" : "justify-start"} gap-4 text-xs font-bold text-morocco-green-dark border-t border-morocco-gold/20 pt-4`}>
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-morocco-gold" />
                            <span>{t("history.first_african_semi")}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
