import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import database from "./firebase";
import Message from "./Message";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Pull data from database
    database
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({id: doc.id, message: doc.data()})));
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name:"));
  }, []);

  const sendMessage = (event) => {
    // stops refreshing when form is submitted
    event.preventDefault();

    // Push to database
    database.collection("messages").add({
      username: username,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // clear input field
    setInput("");
  };

  return (
    <div className="App">
      <h1>iMe</h1>
      <h3>Welcome {username}</h3>

      <FlipMove>
        {messages.map(({id, message}) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>

      <FormControl>
        <InputLabel>Enter message...</InputLabel>

        <Input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <Button
          variant="outlined"
          color="primary"
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        >
          Send message
        </Button>
      </FormControl>
    </div>
  );
}

export default App;
