// src/LanguageContext.js
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [isEnglish, setIsEnglish] = useState(false);

    const toggleLanguage = () => {
        setIsEnglish(!isEnglish);
    };

    return (
        <LanguageContext.Provider value={{ isEnglish, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
