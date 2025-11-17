// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1urD8bPLoB26Mj8wuXU6zHeI_riiTwrY",
  authDomain: "business-manager-pro-8a727.firebaseapp.com",
  projectId: "business-manager-pro-8a727",
  storageBucket: "business-manager-pro-8a727.firebasestorage.app",
  messagingSenderId: "290535106568",
  appId: "1:290535106568:web:6c93868ec1f0dd856809bd",
  measurementId: "G-8DQ7LQ2ZM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);