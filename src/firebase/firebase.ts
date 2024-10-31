import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDUckgZw73O9yC8jbsa1iX6H9JH0K-6GZ0",
    authDomain: "jevents-30e18.firebaseapp.com",
    databaseURL: "https://jevents-30e18-default-rtdb.firebaseio.com",
    projectId: "jevents-30e18",
    storageBucket: "jevents-30e18.appspot.com",
    messagingSenderId: "606189063220",
    appId: "1:606189063220:web:5c112663689ed1b63f8e61",
    measurementId: "G-ZR8Z8TQKGT"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);