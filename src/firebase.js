import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBLy2W8-QRJheM0uMXxqge_1p3MHQnM2u0",
    authDomain: "amajan-2.firebaseapp.com",
    projectId: "amajan-2",
    storageBucket: "amajan-2.appspot.com",
    messagingSenderId: "351505080776",
    appId: "1:351505080776:web:d0d3e651f9c5dc58dba0fd"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app);

  export {app, auth} 