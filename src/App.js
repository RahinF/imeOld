import { BrowserRouter as Router } from "react-router-dom";
import SignIn from "./SignIn";
import Register from "./Register";
import SignOut from "./SignOut";
import CreateRoom from "./CreateRoom";
import RoomList from "./RoomList";
import * as S from "./App.style";
import { useStateValue } from "./StateProvider";
import { AppBar, Typography } from "@material-ui/core";
import Chatroom from "./Chatroom";

function App() {
  const [{ user, accountEntry }] = useStateValue();

  return (
    <Router>
      <AppBar position="static">
        <S.Nav>
          <Typography variant="h4">iMe</Typography>
          {user && <SignOut />}
        </S.Nav>
      </AppBar>

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

              <Chatroom />
            </>
          )}
        </S.Main>
      </S.AppBody>
    </Router>
  );
}

export default App;
