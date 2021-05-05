import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (event) => {

    // stops refreshing when form is submitted
    event.preventDefault();
    
    // append to message array
    setMessages([...messages, input]);

    // clear input field
    setInput("");
  };

  return (
    <div className="App">
      <h1>iMe</h1>

      {/* Message Area */}
      {messages.map((message) => (
        <p>{message}</p>
      ))}

      <form>
        <input
          type="text"
          placeholder="Enter message..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button type="submit" onClick={sendMessage}>
          Send message
        </button>
      </form>
    </div>
  );
}

export default App;
