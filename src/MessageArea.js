import { useEffect, useRef, useState } from "react";
import FlipMove from "react-flip-move";
import Message from "./Message";
import { database, auth } from "./firebase";
import MessageInput from "./MessageInput";

function MessageArea() {
  const { uid } = auth.currentUser;
  const bottomOfMessageArea = useRef();

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
    <>
      <div>
        <FlipMove>
          {messages.map(({ id, message }) => (
            <Message key={id} uid={uid} message={message} />
          ))}
        </FlipMove>

        <span ref={bottomOfMessageArea}></span>
      </div>

      <MessageInput ref={bottomOfMessageArea} />
    </>
  );
}

export default MessageArea;
