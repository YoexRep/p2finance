import { createContext, useState, useEffect } from "react";

import { getTraducciones } from "../src/services/traducciones";

export const LanguageContext = createContext({
  language: "Español", // Establece un idioma predeterminado, por ejemplo, inglés (en)
  setLanguage: () => {}, // Función para cambiar el idioma
  translations: {}, // Aquí se almacenarán las traducciones obtenidas de la API
});

export const useLanguage = () => {
  const [language, setLanguage] = useState("Español"); // Establece el idioma inicial
  const [translations, setTranslations] = useState({}); // Estado para almacenar las traducciones

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        // Llamada al servicio API para obtener las traducciones
        const translationsData = await getTraducciones();

        // Actualizar el estado con las traducciones obtenidas
        setTranslations(translationsData);
      } catch (error) {
        console.error(error);
        // Manejo de errores, por ejemplo, mostrar un mensaje de error o realizar acciones adicionales
        setTranslations({}); // Establecer las traducciones como un objeto vacío en caso de error
      }
    };

    fetchTranslations(); // Llama a la función para obtener las traducciones al cargar el componente o cambiar el idioma

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]); // Vuelve a cargar las traducciones cuando cambia el idioma

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return [language, changeLanguage, translations];
};
