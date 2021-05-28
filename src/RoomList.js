import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { database } from "./firebase";
import { useStateValue } from "./StateProvider";

import firebase from "firebase/app";
import { IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import * as S from "./RoomList.style";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  const [, dispatch] = useStateValue();
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

  const setCurrentRoom = (id) => {
    dispatch({
      type: "SET_CURRENT_ROOM",
      roomId: id,
    });
  };

  // Pull data from database
  useEffect(() => {
    database
      .collection("rooms")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({ id: doc.id, room: doc.data() }))
        );
      });
  }, []);

  return (
    <div>
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
      <S.RoomList>
        {rooms.map(({ id, room }) => (
          <Link key={id} to={`/room/${id}`} onClick={() => setCurrentRoom(id)}>
            <div>{room.roomName}</div>
          </Link>
        ))}
      </S.RoomList>
    </div>
  );
}

export default RoomList;
