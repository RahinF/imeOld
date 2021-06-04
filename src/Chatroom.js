import { useEffect, useState } from "react";
import Message from "./Message";
import { database } from "./firebase";
import firebase from "firebase/app";
import * as S from "./Chatroom.style";
import { useStateValue } from "./StateProvider";

import SendIcon from "@material-ui/icons/Send";

function Chatroom() {
  const [{ user, room }] = useStateValue();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  

  // Pull data from database
  useEffect(() => {
    if (room) {
      database
        .collection("rooms")
        .doc(room.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
          );
        });
    }
  }, [room]);

  const sendMessage = (event) => {
    event.preventDefault();

    database.collection("rooms").doc(room.id).collection("messages").add({
      uid: user.uid,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <>
      {room && (
        <div>
            <div>{room.name}</div>
          <S.MessageDisplayArea>
            {messages.map(({ id, message }) => (
              <Message key={id} currentUserId={user?.uid} message={message} />
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
        </div>
      )}
    </>
  );
}

export default Chatroom;
