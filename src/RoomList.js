import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { database } from "./firebase";
import { useStateValue } from "./StateProvider";
import * as S from "./RoomList.style"

function RoomList() {
  const [rooms, setRooms] = useState([]);

  const [, dispatch] = useStateValue();

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
    <S.RoomList>
      {rooms.map(({ id, room }) => (
        <Link key={id} to={`/room/${id}`} onClick={() => setCurrentRoom(id)}>
         <div>{room.roomName}</div> 
        </Link>
      ))}
    </S.RoomList>
  );
}

export default RoomList;
