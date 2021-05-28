import { useState } from "react";
import { database } from "./firebase";
import firebase from "firebase/app";
import { IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function CreateRoom() {
  const [roomName, setRoomName] = useState("");

  const createRoom = (event) => {
    event.preventDefault();

    database.collection("rooms").add({
      //   owner: uid,
      roomName: roomName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setRoomName("");
  };

  return (
    <form>
      <TextField
        type="text"
        label="Enter Room Name"
        onChange={(event) => setRoomName(event.target.value)}
      />
      <IconButton
        onClick={createRoom}
        color="primary"
        type="submit"
        disabled={!roomName}
      >
        <AddIcon />
      </IconButton>
    </form>
  );
}

export default CreateRoom;
