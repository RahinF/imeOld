import React from "react";
import firebase from "firebase/app";
import { auth } from "./firebase";

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  auth.signOut();
};

function SignIn({ type }) {
  let onClick, buttonText;

  switch (type) {
    case "Sign In":
      buttonText = "Sign in with Google";
      onClick = signInWithGoogle;
      break;

    case "Sign Out":
      buttonText = "Sign out";
      onClick = signOut;
      break;

    default:
      break;
  }
  return (
    <div>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
}

export default SignIn;
