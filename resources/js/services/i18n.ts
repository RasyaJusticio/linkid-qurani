import { AppLocales } from '@/types/i18n';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const storedLocale: AppLocales = localStorage.getItem('locale') as AppLocales ?? 'id_ID';

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: storedLocale,
        fallbackLng: 'id_ID',
        ns: ['shared'],
        defaultNS: ['shared'],
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;
