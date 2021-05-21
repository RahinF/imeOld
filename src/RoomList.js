import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { database } from "./firebase";
import { useStateValue } from "./StateProvider";


function RoomList() {
  const [rooms, setRooms] = useState([]);

  const [, dispatch] = useStateValue();

  const setCurrentRoom = (id) => {

    dispatch({
      type: "SET_CURRENT_ROOM",
      roomNumber: id,
    });

  }

  console.log(useStateValue())

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
      {rooms.map(({ id, room }) => (
        <Link key={id} to={`/room/${id}`} onClick={() => setCurrentRoom(id)}>
          {room.roomName}
        </Link>
      ))}
    </div>
  );
}

export default RoomList;
