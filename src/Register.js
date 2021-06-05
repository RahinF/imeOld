import { useState } from "react";
import { useStateValue } from "./StateProvider";
import { Button, TextField } from "@material-ui/core";
import { auth, database } from "./firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [, dispatch] = useStateValue();

  const createUserWithEmailAndPassword = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // create new user
        const newUser = {
          uid: user.uid,
          displayName: username,
          comment: "",
          avatar: null,
        };

        // add user to db
        database
          .collection("users")
          .doc(newUser.uid)
          .set({
            displayName: newUser.displayName,
            comment: newUser.comment,
            avatar: newUser.avatar,
          })
          .then(function () {
            // added user successfully, sign in.
            dispatch({
              type: "SIGN_IN_USER",
              user: newUser,
            });
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        // ..
      });
  };

  const switchToSignIn = (event) => {
    event.preventDefault();
    dispatch({
      type: "SWITCH_TO_SIGN_IN",
    });
  };

  return (
    <form>
      <p>Register</p>
      {errorMessage && <p>{errorMessage}</p>}
      <TextField
        type="email"
        label="Email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        type="text"
        label="Username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={createUserWithEmailAndPassword}
      >
        Register
      </Button>
      <p>
        Have an account? <button onClick={switchToSignIn}>Sign In</button>
      </p>
    </form>
  );
}

export default Register;
