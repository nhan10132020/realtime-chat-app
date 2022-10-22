import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBjgeGXZK_iaBIsbhzwFcekCYOtsO8Xj_Y",
    authDomain: "realtime-chat-app-db2ea.firebaseapp.com",
    projectId: "realtime-chat-app-db2ea",
    storageBucket: "realtime-chat-app-db2ea.appspot.com",
    messagingSenderId: "221848334165",
    appId: "1:221848334165:web:1d34f89a47b040d87909dc",
    measurementId: "G-S4RR9L03D5"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth = getAuth(app);
  connectAuthEmulator(auth, "http://127.0.0.1:9099/");

  const db = getFirestore(app);
  connectFirestoreEmulator(db, 'localhost', 8080);
  

  export {db, auth};
  export default firebase;

