import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmdkAroUsu58vRhkhszaZHzkxGGXx_0zU",
  authDomain: "ecommerce-footware-237ac.firebaseapp.com",
  projectId: "ecommerce-footware-237ac",
  storageBucket: "ecommerce-footware-237ac.firebasestorage.app",
  messagingSenderId: "503980953118",
  appId: "1:503980953118:web:ebf0d2c5a4ed3c1b7b680f",
  measurementId: "G-39KL6W4WXS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
