import { useEffect, useState } from "react";
import Message from "./Message";
import { database } from "./firebase";
import firebase from "firebase/app";
import * as S from "./Chatroom.style";
import { useStateValue } from "./StateProvider";

import SendIcon from "@material-ui/icons/Send";

function Chatroom() {
  const [{ user, roomId }] = useStateValue();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Pull data from database
  useEffect(() => {
    if (roomId) {
      database
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
          );
        });
    }
  }, [roomId]);

  const sendMessage = (event) => {
    event.preventDefault();

    database.collection("rooms").doc(roomId).collection("messages").add({
      uid: user.uid,
      username: user.displayName,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL: user.photoURL,
    });

    setInput("");
  };

  return (
    <>
      {roomId && (
        <>
          <S.MessageDisplayArea>
            {messages.map(({ id, message }) => (
              <Message key={id} uid={user?.uid} message={message} />
            ))}
          </S.MessageDisplayArea>
          <S.Form>
            <S.StyledFormControl>
              <S.InputArea>
                <S.Input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  label="Type a message..."
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
        </>
      )}
    </>
  );
}

export default Chatroom;
