import { BrowserRouter as Router } from "react-router-dom";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";
import SignIn from "./SignIn";
import Register from "./Register";
import SignOut from "./SignOut";
import CreateRoom from "./CreateRoom";
import RoomList from "./RoomList";
import * as S from "./App.style";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user, accountEntry }] = useStateValue();

  return (
    <Router>

      <S.Header>
        <h1>iMe</h1>
        {user && <SignOut />}
      </S.Header>

      {!user &&
        {
          "Sign In": <SignIn />,
          "Register": <Register />,
        }[accountEntry]}

      <S.AppBody>
        <S.Main>
          {user && (
            <>
              <S.Rooms>
                <CreateRoom />
                <RoomList />
              </S.Rooms>

              <MessageArea />
              <MessageInput />
            </>
          )}
        </S.Main>
      </S.AppBody>
    </Router>
  );
}

export default App;
