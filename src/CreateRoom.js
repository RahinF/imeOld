import { useState } from "react";
import { database } from "./firebase";
import firebase from "firebase/app";

function CreateRoom() {
  const [roomId, setRoomId] = useState("");

  const createRoom = () => {
    database.collection("rooms").add({
    //   owner: uid,
    roomId: roomId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Room Name"
        onChange={(event) => setRoomId(event.target.value)}
      />
      <button onClick={createRoom}>Create room</button>
    </div>
  );
}

export default CreateRoom;
