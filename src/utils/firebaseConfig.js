import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

const firebaseConfig = {
    apiKey: "AIzaSyBq_iErqZ7PYqSi0BAYl0CixL8VUNpuqu4",
    authDomain: "dealgrabber-b0809.firebaseapp.com",
    projectId: "dealgrabber-b0809",
    storageBucket: "dealgrabber-b0809.firebasestorage.app",
    messagingSenderId: "1029746494690",
    appId: "1:1029746494690:web:f2d0a54fe6c7011175a2bb",
    measurementId: "G-Q3R5EC5Y5Q"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore & Authentication
const db = getFirestore(app);
const auth = getAuth(app); // Added Firebase Authentication

export { db, auth };


