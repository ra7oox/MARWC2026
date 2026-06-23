import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Trophy, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";
import { useTranslation } from "../context/TranslationContext";
import { matchesData } from "../data/mockData";

// Mini countdown component for upcoming matches
const MiniCountdown = ({ targetDate }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft(t("hero.matchday"));
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      setTimeLeft(`${days}j ${hours}h ${minutes}m`);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000); // Update every minute
    return () => clearInterval(timer);
  }, [targetDate, t]);

  return (
    <span className="inline-flex items-center gap-1.5 bg-morocco-red/10 text-morocco-red dark:text-morocco-red-light dark:bg-morocco-red/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-morocco-red dark:bg-morocco-red-light animate-ping" />
      {timeLeft}
    </span>
  );
};

const MatchCenter = () => {
  const { t, isRtl } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", labelKey: "matches.tab_all" },
    { id: "played", labelKey: "matches.tab_played" },
    { id: "upcoming", labelKey: "matches.tab_upcoming" }
  ];

  const filteredMatches = matchesData.filter(match => {
    if (activeTab === "all") return true;
    if (activeTab === "played") return match.status === "played";
    if (activeTab === "upcoming") return match.status === "upcoming" || match.status === "tbd";
    return true;
  });

  return (
    <section 
      id="match-center" 
      className="relative py-24 bg-morocco-ivory border-t border-morocco-clay/50 dark:border-morocco-clay/20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 zellige-pattern opacity-[0.05] dark:opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans font-bold text-xs tracking-widest text-morocco-red uppercase mb-3 block">
            {t("matches.tagline")}
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-morocco-charcoal uppercase tracking-tight mb-6">
            {t("matches.title")}
          </h2>
          <div className="h-1 w-16 bg-morocco-gold mx-auto mb-6" />
          <p className="font-sans text-sm md:text-base text-morocco-charcoal/70 leading-relaxed">
            {t("matches.description")}
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-sans font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-morocco-gold ${
                activeTab === tab.id
                  ? "bg-morocco-red text-white border-morocco-red shadow-md"
                  : "bg-transparent text-morocco-charcoal/70 border-morocco-clay hover:bg-morocco-clay/30"
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        {/* Matches Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredMatches.map((match) => {
              const opponent = t(match.opponentKey);
              const competition = t(match.competitionKey);
              const isWin = match.result === "win";
              const isDraw = match.result === "draw";

              return (
                <motion.div
                  layout
                  key={match.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-6 rounded-2xl flex flex-col justify-between select-none relative overflow-hidden group hover:translate-y-[-4px] hover:shadow-lg dark:hover:shadow-black/20"
                >
                  <div>
                    {/* Card Header / Competition Info */}
                    <div className="flex items-center justify-between mb-4 border-b border-morocco-clay/40 pb-3">
                      <span className="text-[10px] font-bold text-morocco-green dark:text-morocco-green-light tracking-widest uppercase">
                        {competition}
                      </span>
                      {match.status === "played" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-morocco-charcoal/60 uppercase">
                          <CheckCircle className="w-3 h-3 text-morocco-green" />
                          {t("matches.status_played")}
                        </span>
                      ) : match.status === "upcoming" ? (
                        <MiniCountdown targetDate={match.countdownTarget} />
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-morocco-gold-dark dark:text-morocco-gold-light uppercase">
                          <HelpCircle className="w-3 h-3" />
                          {t("matches.status_tbd")}
                        </span>
                      )}
                    </div>

                    {/* Opponent Flag + Name */}
                    <div className="flex items-center gap-4 my-4">
                      <div className="w-14 h-14 rounded-full bg-morocco-clay/20 flex items-center justify-center text-3xl shadow-inner relative border border-morocco-clay/30">
                        <span>{match.opponentFlag}</span>
                      </div>
                      <div className="text-start">
                        <span className="text-[10px] font-bold text-morocco-charcoal/40 uppercase tracking-wider block">
                          MAROC vs
                        </span>
                        <h4 className="font-display font-black text-2xl text-morocco-charcoal uppercase leading-tight mt-0.5">
                          {opponent}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Score or Status info */}
                  <div className="mt-6">
                    {match.status === "played" ? (
                      <div className="flex items-center justify-between bg-morocco-clay/20 dark:bg-morocco-clay/5 p-3 rounded-xl">
                        <span className="text-xs font-bold text-morocco-charcoal/50 uppercase">Score</span>
                        <span className={`font-display font-black text-2xl ${
                          isWin ? "text-morocco-green" : isDraw ? "text-morocco-charcoal" : "text-morocco-red"
                        }`}>
                          {match.score}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {/* Match details (Date & Venue) */}
                        <div className="flex items-center gap-2 text-xs text-morocco-charcoal/60 dark:text-morocco-charcoal/40 text-start">
                          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{match.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-morocco-charcoal/60 dark:text-morocco-charcoal/40 text-start">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{match.venue}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MatchCenter;
