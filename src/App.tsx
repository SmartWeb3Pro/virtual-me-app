import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import MeetingPage from './components/MeetingPage';
import SettingsPage from './components/SettingsPage';
// حذف ایمپورت‌های استفاده نشده
// import { auth, db, storage, functions, messaging } from './firebaseConfig';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/meeting" element={<MeetingPage />} />
        <Route path="/join-call" element={<MeetingPage />} /> {/* مسیر جدید */}
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;






// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import SignUpPage from './components/SignUpPage';
// import LoginPage from './components/LoginPage';
// import MeetingPage from './components/MeetingPage';
// import SettingsPage from './components/SettingsPage';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/meeting" element={<MeetingPage />} />
//         <Route path="/join-call" element={<MeetingPage />} /> {/* مسیر جدید */}
//         <Route path="/settings" element={<SettingsPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;








// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import SignUpPage from './components/SignUpPage';
// import LoginPage from './components/LoginPage';
// import VideoCallPage from './components/VideoCallPage';
// import SettingsPage from './components/SettingsPage'; // اضافه کردن SettingsPage

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/video-call" element={<VideoCallPage />} />
//         <Route path="/settings" element={<SettingsPage />} /> {/* اضافه کردن مسیر SettingsPage */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;











// import React from 'react';
// import TranslatePage from './components/TranslatePage'; // مسیر به فایل TranslatePage

// const App: React.FC = () => {
//   return (
//     <div>
//       <TranslatePage />
//     </div>
//   );
// };

// export default App;
