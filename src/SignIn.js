import { useState } from "react";
import firebase from "firebase/app";
import { useStateValue } from "./StateProvider";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [, dispatch] = useStateValue();



  const signInWithEmailAndPassword = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        dispatch({
          type: "SIGN_IN_USER",
          user: userCredential.user,
        });

        // var user = userCredential.user;

        // ...
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const switchToRegister = (event) => {
    event.preventDefault();
    dispatch({
      type: "SWITCH_TO_REGISTER",
    });
  }

  return (
    <form>
      <p>Sign In</p>
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="email"
        placeholder="Email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit" onClick={signInWithEmailAndPassword}>
        Sign In
      </button>
      <p>
        Don't have an account? <button onClick={switchToRegister}>Register</button>
      </p>
    </form>
  );
}

export default SignIn;
