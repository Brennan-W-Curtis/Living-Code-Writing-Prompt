// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Import the function to pull in the Firebase realtime database service
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5loyiZm9wsLoo_JaYT1rC5E2xL_DxsjE",
  authDomain: "writing-prompt-5d00d.firebaseapp.com",
  projectId: "writing-prompt-5d00d",
  storageBucket: "writing-prompt-5d00d.appspot.com",
  messagingSenderId: "926920576992",
  appId: "1:926920576992:web:3ea6f8bb9ebc812354a585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const realtime = getDatabase(app);

export default realtime;