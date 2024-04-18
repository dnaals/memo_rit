import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv59nWvObtO9XotmeybK4NRQHTxQvflJQ",
  authDomain: "momo-rit.firebaseapp.com",
  projectId: "momo-rit",
  storageBucket: "momo-rit.appspot.com",
  messagingSenderId: "423445386175",
  appId: "1:423445386175:web:2a8db13ce23673c9d4470a",
  measurementId: "G-BLLZQJCRMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);