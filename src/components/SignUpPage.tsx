import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

import Peer from 'peerjs';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import styles from './SignUpPage.module.css';
import logo from '../assets/images/logo.png';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState<string>('');
  const [peerId, setPeerId] = useState<string | null>(null);
  const navigate = useNavigate();
  const peer = new Peer();

  useEffect(() => {
    peer.on('open', (id) => {
      setPeerId(id);
      localStorage.setItem('peerId', id); // ذخیره کردن Peer ID در localStorage
    });
  }, [peer]);

  const handleSignUp = async () => {
    if (password === confirmPassword) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem('isLoggedIn', 'true');
        if (peerId) {
          localStorage.setItem('peerId', peerId);
        }
        setSignupError('');
        navigate('/settings'); // Navigate to settings page
      } catch (error) {
        setSignupError('Sign up failed. Please try again.');
      }
    } else {
      setSignupError('Passwords do not match.');
    }
  };

  const handleGoogleSignUp = async (response: any) => {
    try {
      const credential = response.credential;
      const userObject = jwtDecode<any>(credential); // استفاده صحیح از jwtDecode به صورت تابع
      if (userObject && 'email' in userObject) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', userObject.email);
        if (peerId) {
          localStorage.setItem('peerId', peerId);
        }
        navigate('/settings'); // Navigate to settings page
      } else {
        setSignupError('Google sign up failed.');
      }
    } catch (error) {
      setSignupError('Google sign up failed.');
    }
  };
  return (
    <GoogleOAuthProvider clientId="657827036192-4uk89lpqeo38ehlm9olirqq4f1mfv0uc.apps.googleusercontent.com">
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <img src={logo} alt="Virtual-Me Logo" className={styles.logo} />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        {signupError && <p className={styles.errorMessage}>{signupError}</p>}
        <button onClick={handleSignUp}>Sign Up</button>
        <div className={styles.googleLogin}>
          <GoogleLogin
            onSuccess={(response) => handleGoogleSignUp(response)} // استفاده صحیح از متغیر response
            onError={() => {
              setSignupError('Google sign up failed.');
            }}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUpPage;



















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
// import Peer from 'peerjs';
// import styles from './SignUpPage.module.css';
// import logo from '../assets/images/logo.png';

// const SignUpPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [signupError, setSignupError] = useState<string>('');
//   const [peerId, setPeerId] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const peer = new Peer();

//   useEffect(() => {
//     peer.on('open', (id) => {
//       setPeerId(id);
//       localStorage.setItem('peerId', id); // ذخیره کردن Peer ID در localStorage
//     });
//   }, [peer]);

//   const handleSignUp = () => {
//     if (password === confirmPassword) {
//       localStorage.setItem('isLoggedIn', 'true');
//       if (peerId) {
//         localStorage.setItem('peerId', peerId);
//       }
//       setSignupError('');
//       navigate('/settings'); // Navigate to settings page
//     } else {
//       setSignupError('Passwords do not match.');
//     }
//   };

//   const responseGoogle = (response: any) => {
//     const userObject = jwtDecode<any>(response.credential);
//     console.log(userObject);
//     if (userObject && 'email' in userObject) {
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('userEmail', userObject.email);
//       if (peerId) {
//         localStorage.setItem('peerId', peerId);
//       }
//       navigate('/settings'); // Navigate to settings page
//     } else {
//       setSignupError('Google sign up failed.');
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId="657827036192-4uk89lpqeo38ehlm9olirqq4f1mfv0uc.apps.googleusercontent.com">
//       <div className={styles.container}>
//         <h1>Sign Up</h1>
//         <img src={logo} alt="Virtual-Me Logo" className={styles.logo} />
//         <input 
//           type="email" 
//           placeholder="Email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//         />
//         <input 
//           type="password" 
//           placeholder="Confirm Password" 
//           value={confirmPassword} 
//           onChange={(e) => setConfirmPassword(e.target.value)} 
//         />
//         {signupError && <p className={styles.errorMessage}>{signupError}</p>}
//         <button onClick={handleSignUp}>Sign Up</button>
//         <div className={styles.googleLogin}>
//           <GoogleLogin
//             onSuccess={responseGoogle}
//             onError={() => {
//               setSignupError('Google sign up failed.');
//             }}
//           />
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default SignUpPage;








