import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translate } from '../lib/translationService';

const TranslationDisplay = () => {
    const { language } = useLanguage();

    return (
        <div>
            <h1>{translate('welcome', language)}</h1>
            <p>{translate('message', language)}</p>
        </div>
    );
};

export default TranslationDisplay;