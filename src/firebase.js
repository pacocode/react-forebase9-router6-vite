import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBP5LDt_vKynbxVWeBiJqdNfDLd6vTYvz8",
  authDomain: "react--2022.firebaseapp.com",
  projectId: "react--2022",
  storageBucket: "react--2022.appspot.com",
  messagingSenderId: "496089641078",
  appId: "1:496089641078:web:5b391f50ee58c330526f57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };