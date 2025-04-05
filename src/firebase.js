import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyB8oI2P43rDi3n1zYsT52kNY2F7ZRZC01c",
  authDomain: "algospectraa.firebaseapp.com",
  projectId: "algospectraa",
  storageBucket: "algospectraa.firebasestorage.app",
  messagingSenderId: "644296763839",
  appId: "1:644296763839:web:c042631c3e5d55296a190a",
  measurementId: "G-4EYL66HL5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);