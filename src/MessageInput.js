import { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { FormControl, IconButton, TextField } from "@material-ui/core";
import styled from "styled-components";
import { database, auth } from "./firebase";
import firebase from "firebase/app";

const StyledForm = styled.form`
  padding: 20px;
  background: #e9e9eb;
  position: fixed:
  bottom: 0;
`;

const StyledFormControl = styled(FormControl)`
  display: flex !important;
  flex-direction: row !important;
`;

const StyledInput = styled(TextField)`
  width: 100%;
`;

const StyledInputArea = styled.div`
  flex: 1;
`;

const StyledIconButton = styled(IconButton)`
  flex: 0;
`;

const MessageInput = () => {
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
  };

  return (
    <StyledForm>
      <StyledFormControl>
        <StyledInputArea>
          <StyledInput
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            multiline
            rowsMax={4}
            label="Enter message..."
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
};

export default MessageInput;
