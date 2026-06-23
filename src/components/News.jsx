import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Share2, Sparkles } from "lucide-react";
import { useTranslation } from "../context/TranslationContext";
import ZelligePattern from "./ZelligePattern";

const News = () => {
  const { t, isRtl } = useTranslation();

  const newsData = [
    {
      id: 1,
      titleKey: "news.art1_title",
      descKey: "news.art1_desc",
      date: "2026-06-18",
      categoryKey: "news.cat_prep",
      bgGradient: "from-emerald-800/80 to-emerald-950/90",
      photoSymbol: "⚽"
    },
    {
      id: 2,
      titleKey: "news.art2_title",
      descKey: "news.art2_desc",
      date: "2026-06-15",
      categoryKey: "news.cat_interview",
      bgGradient: "from-red-800/80 to-red-950/90",
      photoSymbol: "🎙️"
    },
    {
      id: 3,
      titleKey: "news.art3_title",
      descKey: "news.art3_desc",
      date: "2026-06-12",
      categoryKey: "news.cat_supporters",
      bgGradient: "from-amber-600/80 to-amber-950/90",
      photoSymbol: "📣"
    }
  ];

  const handleShare = (title) => {
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
      id="actualites" 
      className="relative py-24 bg-white dark:bg-[#121513] border-t border-morocco-clay/50 dark:border-morocco-clay/20 overflow-hidden"
    >
      <ZelligePattern opacity={0.03} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans font-bold text-xs tracking-widest text-morocco-red uppercase mb-3 block">
            {t("news.tagline")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-morocco-charcoal uppercase tracking-tight mb-6">
            {t("news.title")}
          </h2>
          <div className="h-1 w-16 bg-morocco-gold mx-auto mb-6" />
          <p className="font-sans text-sm md:text-base text-morocco-charcoal/70 leading-relaxed">
            {t("news.description")}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((art, idx) => {
            const title = t(art.titleKey);
            const desc = t(art.descKey);
            const category = t(art.categoryKey);

            return (
              <motion.article
                key={art.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card flex flex-col justify-between rounded-2xl overflow-hidden group hover:translate-y-[-5px] hover:shadow-xl dark:hover:shadow-black/30 transition-all duration-300 select-none h-full"
              >
                <div>
                  {/* Photo Placeholder Container */}
                  <div className={`relative h-[200px] w-full bg-gradient-to-tr ${art.bgGradient} flex items-center justify-center overflow-hidden`}>
                    <ZelligePattern opacity={0.12} />
                    <span className="text-5xl relative z-10 drop-shadow-md transform group-hover:scale-110 transition-transform duration-500">
                      {art.photoSymbol}
                    </span>
                    <div className="absolute top-4 start-4 bg-morocco-red text-white text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md">
                      {category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 text-start">
                    <div className="flex items-center gap-2 text-xs text-morocco-charcoal/50 dark:text-morocco-charcoal/40 mb-3 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{art.date}</span>
                    </div>
                    <h3 className="font-display font-black text-xl text-morocco-charcoal uppercase leading-snug mb-3 group-hover:text-morocco-red dark:group-hover:text-morocco-red-light transition-colors">
                      {title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-morocco-charcoal/70 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-morocco-clay/20 mt-4">
                  <button
                    onClick={() => handleShare(title)}
                    className="p-2 rounded-full hover:bg-morocco-clay/20 text-morocco-charcoal/50 hover:text-morocco-red transition-colors cursor-pointer"
                    aria-label="Partager cet article"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <a
                    href="#actualites"
                    className="inline-flex items-center gap-1 text-[10px] font-extrabold text-morocco-green hover:text-morocco-red dark:text-morocco-green-light dark:hover:text-morocco-red-light uppercase tracking-wider transition-colors group/link"
                  >
                    {t("news.read_more")}
                    <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl-mirror" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default News;
