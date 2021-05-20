import { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import Message from "./Message";
import { database, auth } from "./firebase";
import * as S from "./MessageArea.style";

function MessageArea() {
  const { uid } = auth.currentUser;

  const [messages, setMessages] = useState([]);

  // Pull data from database
  useEffect(() => {
    database
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  return (
    <S.MessageDisplayArea>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} uid={uid} message={message} />
        ))}
      </FlipMove>
    </S.MessageDisplayArea>
  );
}

export default MessageArea;
