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


  return <button onClick={signOut}>Sign Out</button>;
}

export default SignOut;
