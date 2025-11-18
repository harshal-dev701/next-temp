import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
    english: require("../JSON/languages/english/common.json"),
    spanish: require("../JSON/languages/spanish/common.json"),
};

export const useTranslation = () => {
  const { language } = useLanguage();
  return translations[language] || translations["english"];
};
