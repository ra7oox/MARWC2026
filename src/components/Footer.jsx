import React from "react";
import { ArrowUp, ExternalLink } from "lucide-react";
import { useTranslation } from "../context/TranslationContext";

const Footer = () => {
  const { t, isRtl } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-morocco-charcoal text-morocco-ivory pt-16 pb-8 overflow-hidden border-t border-morocco-gold/15">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-morocco-red via-morocco-gold to-morocco-green" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5 text-left rtl:text-right">
            <a href="#accueil" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-morocco-red flex items-center justify-center font-display font-black text-white shadow-md">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg tracking-wider text-white uppercase leading-none">
                  {t("nav.home") === "الرئيسية" ? "أسود الأطلس" : "Lions de l'Atlas"}
                </span>
                <span className="font-sans font-medium text-[10px] tracking-widest text-morocco-gold uppercase mt-1">
                  {t("footer.fed_button")}
                </span>
              </div>
            </a>
            <p className="font-sans text-xs md:text-sm text-morocco-ivory/70 leading-relaxed max-w-sm mb-6">
              {t("footer.brand_desc")}
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-morocco-red hover:text-white flex items-center justify-center text-morocco-ivory/80 transition-colors focus-visible:outline-2 focus-visible:outline-morocco-gold"
                aria-label="Suivre sur Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-morocco-green hover:text-white flex items-center justify-center text-morocco-ivory/80 transition-colors focus-visible:outline-2 focus-visible:outline-morocco-gold"
                aria-label="Suivre sur Twitter"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-morocco-gold-dark hover:text-white flex items-center justify-center text-morocco-ivory/80 transition-colors focus-visible:outline-2 focus-visible:outline-morocco-gold"
                aria-label="Suivre sur Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-morocco-red-dark hover:text-white flex items-center justify-center text-morocco-ivory/80 transition-colors focus-visible:outline-2 focus-visible:outline-morocco-gold"
                aria-label="Suivre sur YouTube"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0 -1.94 -2C18.88 4 12 4 12 4s-6.88 0 -8.6.46a2.78 2.78 0 0 0 -1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94 -2 29 29 0 0 0 .46 -5.25a29 29 0 0 0 -.46 -5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 text-left rtl:text-right">
            <h4 className="font-display font-extrabold text-sm uppercase tracking-widest text-morocco-gold mb-6">
              {t("footer.nav_title")}
            </h4>
            <ul className="space-y-3 font-sans text-xs md:text-sm font-semibold">
              <li>
                <a href="#accueil" className="text-morocco-ivory/70 hover:text-white transition-colors">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="#histoire" className="text-morocco-ivory/70 hover:text-white transition-colors">
                  {t("nav.history")}
                </a>
              </li>
              <li>
                <a href="#joueurs" className="text-morocco-ivory/70 hover:text-white transition-colors">
                  {t("nav.squad")}
                </a>
              </li>
              <li>
                <a href="#legendes" className="text-morocco-ivory/70 hover:text-white transition-colors">
                  {t("nav.legends")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal and FRMF column */}
          <div className="md:col-span-4 text-left rtl:text-right">
            <h4 className="font-display font-extrabold text-sm uppercase tracking-widest text-morocco-gold mb-6">
              {t("footer.fed_title")}
            </h4>
            <p className="font-sans text-xs text-morocco-ivory/70 leading-relaxed mb-4">
              {t("footer.fed_text")}
            </p>
            <a
              href="https://www.frmf.ma"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-sans font-bold text-xs text-morocco-gold-dark hover:text-morocco-gold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-morocco-gold"
            >
              {t("footer.fed_button")}
              <ExternalLink className="w-3.5 h-3.5 rtl-mirror" />
            </a>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] text-morocco-ivory/50 text-center sm:text-left rtl:sm:text-right">
            © {new Date().getFullYear()} {t("footer.copy_notice")}
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 bg-white/5 hover:bg-morocco-gold text-morocco-ivory hover:text-morocco-charcoal text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-morocco-gold"
            aria-label={t("footer.back_to_top")}
          >
            {t("footer.back_to_top")}
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
