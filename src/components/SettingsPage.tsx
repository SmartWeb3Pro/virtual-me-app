import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SettingsPage.module.css';
import logo from '../assets/images/logo.png';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<string>('en');
  const [meetingLink, setMeetingLink] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // مدیریت زبان پیش‌فرض از Local Storage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // ذخیره زبان کاربر در Local Storage
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleCreateMeeting = async () => {
    // ایجاد لینک منحصر به فرد برای میتینگ
    const meetingId = Math.random().toString(36).substring(2, 15);
    const meetingUrl = `${window.location.origin}/join-call?meetingId=${meetingId}`;
    setMeetingLink(meetingUrl);
    setShowPopup(true);
  };

  const handleJoinMeeting = () => {
    if (meetingLink.trim() !== '') {
      const meetingId = new URL(meetingLink).searchParams.get('meetingId');
      if (meetingId) {
        navigate(`/join-call?meetingId=${meetingId}`);
      } else {
        alert('Invalid meeting link.');
      }
    } else {
      alert('Please enter a meeting link.');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleClose = () => {
    navigate('/');
  };

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

  return (
    <div className={styles.container}>
      <img src={logo} alt="Virtual-Me Logo" className={styles.logo} />
      <h2>VIRTUAL_ME</h2>
      <p className={styles.slogan}>"Your Avatar, Your World!"</p>

      <div className={styles.content}>
        <select value={language} onChange={handleLanguageChange} className={styles.popupDropdown}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <button onClick={handleCreateMeeting} className={styles.createButton}>Create New Meeting</button>

        <div className={styles.joinMeetingContainer}>
          <input
            type="text"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="Enter a code or link"
            className={styles.meetingLinkInput}
          />
          <button onClick={handleJoinMeeting} className={styles.joinButton}>Join</button>
        </div>
      </div>
      <button onClick={handleClose} className={styles.closeButton}>Close</button>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Meeting Created</h3>
            <p>Share this link to invite others:</p>
            <input type="text" value={meetingLink} readOnly className={styles.meetingLinkInput} />
            <button onClick={() => navigator.clipboard.writeText(meetingLink)} className={styles.copyButton}>Copy</button>
            <button onClick={() => navigate(`/join-call?meetingId=${new URL(meetingLink).searchParams.get('meetingId')}`)} className={styles.joinButton}>Enter Meeting</button>
            <button onClick={handleClosePopup} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;

















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './SettingsPage.module.css';
// import logo from '../assets/images/logo.png';

// const SettingsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [language, setLanguage] = useState<string>('English');
//   const [meetingLink, setMeetingLink] = useState<string>('');
//   const [showPopup, setShowPopup] = useState<boolean>(false);

//   const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setLanguage(event.target.value);
//   };

//   const handleCreateMeeting = async () => {
//     // ایجاد لینک منحصر به فرد برای میتینگ
//     const meetingId = Math.random().toString(36).substring(2, 15);
//     const meetingUrl = `${window.location.origin}/join-call?meetingId=${meetingId}`;
//     setMeetingLink(meetingUrl);
//     setShowPopup(true);
//   };

//   const handleJoinMeeting = () => {
//     if (meetingLink.trim() !== '') {
//       const meetingId = new URL(meetingLink).searchParams.get('meetingId');
//       if (meetingId) {
//         navigate(`/join-call?meetingId=${meetingId}`);
//       } else {
//         alert('Invalid meeting link.');
//       }
//     } else {
//       alert('Please enter a meeting link.');
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleClose = () => {
//     navigate('/');
//   };

//   const languages = [
//     { code: 'en', name: 'English' },
//     { code: 'fa', name: 'Persian' },
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

//   return (
//     <div className={styles.container}>
//       <img src={logo} alt="Virtual-Me Logo" className={styles.logo} />
//       <h2>VIRTUAL_ME</h2>
//       <p className={styles.slogan}>"Your Avatar, Your World!"</p>

//       <div className={styles.content}>
//         <select value={language} onChange={handleLanguageChange} className={styles.popupDropdown}>
//           {languages.map((language) => (
//             <option key={language.code} value={language.code}>
//               {language.name}
//             </option>
//           ))}
//         </select>
//         <button onClick={handleCreateMeeting} className={styles.createButton}>Create New Meeting</button>

//         <div className={styles.joinMeetingContainer}>
//           <input
//             type="text"
//             value={meetingLink}
//             onChange={(e) => setMeetingLink(e.target.value)}
//             placeholder="Enter a code or link"
//             className={styles.meetingLinkInput}
//           />
//           <button onClick={handleJoinMeeting} className={styles.joinButton}>Join</button>
//         </div>
//       </div>
//       <button onClick={handleClose} className={styles.closeButton}>Close</button>

//       {showPopup && (
//         <div className={styles.popup}>
//           <div className={styles.popupContent}>
//             <h3>Meeting Created</h3>
//             <p>Share this link to invite others:</p>
//             <input type="text" value={meetingLink} readOnly className={styles.meetingLinkInput} />
//             <button onClick={() => navigator.clipboard.writeText(meetingLink)} className={styles.copyButton}>Copy</button>
//             <button onClick={() => navigate(`/join-call?meetingId=${new URL(meetingLink).searchParams.get('meetingId')}`)} className={styles.joinButton}>Enter Meeting</button>
//             <button onClick={handleClosePopup} className={styles.closeButton}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SettingsPage;














// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './SettingsPage.module.css';
// import logo from '../assets/images/logo.png';

// const SettingsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [language, setLanguage] = useState<string>('English');
//   const [meetingLink, setMeetingLink] = useState<string>('');

//   const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setLanguage(event.target.value);
//   };

//   const handleCreateMeeting = () => {
//     navigate('/meeting', { state: { language } });
//   };

//   const handleJoinMeeting = () => {
//     if (meetingLink.trim() !== '') {
//       const meetingId = new URL(meetingLink).searchParams.get('meetingId');
//       if (meetingId) {
//         navigate(`/join-call?meetingId=${meetingId}`);
//       } else {
//         alert('Invalid meeting link.');
//       }
//     } else {
//       alert('Please enter a meeting link.');
//     }
//   };

//   const handleClose = () => {
//     navigate('/');
//   };

//   const languages = [
//     { code: 'en', name: 'English' },
//     { code: 'fa', name: 'Persian' },
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

//   return (
//     <div className={styles.container}>
//       <img src={logo} alt="Virtual-Me Logo" className={styles.logo} />
//       <h2>VIRTUAL_ME</h2>
//       <p className={styles.slogan}>"Your Avatar, Your World!"</p>

//       <div className={styles.content}>
//         <select value={language} onChange={handleLanguageChange} className={styles.popupDropdown}>
//           {languages.map((language) => (
//             <option key={language.code} value={language.code}>
//               {language.name}
//             </option>
//           ))}
//         </select>
//         <button onClick={handleCreateMeeting} className={styles.createButton}>Create New Meeting</button>

//         <div className={styles.joinMeetingContainer}>
//           <input
//             type="text"
//             value={meetingLink}
//             onChange={(e) => setMeetingLink(e.target.value)}
//             placeholder="Enter a code or link"
//             className={styles.meetingLinkInput}
//           />
//           <button onClick={handleJoinMeeting} className={styles.joinButton}>Join</button>
//         </div>
//       </div>
//       <button onClick={handleClose} className={styles.closeButton}>Close</button>
//     </div>
//   );
// };

// export default SettingsPage;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './SettingsPage.module.css';
// import logo from '../assets/images/logo.png';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';

// interface Avatar3DProps {
//   avatarUrl: string;
// }

// const Avatar3D: React.FC<Avatar3DProps> = ({ avatarUrl }) => {
//   const { scene } = useGLTF(avatarUrl);
//   return <primitive object={scene} scale={10} position={[0, -7, 0]} />;
// };

// interface Contact {
//   name: string;
//   email: string;
// }

// const SettingsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [avatar, setAvatar] = useState<string>('');
//   const [language, setLanguage] = useState<string>('English');
//   const [contact, setContact] = useState<string>('');
//   const [newContactName, setNewContactName] = useState<string>('');
//   const [newContactEmail, setNewContactEmail] = useState<string>('');
//   const [contactList, setContactList] = useState<Contact[]>([]);

//   const handleAvatarSelect = (avatarUrl: string) => {
//     setAvatar(avatarUrl);
//   };

//   const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setLanguage(event.target.value);
//   };

//   const handleContactChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setContact(event.target.value);
//   };

//   const handleNewContactNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewContactName(event.target.value);
//   };

//   const handleNewContactEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewContactEmail(event.target.value);
//   };

//   const handleAddNewContact = () => {
//     if (!newContactEmail || !newContactName) {
//       alert('Please enter a contact name and email!');
//       return;
//     }

//     const newContact = { name: newContactName, email: newContactEmail };
//     setContactList([...contactList, newContact]);
//     setNewContactName('');
//     setNewContactEmail('');
//   };

//   const handleContinue = () => {
//     const selectedContact = contactList.find(c => c.email === contact);
//     navigate('/video-call', { state: { avatar, language, contact: selectedContact } });
//   };

//   const handleClose = () => {
//     navigate('/');
//   };

//   const languages = [
//     { code: 'en', name: 'English' },
//     { code: 'fa', name: 'Persian' },
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

//   return (
//     <div className={styles.container}>
//       <img src={logo} alt="Virtual-Me Logo" className={styles.logo} />
//       <h2>VIRTUAL_ME</h2>
//       <p className={styles.slogan}>"Your Avatar, Your World!"</p>

//       <div className={styles.content}>
//         <div className={styles.avatarsContainer}>
//           <div
//             className={`${styles.avatarBox} ${avatar === "https://models.readyplayer.me/673479901fe0339526a0bccd.glb" ? styles.selected : ''}`}
//             onClick={() => handleAvatarSelect("https://models.readyplayer.me/673479901fe0339526a0bccd.glb")}
//           >
//             <Canvas style={{ width: '100%', height: '100%' }}>
//               <Avatar3D avatarUrl="https://models.readyplayer.me/673479901fe0339526a0bccd.glb" />
//               <OrbitControls enableZoom={false} />
//             </Canvas>
//           </div>
//           <div
//             className={`${styles.avatarBox} ${avatar === "https://models.readyplayer.me/67312f082e4d5adddc2f2ac3.glb" ? styles.selected : ''}`}
//             onClick={() => handleAvatarSelect("https://models.readyplayer.me/67312f082e4d5adddc2f2ac3.glb")}
//           >
//             <Canvas style={{ width: '100%', height: '100%' }}>
//               <Avatar3D avatarUrl="https://models.readyplayer.me/67312f082e4d5adddc2f2ac3.glb" />
//               <OrbitControls enableZoom={false} />
//             </Canvas>
//           </div>
//         </div>

//         <select value={language} onChange={handleLanguageChange} className={styles.popupDropdown}>
//           {languages.map((language) => (
//             <option key={language.code} value={language.code}>
//               {language.name}
//             </option>
//           ))}
//         </select>

//         <div className={styles.contactContainer}>
//           <select value={contact} onChange={handleContactChange} className={styles.popupDropdown}>
//             <option value="">Select Contact</option>
//             {contactList.map((contact, index) => (
//               <option key={index} value={contact.email}>
//                 {contact.name} ({contact.email})
//               </option>
//             ))}
//           </select>

//           <div className={styles.newContactContainer}>
//             <input
//               type="text"
//               value={newContactName}
//               onChange={handleNewContactNameChange}
//               placeholder="User name"
//               className={styles.newContactInput}
//             />
//             <input
//               type="email"
//               value={newContactEmail}
//               onChange={handleNewContactEmailChange}
//               placeholder=" email"
//               className={styles.newContactInput}
//             />
//             <button onClick={handleAddNewContact} className={styles.addContactButton}>Add Contact</button>
//           </div>
//         </div>

//         <button onClick={handleContinue} className={styles.continueButton}>Continue to Virtual Call</button>
//       </div>
//       <button onClick={handleClose} className={styles.closeButton}>Close</button>
//     </div>
//   );
// };

// export default SettingsPage;













