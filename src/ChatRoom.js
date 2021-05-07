import { FormControl, Input, InputLabel, IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import { database } from "./firebase";
import Message from "./Message";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import { auth } from "./firebase";

const StyledForm = styled.form`
  padding: 20px;
  position: fixed;
  bottom: 0;
  z-index: 1;
  background: #e9e9eb;
  width: 90%;
  margin: 20px;
  border-radius: 10px;

  left: 50%;
  transform: translate(-50%, 0);
`;

const StyledFormControl = styled(FormControl)`
  display: flex !important;
  flex-direction: row !important;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledInputArea = styled.div`
  flex: 1;
`;

const StyledIconButton = styled(IconButton)`
  flex: 0;
`;

function ChatRoom() {
  const { displayName, uid, photoURL } = auth.currentUser;

  const [input, setInput] = useState("");
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

  const sendMessage = (event) => {
    // stops refreshing when form is submitted
    event.preventDefault();


    // Push to database
    database.collection("messages").add({
      uid,
      username: displayName,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL,
    });


    // clear input field
    setInput("");
  };

  return (
    <div>
      <h3>Welcome {displayName}</h3>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message
            key={id}
            uid={uid}
            message={message}
          />
        ))}
      </FlipMove>

      <StyledForm>
        <StyledFormControl>
          <StyledInputArea>
            <InputLabel>Enter message...</InputLabel>
            <StyledInput
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </StyledInputArea>

          <StyledIconButton
            color="primary"
            disabled={!input}
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </StyledIconButton>
        </StyledFormControl>
      </StyledForm>
    </div>
  );
}

export default ChatRoom;
