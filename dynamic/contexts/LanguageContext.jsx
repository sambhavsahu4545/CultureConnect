// Language context - manages app language and translations
// Supports multiple languages and right-to-left (RTL) text for Arabic

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

// Create the context
const LanguageContext = createContext();

// Hook to use language context in components
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Language provider - manages current language and translations
export const LanguageProvider = ({ children }) => {
    // Get saved language from browser storage, or default to English
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en';
    });

    // Current translations object for the selected language
    const [t, setT] = useState(translations[language] || translations.en);

    // When language changes, update translations and save to storage
    useEffect(() => {
        // Update translations
        setT(translations[language] || translations.en);
        // Save language preference to browser storage
        localStorage.setItem('language', language);
        
        // Set text direction for RTL languages (like Arabic)
        if (language === 'ar') {
            document.documentElement.dir = 'rtl'; // Right-to-left
        } else {
            document.documentElement.dir = 'ltr'; // Left-to-right (default)
        }
    }, [language]);

    // Change the app language
    const changeLanguage = (langCode) => {
        setLanguage(langCode);
    };

    // Translate a key to the current language
    // Falls back to English if translation not found, then to the key itself
    const translate = (key) => {
        if (t[key]) {
            return t[key]; // Return translation if available
        }
        // Fallback to English translation
        const englishTranslations = translations['en'] || {};
        return englishTranslations[key] || key; // Return English or the key itself
    };

    // Provide language state and functions to all child components
    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t: translate }}>
            {children}
        </LanguageContext.Provider>
    );
};

