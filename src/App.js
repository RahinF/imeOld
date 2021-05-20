import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";
import SignIn from "./SignIn";
import Register from "./Register";
import SignOut from "./SignOut";
import CreateRoom from "./CreateRoom";
import RoomList from "./RoomList";
import * as S from "./App.style";

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

      <S.Header>
        <h1>iMe</h1>
        {user && <SignOut />}
      </S.Header>

      <S.AppBody>
        <S.Rooms>
          <CreateRoom />
          <RoomList />
        </S.Rooms>

        <S.MessageSection>
          <main>
            {user && (
              <>
                <MessageArea />
                <MessageInput />
              </>
            )}
          </main>
        </S.MessageSection>
      </S.AppBody>
    </Router>
  );
}

export default App;
