import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frTranslations from './locales/fr/translation.json';
import enTranslations from './locales/en/translation.json';
import arTranslations from './locales/ar/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: frTranslations },
      en: { translation: enTranslations },
      ar: { translation: arTranslations }
    },
    lng: localStorage.getItem('atlas_lions_locale') || 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false // React already escapes values (prevents XSS)
    }
  });

export default i18n;
