const translations = {
    en: {
        welcome: "Welcome",
        message: "This is a multilingual application."
    },
    jp: {
        welcome: "ようこそ",
        message: "これは多言語アプリケーションです。"
    },
    // Add more translations as needed
};

export const translate = (key, language) => {
    return translations[language][key] || translations['en'][key]; // Fallback to English
};