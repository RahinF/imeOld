import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  return (
    <div className="App">
      <h1>iMe</h1>

      {/* Message Area */}

      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter message..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />

      {/* Input Button */}
      <button>Send message</button>
    </div>
  );
}

export default App;
