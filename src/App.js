import SignIn from "./SignIn";
import Register from "./Register";
import SignOut from "./SignOut";
import RoomList from "./RoomList";
import * as S from "./App.style";
import { useStateValue } from "./StateProvider";
import { AppBar, Typography } from "@material-ui/core";
import Chatroom from "./Chatroom";
import FriendList from "./FriendList";

function App() {
  const [{ user, accountEntry }] = useStateValue();

  return (
    <>
      <AppBar position="static">
        <S.Nav>
          <Typography variant="h4">iMe</Typography>
          {user && <SignOut />}
        </S.Nav>
      </AppBar>

      <S.Main>
      {user ?   (
        <>
          <RoomList />
          <Chatroom />
          <FriendList />
        </>
      ): (
        {
          "Sign In": <SignIn />,
          "Register": <Register />,
        }[accountEntry]
      )}
      </S.Main>
    </>
  );
}

export default App;
