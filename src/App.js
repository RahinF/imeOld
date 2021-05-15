import { useAuthState } from "react-firebase-hooks/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { auth } from "./firebase";
import MessageArea from "./MessageArea";
import styled from "styled-components";
import MessageInput from "./MessageInput";
import SignIn from "./SignIn";
import Register from "./Register";
import SignOut from "./SignOut";
import CreateRoom from "./CreateRoom";
import RoomList from "./RoomList";



const StyledHeader = styled.header`
  background: #e9e9eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
  padding: 0 10px;
`;

const AppBody = styled.div`
  display: flex;
  justify-content: center;
`;

const Rooms = styled.div`
  background: lightblue;
`;

const MessageSection = styled.div`
  background: lightred;
`;

function App() {
  const [user] = useAuthState(auth);




  return (
    <Router>
      <Switch>
        {/* {!user && ( */}
        <>
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/register" component={Register} />
        </>
      </Switch>


       
      <StyledHeader>
        <h1>iMe</h1>
        {user && <SignOut />}
      </StyledHeader>

     
        <AppBody>
          <Rooms>
            <CreateRoom />
            <RoomList />
          </Rooms>

          <MessageSection>
            <main>
              {user && (
                <>
                  <MessageArea />
                  <MessageInput />
                </>
              )}
            </main>
          </MessageSection>
        </AppBody>
       
    </Router>
  );
}

export default App;
