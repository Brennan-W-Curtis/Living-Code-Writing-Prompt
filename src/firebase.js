// Import the functions you need from the SDKs you need.
import { initializeApp } from "firebase/app";

// Import the function to pull in the Firebase realtime database service.
import { getDatabase } from 'firebase/database';

// Import the functions to enable user authentication.
import { getAuth } from 'firebase/auth';

// Import the functions to access the Firestore cloud database service. 
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the realtime database.
const realtime = getDatabase(app);

// Get a reference to the authentication.
export const auth = getAuth(app);

// Get a reference to the firestore database.
export const cloud = getFirestore();

export default realtime;