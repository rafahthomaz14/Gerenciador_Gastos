import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA4alBzFmqvflrjiG3MFAhNKwEWt9pEilw",
    authDomain: "afaaa-d99b4.firebaseapp.com",
    projectId: "afaaa-d99b4",
    storageBucket: "afaaa-d99b4.firebasestorage.app",
    messagingSenderId: "949652539024",
    appId: "1:949652539024:web:934ae09be578c045613a15",
    measurementId: "G-Y2BSGTR3TQ"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export{db,auth}