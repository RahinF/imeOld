import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import ChatRoom from "./ChatRoom";
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <h1>iMe</h1>
      <SignIn type={user ? "Sign Out" : "Sign In"} />

      {user && <ChatRoom />}
    </>
  );
}

export default App;
