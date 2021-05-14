import firebase from "firebase/app";

function SignOut() {
    const signOut = () => {
        firebase.auth().signOut();
    }
    return (
        <button onClick={signOut}>Sign Out</button>
    )
}

export default SignOut
