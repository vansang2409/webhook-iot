// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv49tXi0UC27uLzyUnqTV9c1bOWVWHrVE",
  authDomain: "controldevices-f56de.firebaseapp.com",
  projectId: "controldevices-f56de",
  storageBucket: "controldevices-f56de.appspot.com",
  messagingSenderId: "66509810211",
  appId: "1:66509810211:web:264cf827d071b72ba19f96",
  measurementId: "G-RLQBYK07SG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export { database, ref, push, onValue };