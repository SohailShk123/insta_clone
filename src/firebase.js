import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdKyX3STo54YBhukpznTF6tK1ELm4QWpQ",
  authDomain: "mobile-insta-41c09.firebaseapp.com",
  projectId: "mobile-insta-41c09",
  storageBucket: "mobile-insta-41c09.appspot.com",
  messagingSenderId: "599241255406",
  appId: "1:599241255406:web:ca61fde94899483d7346ff"
};
  const app = initializeApp(firebaseConfig)
  const auth = getAuth();
  const db = getFirestore(app);
  const storage  = getStorage();

  export {app, auth,db, storage} 