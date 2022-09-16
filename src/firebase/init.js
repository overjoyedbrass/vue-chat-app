import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC3bt3luATZEuZ5AaRTg-xU8RuzL3Xw8QA",
    authDomain: "chat-be-71b71.firebaseapp.com",
    databaseURL:
        "https://chat-be-71b71-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-be-71b71",
    storageBucket: "chat-be-71b71.appspot.com",
    messagingSenderId: "487363716673",
    appId: "1:487363716673:web:b3fc8747ef1af0d9c3c8c0",
    measurementId: "G-0D0SW9T7QE",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const db = getFirestore(firebase);
export default db;
