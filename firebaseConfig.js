// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA_4d4Jql-NZnx5IkxdCdOmHQzwkUET0I",
  authDomain: "talentblendr.firebaseapp.com",
  projectId: "talentblendr",
  storageBucket: "talentblendr.appspot.com",
  messagingSenderId: "858269424112",
  appId: "1:858269424112:web:99a6e52fecc9258919a535",
  measurementId: "G-65LL5YMDZN"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };