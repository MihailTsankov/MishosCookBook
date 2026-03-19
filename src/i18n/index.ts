import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import bg from "./bg.json";
import en from "./en.json";
import fr from "./fr.json";

i18n.use(initReactI18next).init({
    resources: {
        bg: { translation: bg },
        en: { translation: en },
        fr: { translation: fr },
    },
    lng: "bg",
    fallbackLng: "bg",
    interpolation: {
        escapeValue: false, // React already escapes
    },
});

export default i18n;

