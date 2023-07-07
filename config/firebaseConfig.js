// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvWotRuyyF7r6BFcrj1thinn9DRDhdWvM",
  authDomain: "unipedia-3d501.firebaseapp.com",
  projectId: "unipedia-3d501",
  storageBucket: "unipedia-3d501.appspot.com",
  messagingSenderId: "49739016922",
  appId: "1:49739016922:web:4843bd35c52ac8a5b313e3",
  measurementId: "G-9F1QKY5QZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);
