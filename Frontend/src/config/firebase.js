import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// 🔹 Firebase Client Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlZpOYqlgR5srRSKjg4D1h_NwWemHVQh8",
  authDomain: "core-ai-5e859.firebaseapp.com",
  projectId: "core-ai-5e859",
  storageBucket: "core-ai-5e859.firebasestorage.app",
  messagingSenderId: "130614746431",
  appId: "1:130614746431:web:dfcc7f2bb255d2733cc78a",
  measurementId: "G-X10TLVG8V0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
