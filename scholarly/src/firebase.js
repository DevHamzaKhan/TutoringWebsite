// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp7s5A6bxCgxoNvviQRuqAKL9LWrgATT4",
  authDomain: "scholarly-fa907.firebaseapp.com",
  projectId: "scholarly-fa907",
  storageBucket: "scholarly-fa907.appspot.com",
  messagingSenderId: "152703840730",
  appId: "1:152703840730:web:ced1393a302f9f3cac50e3",
  measurementId: "G-HG4XSH5BSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth, app};