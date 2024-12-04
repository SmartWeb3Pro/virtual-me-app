import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Peer from 'peerjs';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import styles from './LoginPage.module.css';
import logo from '../assets/images/logo.png';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string>('');
  const [peerId, setPeerId] = useState<string | null>(null);
  const navigate = useNavigate();
  const peer = new Peer();

  useEffect(() => {
    peer.on('open', (id) => {
      setPeerId(id);
      localStorage.setItem('peerId', id); // ذخیره کردن Peer ID در localStorage
    });
  }, [peer]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('isLoggedIn', 'true');
      if (peerId) {
        localStorage.setItem('peerId', peerId);
      }
      setLoginError('');
      navigate('/settings'); // Navigate to settings page
    } catch (error) {
      setLoginError('Incorrect email or password.');
    }
  };

  const responseGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      if (user && user.email) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', user.email);
        if (peerId) {
          localStorage.setItem('peerId', peerId);
        }
        navigate('/settings'); // Navigate to settings page
      }
    } catch (error) {
      setLoginError('Google login failed.');
    }
  };
  return (
    <GoogleOAuthProvider clientId="657827036192-4uk89lpqeo38ehlm9olirqq4f1mfv0uc.apps.googleusercontent.com">
      <div className={styles.container}>
        <h1>Login</h1>
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
        {loginError && <p className={styles.errorMessage}>{loginError}</p>}
        <button onClick={handleLogin}>Login</button>
        <div className={styles.googleLogin}>
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={() => {
              setLoginError('Google login failed.');
            }}
          />
        </div>
        <div className={styles.signupLink}>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;

























// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
// import Peer from 'peerjs';
// import styles from './LoginPage.module.css';
// import logo from '../assets/images/logo.png';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState<string>('');
//   const [peerId, setPeerId] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const peer = new Peer();

//   useEffect(() => {
//     peer.on('open', (id) => {
//       setPeerId(id);
//       localStorage.setItem('peerId', id); // ذخیره کردن Peer ID در localStorage
//     });
//   }, [peer]);

//   const handleLogin = () => {
//     if (email === 'user@example.com' && password === 'password') {
//       localStorage.setItem('isLoggedIn', 'true');
//       if (peerId) {
//         localStorage.setItem('peerId', peerId);
//       }
//       setLoginError('');
//       navigate('/settings'); // Navigate to settings page
//     } else {
//       setLoginError('Incorrect email or password.');
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
//       setLoginError('Google login failed.');
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId="657827036192-4uk89lpqeo38ehlm9olirqq4f1mfv0uc.apps.googleusercontent.com">
//       <div className={styles.container}>
//         <h1>Login</h1>
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
//         {loginError && <p className={styles.errorMessage}>{loginError}</p>}
//         <button onClick={handleLogin}>Login</button>
//         <div className={styles.googleLogin}>
//           <GoogleLogin
//             onSuccess={responseGoogle}
//             onError={() => {
//               setLoginError('Google login failed.');
//             }}
//           />
//         </div>
//         <div className={styles.signupLink}>
//           Don’t have an account? <Link to="/signup">Sign Up</Link>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default LoginPage;







