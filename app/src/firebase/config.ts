import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB2Vh4BdbTUvczjfIjqH7nE9MLLujegCqA",
  authDomain: "fightforeverx.firebaseapp.com",
  projectId: "fightforeverx",
  storageBucket: "fightforeverx.appspot.com",
  messagingSenderId: "84284435145",
  appId: "1:84284435145:web:0500ba6552636ba31dbb18",
  measurementId: "G-C1CGGWHZJN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { 
  auth,
  db,
  analytics
};