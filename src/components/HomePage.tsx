import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import logo from '../assets/images/logo.png';
import backgroundImage from '../assets/images/background-image.png'; // اضافه کردن ایمپورت backgroundImage
import './HomePage.module.css'; // اضافه کردن استایل‌های مربوط به تنظیمات

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleMakeVideoCall = () => {
    navigate('/login'); // هدایت به صفحه لاگین
  };

  return (
    <div className={styles['home-container']}>
      <div className={styles['background-overlay']} style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <img src={logo} alt="Virtual-Me Logo" className={styles.logo} />
      <div className={styles.tagline}>Your Avatar, Your World!</div>
      <div className={styles.welcome}>Welcome to Virtual-Me!</div>
      <div className={styles.description}>
        Step into the future of communication with Virtual-Me. Connect with your friends using video avatars, enjoy real-time translation, and speak any language with ease.
      </div>
      <div className={styles.freeCalls}>
        Your first two calls are free. After that, recharge your account with TON cryptocurrency to enjoy seamless communication.
      </div>
      <button className={styles.callButton} onClick={handleMakeVideoCall}>Make Video Call</button>
    </div>
  );
};

export default HomePage;















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './HomePage.module.css';
// import logo from '../assets/images/logo.png';
// import backgroundImage from '../assets/images/background-image.png'; // اضافه کردن ایمپورت backgroundImage
// import { Canvas } from '@react-three/fiber';
// import { useGLTF, OrbitControls } from '@react-three/drei';
// import * as THREE from 'three'; // اضافه کردن ایمپورت THREE
// import './HomePage.module.css'; // اضافه کردن استایل‌های مربوط به لاگین و تنظیمات

// interface Avatar3DProps {
//   avatarUrl: string;
// }

// const Avatar3D: React.FC<Avatar3DProps> = ({ avatarUrl }) => {
//   const { scene } = useGLTF(avatarUrl);
//   scene.rotation.x = -Math.PI / 15;
//   scene.position.y = -30;
//   scene.position.z = -1.5;

//   return (
//     <>
//       <directionalLight position={[5, 5, 5]} intensity={1.7} color={new THREE.Color(0xffffff)} />
//       <primitive object={scene} scale={[50, 50, 50]} />
//     </>
//   );
// };

// interface SettingsPopupProps {
//   onClose: () => void;
//   onContinue: (avatar: string, language: string, contact: string) => void;
// }

// const SettingsPopup: React.FC<SettingsPopupProps> = ({ onClose, onContinue }) => {
//   const [avatar, setAvatar] = useState<string>('');
//   const [language, setLanguage] = useState<string>('English');
//   const [contact, setContact] = useState<string>('');
//   const [newContact, setNewContact] = useState<string>('');

//   const handleAvatarSelect = (avatarUrl: string) => {
//     setAvatar(avatarUrl);
//   };

//   const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setLanguage(event.target.value);
//   };

//   const handleContactChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setContact(event.target.value);
//   };

//   const handleNewContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewContact(event.target.value);
//   };

//   const handleAddNewContact = () => {
//     const existingContacts = JSON.parse(localStorage.getItem('contacts') || '[]');

//     if (newContact && !existingContacts.includes(newContact)) {
//       existingContacts.push(newContact);
//       localStorage.setItem('contacts', JSON.stringify(existingContacts));
//       setContact(newContact);
//       setNewContact('');
//     } else if (!newContact) {
//       alert('لطفاً نام تماس را وارد کنید!');
//     } else {
//       alert('این تماس قبلاً وجود دارد!');
//     }
//   };

//   const handleContinue = () => {
//     onContinue(avatar, language, contact);
//   };

//   return (
//     <div className="settings-popup-overlay">
//       <div className="settings-popup">
//         <img src={logo} alt="VirtualMe Logo" className="popup-logo" />
//         <h2>VIRTUAL_ME</h2>
//         <p className="popup-slogan">"Your Avatar, Your World!"</p>

//         <div className="popup-content">
//           <div className="avatars-container">
//             <div
//               className={`avatar-box ${avatar === "https://models.readyplayer.me/673479901fe0339526a0bccd.glb" ? 'selected' : ''}`}
//               onClick={() => handleAvatarSelect("https://models.readyplayer.me/673479901fe0339526a0bccd.glb")}
//             >
//               <Canvas style={{ width: '100%', height: '100%' }}>
//                 <Avatar3D avatarUrl="https://models.readyplayer.me/673479901fe0339526a0bccd.glb" />
//                 <OrbitControls enableZoom={false} />
//               </Canvas>
//             </div>
//             <div
//               className={`avatar-box ${avatar === "https://models.readyplayer.me/67312f082e4d5adddc2f2ac3.glb" ? 'selected' : ''}`}
//               onClick={() => handleAvatarSelect("https://models.readyplayer.me/67312f082e4d5adddc2f2ac3.glb")}
//             >
//               <Canvas style={{ width: '100%', height: '100%' }}>
//                 <Avatar3D avatarUrl="https://models.readyplayer.me/67312f082e4d5adddc2f2ac3.glb" />
//                 <OrbitControls enableZoom={false} />
//               </Canvas>
//             </div>
//           </div>

//           <select value={language} onChange={handleLanguageChange} className="popup-dropdown">
//             <option value="English">English</option>
//             <option value="Spanish">Spanish</option>
//             <option value="French">French</option>
//           </select>

//           <div className="contact-container">
//             <select value={contact} onChange={handleContactChange} className="popup-dropdown">
//               <option value="">Select Contact</option>
//               {JSON.parse(localStorage.getItem('contacts') || '[]').map((contact: string, index: number) => (
//                 <option key={index} value={contact}>{contact}</option>
//               ))}
//             </select>

//             <div className="new-contact-container">
//               <input
//                 type="text"
//                 value={newContact}
//                 onChange={handleNewContactChange}
//                 placeholder="Enter new contact name"
//                 className="new-contact-input"
//               />
//               <button onClick={handleAddNewContact} className="add-contact-button">Add Contact</button>
//             </div>
//           </div>

//           <button onClick={handleContinue} className="continue-button">Continue to Video Call</button>
//         </div>
//         <button onClick={onClose} className="close-button">Close</button>
//       </div>
//     </div>
//   );
// };

// const HomePage: React.FC = () => {
//   const navigate = useNavigate();
//   const [showSettingsPopup, setShowSettingsPopup] = useState<boolean>(false);
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('isLoggedIn') === 'true');
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [loginError, setLoginError] = useState<string>('');

//   const handleMakeVideoCall = () => {
//     if (isLoggedIn) {
//       setShowSettingsPopup(true);
//     } else {
//       navigate('/login');
//     }
//   };

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (email === 'user@example.com' && password === 'password') {
//       localStorage.setItem('isLoggedIn', 'true');
//       setIsLoggedIn(true);
//       setLoginError('');
//       setShowSettingsPopup(true);
//     } else {
//       setLoginError('ایمیل یا رمز عبور نادرست است.');
//     }
//   };

//   const handleCloseSettings = () => {
//     setShowSettingsPopup(false);
//   };

//   const handleContinueToVideoCall = (avatar: string, language: string, contact: string) => {
//     setShowSettingsPopup(false);
//     navigate('/video-call', { state: { avatar, language, contact } });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     setIsLoggedIn(false);
//     setEmail('');
//     setPassword('');
//   };

//   return (
//     <div className={styles['home-container']}>
//       <div className={styles['background-overlay']} style={{ backgroundImage: `url(${backgroundImage})` }}></div>
//       <img src={logo} alt="Virtual-Me Logo" className={styles.logo} />
//       <div className={styles.tagline}>Your Avatar, Your World!</div>
//       <div className={styles.welcome}>Welcome to Virtual-Me!</div>
//       <div className={styles.description}>
//         Step into the future of communication with Virtual-Me. Connect with your friends using video avatars, enjoy real-time translation, and speak any language with ease.
//       </div>
//       <div className={styles.freeCalls}>
//         Your first two calls are free. After that, recharge your account with TON cryptocurrency to enjoy seamless communication.
//       </div>
//       <button className={styles.callButton} onClick={handleMakeVideoCall}>Make Video Call</button>
      
//       {isLoggedIn ? (
//         <div>
//           <button onClick={handleLogout} className="logout-button">Logout</button>
//         </div>
//       ) : (
//         <div className="login-form-container">
//           <h2>Login</h2>
//           <form onSubmit={handleLogin} className="login-form">
//             <div className="form-group">
//             <label htmlFor="email">Email:</label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password:</label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>
//             {loginError && <p className="error-message">{loginError}</p>}
//             <button type="submit" className="login-button">
//               Login
//             </button>
//           </form>
//         </div>
//       )}

//       {showSettingsPopup && (
//         <SettingsPopup onClose={handleCloseSettings} onContinue={handleContinueToVideoCall} />
//       )}
//     </div>
//   );
// };

// export default HomePage;













// import React from 'react';
// import styles from './HomePage.module.css';
// import logo from '../assets/images/logo.png';
// import backgroundImage from '../assets/images/background-image.png';

// const HomePage: React.FC = () => {
//   return (
//     <div className={styles['home-container']}>
//       <div className={styles['background-overlay']} style={{ backgroundImage: `url(${backgroundImage})` }}></div>
//       <img src={logo} alt="Virtual-Me Logo" className={styles.logo} />
//       <div className={styles.tagline}>Your Avatar, Your World!</div>
//       <div className={styles.welcome}>Welcome to Virtual-Me!</div>
//       <div className={styles.description}>
//         Step into the future of communication with Virtual-Me. Connect with your friends using video avatars, enjoy real-time translation, and speak any language with ease.
//       </div>
//       <div className={styles.freeCalls}>
//         Your first two calls are free. After that, recharge your account with TON cryptocurrency to enjoy seamless communication.
//       </div>
//       <button className={styles.callButton}>Make Video Call</button>
//     </div>
//   );
// };

// export default HomePage;
