import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import { auth } from "./firebase";
import MessageArea from "./MessageArea";
import styled from "styled-components";
import MessageInput from "./MessageInput";

const StyledHeader = styled.header`
  background: #e9e9eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
  padding: 0 10px ;
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

      <main>
        {user && (
          <>
            <MessageArea />
            <MessageInput />
          </>
        )}
      </main>
    </AppBody>
  );
}

export default App;
