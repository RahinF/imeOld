import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import MessageArea from "./MessageArea";
import styled from "styled-components";
import MessageInput from "./MessageInput";
import SignIn from "./SignIn";
import Register from "./Register";
import SignOut from "./SignOut";

const StyledHeader = styled.header`
  background: #e9e9eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
  padding: 0 10px;
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
      {user && <SignOut />}

      <SignIn />
      <Register />

      <StyledHeader>
        <h1>iMe</h1>
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
