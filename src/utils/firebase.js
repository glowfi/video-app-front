import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: 'video-app-273f4.firebaseapp.com',
    projectId: 'video-app-273f4',
    storageBucket: 'video-app-273f4.appspot.com',
    messagingSenderId: '769791802364',
    appId: '1:769791802364:web:460f07e2f9a965eb569079'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
