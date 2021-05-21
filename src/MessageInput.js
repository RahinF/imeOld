import { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { database } from "./firebase";
import firebase from "firebase/app";
import * as S from "./MessageInput.style";
import { useStateValue } from "./StateProvider";

const MessageInput = () => {
  const [{ user, room }] = useStateValue();

  const [input, setInput] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();

    database.collection("rooms").doc(room).collection("messages").add({
      uid: user.uid,
      username: user.displayName,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL: user.photoURL,
    });

    setInput("");
  };

  return (
    <S.Form>
      <S.StyledFormControl>
        <S.InputArea>
          <S.Input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            multiline
            rowsMax={4}
            label="Enter message..."
          />
        </S.InputArea>

        <S.StyledIconButton
          color="primary"
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        >
          <SendIcon />
        </S.StyledIconButton>
      </S.StyledFormControl>
    </S.Form>
  );
};

export default MessageInput;
