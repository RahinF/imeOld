import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import { auth } from "./firebase";
import MessageArea from "./MessageArea";
import styled from "styled-components";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
`;

const AppBody = styled.div`
  width: 50%;
  margin: auto;
  background: #ffe8e8;
`;

function App() {
  const [user] = useAuthState(auth);

  return (
    <AppBody>
      <StyledHeader>
        <h1>iMe</h1>
        <SignIn type={user ? "Sign Out" : "Sign In"} />
      </StyledHeader>

      <main>{user && <ChatRoom />}</main>
    </AppBody>
  );
}

function ChatRoom() {
  return (
    <>
      <MessageArea />
    </>
  );
}

export default App;
