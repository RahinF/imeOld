import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import { useStateValue } from "./StateProvider";

function SignOut() {
  const [, dispatch] = useStateValue();


  const signOut = () => {
    firebase.auth().signOut();
    dispatch({
      type: "SIGN_OUT_USER",
    });
  };


  return <Button color="inherit" onClick={signOut}>Sign Out</Button>
}

export default SignOut;
