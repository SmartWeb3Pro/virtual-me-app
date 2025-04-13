import { useState } from 'react';
import axios from 'axios';

const TranslatePage = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fa');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fa', name: 'Persian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'es', name: 'Spanish' },
    { code: 'it', name: 'Italian' },
    { code: 'ru', name: 'Russian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'hi', name: 'Hindi' },
    { code: 'tr', name: 'Turkish' },
    { code: 'ko', name: 'Korean' },
    { code: 'fr', name: 'French' },
    { code: 'sv', name: 'Swedish' },
    { code: 'da', name: 'Danish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'fi', name: 'Finnish' },
    { code: 'ga', name: 'Irish' },
  ];

  const translateText = async (text: string) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/translate', {
        text: text,
        source_language: sourceLanguage,
        target_language: targetLanguage,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const handleTranslate = () => {
    translateText(text);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <button onClick={handleTranslate}>Translate</button>
      <p>Translated Text: {translatedText}</p>
    </div>
  );
};

export default TranslatePage;

















// import { useState } from 'react';
// import axios from 'axios';

// const TranslatePage = () => {
//   const [text, setText] = useState('');
//   const [translatedText, setTranslatedText] = useState('');
//   const [sourceLanguage, setSourceLanguage] = useState('en');
//   const [targetLanguage, setTargetLanguage] = useState('fa');

//   const languages = [
//     { code: 'en', name: 'English' },
//     { code: 'fa', name: 'Farsi' },
//     { code: 'ar', name: 'Arabic' },
//     { code: 'de', name: 'German' },
//     { code: 'zh', name: 'Chinese' },
//     { code: 'ja', name: 'Japanese' },
//     { code: 'es', name: 'Spanish' },
//     { code: 'it', name: 'Italian' },
//     { code: 'ru', name: 'Russian' },
//     { code: 'pt', name: 'Portuguese' },
//     { code: 'hi', name: 'Hindi' },
//     { code: 'tr', name: 'Turkish' },
//     { code: 'ko', name: 'Korean' },
//     { code: 'fr', name: 'French' },
//     { code: 'sv', name: 'Swedish' },
//     { code: 'da', name: 'Danish' },
//     { code: 'nl', name: 'Dutch' },
//     { code: 'fi', name: 'Finnish' },
//     { code: 'ga', name: 'Irish' },
//   ];

//   const translateText = async (text: string) => {
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/translate', {
//         text: text,
//         source_language: sourceLanguage,
//         target_language: targetLanguage,
//       }, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       setTranslatedText(response.data.translatedText);
//     } catch (error) {
//       console.error('Error translating text:', error);
//     }
//   };

//   const handleTranslate = () => {
//     translateText(text);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Enter text to translate"
//       />
//       <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
//         {languages.map((language) => (
//           <option key={language.code} value={language.code}>
//             {language.name}
//           </option>
//         ))}
//       </select>
//       <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
//         {languages.map((language) => (
//           <option key={language.code} value={language.code}>
//             {language.name}
//           </option>
//         ))}
//       </select>
//       <button onClick={handleTranslate}>Translate</button>
//       <p>Translated Text: {translatedText}</p>
//     </div>
//   );
// };

// export default TranslatePage;


