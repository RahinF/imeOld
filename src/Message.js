import React from "react";

function Message({ username, text, timestamp }) {
  return (
    <div>
      <p>
        {username}: {text}
      </p>
      <p>
        {Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(timestamp)}
      </p>
    </div>
  );
}

export default Message;
