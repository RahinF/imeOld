import React from "react";
import firebase from "firebase/app";
import { auth } from "./firebase";
import { Button } from "@material-ui/core";

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
    <Button variant="contained" color="primary" disableElevation onClick={onClick}>
      {buttonText}
    </Button>
  );
}

export default SignIn;
