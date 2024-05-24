import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app)
const db = getFirestore(app);


// both db and auth are now called named exports. 
// This means that when we import these variables in other files, 
// the names of the imports need to exactly match the names of the exported variables
export {db, auth};