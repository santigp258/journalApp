import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfigTest = {
  apiKey: "AIzaSyDAWY16fqHOU61MuAOH0TVQJZsGGcPaDns",
  authDomain: "cart-dc398.firebaseapp.com",
  projectId: "cart-dc398",
  storageBucket: "cart-dc398.appspot.com",
  messagingSenderId: "318860214563",
  appId: "1:318860214563:web:2221dfdc5df0353a8d8c96",
  measurementId: "G-MBJ7X600N4",
};

const firebaseConfig = {
  apiKey: "AIzaSyCAe2ZJVMt976GXCyUsUqGNHKW5cQ0e7p0",
  authDomain: "journal-react-15789.firebaseapp.com",
  projectId: "journal-react-15789",
  storageBucket: "journal-react-15789.appspot.com",
  messagingSenderId: "1048165902996",
  appId: "1:1048165902996:web:67732a4981a48366df2281",
  measurementId: "G-DGYZNP71R1",
};
if (process.env.NODE_ENV === "test") {
  firebase.initializeApp(firebaseConfigTest);
} else {
  //dev/prod
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase

const db = firebase.firestore();

//login with google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
