import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ko from 'locales/ko.json';
import en from 'locales/en.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        resources: {
            ko,
            en,
        },
        supportedLngs: ['ko', 'en'],
        fallbackLng: 'en',
        // lng: 'ko',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            // 순서: querystring -> localStorage -> navigator(브라우저 언어) -> ...
            // order: ['querystring', 'localStorage', 'navigator', 'cookie', 'htmlTag'],
            order: ['navigator', 'localStorage'],
            // 어떤 곳에 언어 정보를 저장(캐시)할지
            caches: ['localStorage'],
        },
    });

export default i18n;
