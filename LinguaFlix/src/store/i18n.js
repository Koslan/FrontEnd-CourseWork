import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { uk } from '../i18n/locales/uk/uk.js';
import { en } from '../i18n/locales/en/en.js';

const resources = {
  en: {
    translation: en
  },
  uk: {
    translation: uk
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // use language detector
  .init({
    resources,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false // react already escapes values
    }
  });

export default i18n;
