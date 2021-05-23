import { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import Message from "./Message";
import { database } from "./firebase";
import * as S from "./MessageArea.style";
import { useStateValue } from "./StateProvider";

function MessageArea() {
  const [{ user, roomId }] = useStateValue();

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

  return (
    <>
      {roomId && (
        <S.MessageDisplayArea>
          <FlipMove>
            {messages.map(({ id, message }) => (
              <Message key={id} uid={user?.uid} message={message} />
            ))}
          </FlipMove>
        </S.MessageDisplayArea>
      )}
    </>
  );
}

export default MessageArea;
