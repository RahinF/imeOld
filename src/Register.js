import { useState } from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [, dispatch]  = useStateValue();

  console.log(useStateValue())


  const createUserWithEmailAndPassword = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        userCredential.user
          .updateProfile({
            displayName: username,
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
          })
          .then(function () {
            // Update successful.
            dispatch({
              type: "SIGN_IN_USER",
              user: userCredential.user,
            });
          })
          .catch(function (error) {
            // An error happened.
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        // ..
      });
  };

  return (
    <form>

      <p>Register</p>
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
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <button type="submit" onClick={createUserWithEmailAndPassword}>
        Register
      </button>
      <p>
        Have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </form>
  );
}

export default Register;
