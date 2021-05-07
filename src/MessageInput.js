import { forwardRef, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { FormControl, Input, InputLabel, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { database, auth } from "./firebase";
import firebase from "firebase/app";

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

const MessageInput = forwardRef((_, bottomOfMessageArea) => {
  const { displayName, uid, photoURL } = auth.currentUser;

  const [input, setInput] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();

    database.collection("messages").add({
      uid,
      username: displayName,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL,
    });

    setInput("");
    bottomOfMessageArea.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
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
  );
});

export default MessageInput;
