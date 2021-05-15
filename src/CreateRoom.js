import { useState } from "react";
import { database } from "./firebase";
import firebase from "firebase/app";

function CreateRoom() {
  const [roomName, setRoomName] = useState("");

  const createRoom = () => {
    database.collection("rooms").add({
    //   owner: uid,
      roomName: roomName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Room Name"
        onChange={(event) => setRoomName(event.target.value)}
      />
      <button onClick={createRoom}>Create room</button>
    </div>
  );
}

export default CreateRoom;
