import { createContext, useState, useEffect } from "react";
import { getTraducciones } from "../src/services/traducciones";

export const LanguageContext = createContext({
  language: "Español",
  changeLanguage: () => {}, // Asegurémonos de que changeLanguage esté definido como una función aquí
  translations: {},
});

export const useLanguage = () => {
  const [language, setLanguage] = useState("Español");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const translationsData = await getTraducciones();

        const translationsDataToJson = JSON.stringify(translationsData);

        setTranslations(translationsDataToJson);
      } catch (error) {
        console.error(error);
        setTranslations({});
      }
    };

    fetchTranslations();
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return { language, changeLanguage, translations }; // Devolvemos un objeto con las propiedades
};
