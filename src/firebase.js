// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTuJGDHQH0K0u2-xXi8SqwYm-6Xc9XDEg",
  authDomain: "practise-b37c8.firebaseapp.com",
  databaseURL: "https://practise-b37c8-default-rtdb.firebaseio.com",
  projectId: "practise-b37c8",
  storageBucket: "practise-b37c8.appspot.com",
  messagingSenderId: "834753609126",
  appId: "1:834753609126:web:73b7e2fad1ee4c19b42367",
  measurementId: "G-Q3VQCMMFNR",
};

// Initialize Firebase
const firebaseConfiguration = initializeApp(firebaseConfig);

export default firebaseConfiguration;
