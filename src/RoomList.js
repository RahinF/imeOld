import { useState, useEffect } from "react";
import { database } from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase/app";
import { IconButton, TextField } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import AddIcon from "@material-ui/icons/Add";
import * as S from "./RoomList.style";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [, dispatch] = useStateValue();
  const [roomName, setRoomName] = useState("");

  const tabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const createRoom = (event) => {
    event.preventDefault();

    database.collection("rooms").add({
      //   owner: uid,
      roomName: roomName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // doesnt work!
    setRoomName("");
  };

  const setCurrentRoom = (id, room) => {
    dispatch({
      type: "SET_CURRENT_ROOM",
      room: {
        id: id,
        name: room.roomName,
      },
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

      <S.TabList
        textColor="primary"
        indicatorColor="primary"
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={tabChange}
      >
        {rooms.map(({ id, room }) => (
          <Tab
            label={room.roomName}
            key={id}
            onClick={() => setCurrentRoom(id, room)}
          />
        ))}
      </S.TabList>
    </div>
  );
}

export default RoomList;
