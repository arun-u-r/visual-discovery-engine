// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBtdti42cJ9R0dST82zp7WhXcgbNnyEf7M',
  authDomain: "pintrest-393204.firebaseapp.com",
  projectId: "pintrest-393204",
  storageBucket: "pintrest-393204.appspot.com",
  messagingSenderId: "645880061296",
  appId: "1:645880061296:web:a8cbec9c085e99f0c903b5",
  measurementId: "G-LNJCZM1B99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
