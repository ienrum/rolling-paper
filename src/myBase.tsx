// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAil3UhBAQctrazNE7JIAnKk83AV-ZypZw",
  authDomain: "rolling-paper-4d7f7.firebaseapp.com",
  projectId: "rolling-paper-4d7f7",
  storageBucket: "rolling-paper-4d7f7.appspot.com",
  messagingSenderId: "697072906778",
  appId: "1:697072906778:web:e9fc5c412b08bea00e57a3",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const auth = getAuth(app);
export const db = getFirestore(app);
