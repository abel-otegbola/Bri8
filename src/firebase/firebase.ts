// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBUgc-i4x0CiKCfHZ5V_csas2LY6EQ0-U",
    authDomain: "bri8-hub.firebaseapp.com",
    projectId: "bri8-hub",
    storageBucket: "bri8-hub.firebasestorage.app",
    messagingSenderId: "698830098324",
    appId: "1:698830098324:web:d71e81713160de0a858981",
    measurementId: "G-89045LDJVH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const db = getFirestore();