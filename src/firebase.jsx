import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvOEqG4iM5TAvnmGarQht-PDegE7oZKlQ",
  authDomain: "newproject-45f70.firebaseapp.com",
  projectId: "newproject-45f70",
  storageBucket: "newproject-45f70.firebasestorage.app",
  messagingSenderId: "349008664492",
  appId: "1:349008664492:web:d890b24146fb3598678c09",
  measurementId: "G-6VNNZYQJTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize RecaptchaVerifier utility
export const recaptchaVerifier = (containerId) => {
  return new RecaptchaVerifier(containerId, {
    size: 'invisible', // Invisible reCAPTCHA
    callback: (response) => {
      console.log('Recaptcha verified', response);
    },
    'expired-callback': () => {
      console.log('Recaptcha expired');
    },
  }, auth);
};

// Signup with Email/Password
export const signUpWithEmailPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login with Email/Password
export const loginWithEmailPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Google Login
export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// OTP Login
export const requestOTP = (phoneNumber, recaptchaVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};

// Exporting app and auth instances
export { app };
