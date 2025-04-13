// app/i18n.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../locales/en.json';
import es from '../../../locales/es.json';

i18next
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es },
        },
        lng: 'en', // زبان پیش‌فرض
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React خودکار این کار را انجام می‌دهد
        },
    });

export default i18next;