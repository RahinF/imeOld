import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAMImlKtEklVlUcAm5oSL2siYNdo9RFm04",
  authDomain: "ime-app-f4ad5.firebaseapp.com",
  projectId: "ime-app-f4ad5",
  storageBucket: "ime-app-f4ad5.appspot.com",
  messagingSenderId: "80354976444",
  appId: "1:80354976444:web:e61bccfca74201c32a26b9",
  measurementId: "G-04CF4QTPJ2",
});

const database = firebaseApp.firestore();
const auth = firebase.auth();
const firestore = firebase.firestore();

export { database, auth, firestore };
