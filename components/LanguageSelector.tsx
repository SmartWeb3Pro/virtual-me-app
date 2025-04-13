import React from 'react';
import './LanguageSelector.css'; // Import CSS file

interface LanguageSelectorProps {
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onChange }) => {
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select onChange={handleLanguageChange} aria-label="Language Selector" className="language-selector" defaultValue="">
      <option value="" disabled hidden>🌐 Select Language</option>
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      {/* Add more languages here */}
    </select>
  );
};

export default LanguageSelector;






// import React from 'react';
// import './LanguageSelector.css'; // ایمپورت فایل CSS

// interface LanguageSelectorProps {
//   onChange: (language: string) => void;
// }

// const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onChange }) => {
//   const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     onChange(event.target.value);
//   };

//   return (
//     <select onChange={handleLanguageChange} aria-label="Language Selector" className="language-selector">
//       <option value="" disabled selected hidden>🌐 Select Language</option>
//       <option value="English">English</option>
//       <option value="Spanish">Spanish</option>
//       <option value="French">French</option>
//       {/* اضافه کردن زبان‌های دیگر در اینجا */}
//     </select>
//   );
// };

// export default LanguageSelector;








// // app/components/LanguageSelector.tsx
// import React from 'react';
// import { useLanguage } from '../context/LanguageContext';

// const LanguageSelector: React.FC = () => {
//     const { setLanguage } = useLanguage();

//     const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setLanguage(event.target.value);
//     };

//     return (
//         <div>
//             <label htmlFor="language-select">Choose a language:</label>
//             <select id="language-select" onChange={handleChange}>
//                 <option value="en">English</option>
//                 <option value="es">Spanish</option>
//                 {/* Add more languages as needed */}
//             </select>
//         </div>
//     );
// };

// export default LanguageSelector;