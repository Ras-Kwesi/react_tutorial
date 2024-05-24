import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAqJErl5XEUNNHqQK15eJXzUOdUuTDEBNg",
    authDomain: "help-queue-14.firebaseapp.com",
    projectId: "help-queue-14",
    storageBucket: "help-queue-14.appspot.com",
    messagingSenderId: "438283175579",
    appId: "1:438283175579:web:6c81aa82e115fd4ce6a83e",
    measurementId: "G-7934RFQMCE"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;