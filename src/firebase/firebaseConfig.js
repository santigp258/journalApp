import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAe2ZJVMt976GXCyUsUqGNHKW5cQ0e7p0",
  authDomain: "journal-react-15789.firebaseapp.com",
  projectId: "journal-react-15789",
  storageBucket: "journal-react-15789.appspot.com",
  messagingSenderId: "1048165902996",
  appId: "1:1048165902996:web:67732a4981a48366df2281",
  measurementId: "G-DGYZNP71R1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

//login with google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
