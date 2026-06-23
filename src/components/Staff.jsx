import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useTranslation } from "../context/TranslationContext";
import ZelligePattern from "./ZelligePattern";
import { coachData } from "../data/mockData";

const Staff = () => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const resolveStaffImage = (path) => {
    try {
      return new URL(`../assets/${path}`, import.meta.url).href;
    } catch (e) {
      return null;
    }
  };

  const coachImageSrc = resolveStaffImage(coachData.imagePath);

  return (
    <section
      id="selectionneur"
      className="relative py-24 bg-morocco-ivory border-t border-morocco-clay/50 overflow-hidden"
    >
      <ZelligePattern opacity={0.05} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-sans font-bold text-xs tracking-widest text-morocco-red uppercase mb-3 block">
            {t("staff.tagline")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-morocco-charcoal uppercase tracking-tight mb-6">
            {t("staff.title")}
          </h2>
          <div className="h-1 w-16 bg-morocco-gold mx-auto mb-6" />
          <p className="font-sans text-sm md:text-base text-morocco-charcoal/70 leading-relaxed">
            {t("staff.description")}
          </p>
        </div>

        {/* Coach Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Main Coach Feature Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            className="lg:col-span-7 glass-card p-8 md:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background Zellige accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-morocco-red/5 rounded-bl-full pointer-events-none rtl:left-0 rtl:right-auto rtl:rounded-br-full" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center gap-2 text-morocco-red mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="font-sans font-extrabold text-[10px] tracking-widest uppercase">
                  {t(coachData.roleKey)}
                </span>
              </div>

              {/* Layout for Coach Name + Fallback Avatar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                {/* Coach Portrait or Monogram */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-morocco-red to-morocco-green p-0.5 shadow-md overflow-hidden flex-shrink-0 relative">
                  {!imageError && coachImageSrc ? (
                    <img
                      src={coachImageSrc}
                      alt={coachData.name}
                      loading="lazy"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1E2522] flex flex-col items-center justify-center relative">
                      <ZelligePattern opacity={0.15} />
                      <span className="font-display font-black text-2xl text-white relative z-10">M.W</span>
                    </div>
                  )}
                </div>

                <div className="text-start">
                  <h3 className="font-display font-black text-4xl text-morocco-charcoal uppercase leading-none">
                    {coachData.name}
                  </h3>
                  <span className="font-sans text-xs text-morocco-gold-dark font-bold mt-1.5 block">
                    {t("staff.coach_role")}
                  </span>
                </div>
              </div>

              {/* Bio (Improved text contrast to text-morocco-charcoal/80) */}
              <p className="font-sans text-sm md:text-base text-morocco-charcoal/80 leading-relaxed mb-8 text-start">
                {t(coachData.bioKey)}
              </p>
            </div>

            {/* Philosophy Box */}
            <div className="bg-morocco-red/5 border-l-4 border-morocco-red p-5 rounded-r-xl text-left rtl:border-l-0 rtl:border-r-4 rtl:rounded-r-none rtl:rounded-l-xl rtl:text-right">
              <div className="flex items-center gap-2 mb-2 text-morocco-red rtl:justify-start">
                <Heart className="w-4 h-4 fill-morocco-red" />
                <h4 className="font-display font-extrabold text-sm uppercase tracking-wider">
                  {t("staff.philosophy_title")}
                </h4>
              </div>
              <p className="font-sans text-xs md:text-sm text-morocco-charcoal/80 italic leading-relaxed">
                "{t(coachData.philosophyKey)}"
              </p>
            </div>
          </motion.div>

          {/* Technical Staff list */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col justify-between gap-6 h-full"
          >
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-extrabold text-lg text-morocco-charcoal uppercase tracking-wider text-start px-2">
                {t("staff.sub_staff_title")}
              </h4>

              <div className="space-y-4">
                {coachData.staff.map((member) => (
                  <div
                    key={member.name}
                    className="glass-card p-5 rounded-xl flex items-center justify-between border border-morocco-clay hover:border-morocco-green/30 transition-all"
                  >
                    <div className="text-start">
                      <h5 className="font-display font-bold text-base text-morocco-charcoal uppercase">
                        {member.name}
                      </h5>
                      <span className="font-sans text-xs text-morocco-charcoal/60 mt-0.5 block">
                        {t(member.roleKey)}
                      </span>
                    </div>
                    {/* Visual indicator dot */}
                    <div className="w-3 h-3 rounded-full bg-morocco-green/20 border border-morocco-green" />
                  </div>
                ))}
              </div>
            </div>

            {/* Federation Seal Info */}
            <div className="border border-dashed border-morocco-clay p-6 rounded-xl text-start">
              <span className="font-sans font-bold text-[10px] tracking-widest text-morocco-charcoal/50 uppercase block mb-1">
                {t("staff.federation_seal_title")}
              </span>
              <p className="font-sans text-[11px] text-morocco-charcoal/70 leading-relaxed">
                {t("staff.federation_seal_text")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Staff;
