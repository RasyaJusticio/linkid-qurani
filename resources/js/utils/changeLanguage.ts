import i18n from '@/services/i18n';
import { AppLocales } from '@/types/i18n';
import Cookies from 'js-cookie';

export const changeLanguage = (lng: AppLocales) => {
    i18n.changeLanguage(lng).then(() => {
        localStorage.setItem('language', lng);

        Cookies.set('language', lng, {
            path: '/',
            sameSite: 'Lax',
            expires: 365,
        });
    });
};
