import { useState } from "react";
import { useStateValue } from "./StateProvider";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { auth, database } from "./firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [, dispatch] = useStateValue();

  const signInWithEmailAndPassword = (event) => {
    event.preventDefault();
    
      auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // pull user
        database
          .collection("users")
          .doc(user.uid)
          .get()
          .then((userData) => {
            // Signed in

            dispatch({
              type: "SIGN_IN_USER",
              user: { ...userData.data(), uid: user.uid },
            });
          });
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
  };

  return (
    <Box m={2}>
      <Grid>
        <Paper style={{ width: "400px", padding: "20px", margin: "20px auto" }}>
          <form>
            <Typography variant="h4" align="center" gutterBottom>
              Sign In
            </Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <TextField
              fullWidth
              required
              type="email"
              label="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              onClick={signInWithEmailAndPassword}
            >
              Sign In
            </Button>
            <Typography variant="body1">Don't have an account?</Typography>
            <Button variant="outlined" onClick={switchToRegister}>
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
}

export default SignIn;
