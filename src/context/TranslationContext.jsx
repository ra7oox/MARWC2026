import React, { createContext, useContext, useEffect } from "react";
import { useTranslation as useI18nTranslation } from "react-i18next";
import "../i18n"; // Import i18n configuration

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { t, i18n } = useI18nTranslation();
  const locale = i18n.language || "fr";

  useEffect(() => {
    localStorage.setItem("atlas_lions_locale", locale);
    
    const html = document.documentElement;
    html.setAttribute("lang", locale);
    
    if (locale === "ar") {
      html.setAttribute("dir", "rtl");
      html.classList.add("arabic-mode");
    } else {
      html.setAttribute("dir", "ltr");
      html.classList.remove("arabic-mode");
    }
  }, [locale]);

  const changeLanguage = (newLocale) => {
    if (["fr", "en", "ar"].includes(newLocale)) {
      i18n.changeLanguage(newLocale);
    }
  };

  return (
    <TranslationContext.Provider value={{ locale, t, changeLanguage, isRtl: locale === "ar" }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
