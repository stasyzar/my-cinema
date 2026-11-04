import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBHw1UheEP53Uq1_h_AveagSlOqJzrE_HM",
  authDomain: "mycinema-2eb63.firebaseapp.com",
  projectId: "mycinema-2eb63",
  storageBucket: "mycinema-2eb63.firebasestorage.app",
  messagingSenderId: "268366227796",
  appId: "1:268366227796:web:970bf8136c19f81c6000c1",
  measurementId: "G-7L9SYD47MZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

