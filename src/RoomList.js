import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { database } from "./firebase";

function RoomList() {
  const [rooms, setRooms] = useState([]);

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
        <Link key={id} to={`/room/${id}`}>
          {room.roomName}
        </Link>
      ))}
    </div>
  );
}

export default RoomList;
