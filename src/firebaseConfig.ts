// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAZEy-VBy0coE2KUcZ7EUyCUyVy57fXLU",
  authDomain: "virtual-me-6e5dc.firebaseapp.com",
  projectId: "virtual-me-6e5dc",
  storageBucket: "virtual-me-6e5dc.appspot.com",
  messagingSenderId: "921318954614",
  appId: "1:921318954614:web:a786c65c93cd49a1b33157",
  measurementId: "G-G78CJGSDKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const messaging = getMessaging(app);

export { app, analytics, auth, db, storage, functions, messaging };
