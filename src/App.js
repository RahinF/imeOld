import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Message from "./Message";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("Please enter your name:"));
  }, []);

  const sendMessage = (event) => {
    // stops refreshing when form is submitted
    event.preventDefault();

    // append to message array
    setMessages([
      ...messages,
      { username: username, text: input, timestamp: Date.now() },
    ]);

    // clear input field
    setInput("");
  };

  return (
    <div className="App">
      <h1>iMe</h1>
      <h3>Welcome {username}</h3>

      {/* Message Area */}
      {messages.map((message, index) => (
        <Message
          key={index}
          username={message.username}
          text={message.text}
          timestamp={message.timestamp}
        />
      ))}

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
