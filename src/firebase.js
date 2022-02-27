import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPAqAXzJFB637Z-ve6DoTdpV4o7JIRWwQ",
  authDomain: "clone-3e56c.firebaseapp.com",
  projectId: "clone-3e56c",
  storageBucket: "clone-3e56c.appspot.com",
  messagingSenderId: "916761783965",
  appId: "1:916761783965:web:e61a924b8280ccf7002e74",
  measurementId: "G-19TFV9LF94",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
