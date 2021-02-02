import i18n from 'i18next'
// import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from 'react-i18next'
// import XHR from 'i18next-xhr-backend'
import languageEN from './locate/en/translate.json'
import languageZHHK from './locate/zh-hk/translate.json'

i18n
// .use(XHR)
// .use(LanguageDetector)
.use(initReactI18next)
.init({
    resources: {
        en: languageEN,
        zh_hk: languageZHHK
    },
    /* default language when load the website in browser */
    lng: "zh_hk",
    /* When react i18next not finding any language to as default in borwser */
    fallbackLng: "zh_hk",
    /* debugger For Development environment */
    debug: true,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        wait: true,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default'
    }
})

export default i18n;