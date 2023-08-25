import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4Q_1YoIndkeEm8-NTUA6EBkCM_Hns2sw",
  authDomain: "deployinsta.firebaseapp.com",
  projectId: "deployinsta",
  storageBucket: "deployinsta.appspot.com",
  messagingSenderId: "569431152028",
  appId: "1:569431152028:web:907f2ea48e60a91891a459"
};
  const app = initializeApp(firebaseConfig)
  const auth = getAuth();
  const db = getFirestore(app);
  const storage  = getStorage();

  export {app, auth,db, storage} 