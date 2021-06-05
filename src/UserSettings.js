import { Avatar, IconButton } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { database, storage } from "./firebase";
import { useStateValue } from "./StateProvider";

function UserSettings() {
  const inputFile = useRef(null);
  const [{ user }, dispatch] = useStateValue();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [comment, setComment] = useState(user.comment);

  const submitDisplayNameChange = () => {
    database
      .collection("users")
      .doc(user.uid)
      .update({ displayName: displayName });
  };

  const submitCommentChange = () => {
    database.collection("users").doc(user.uid).update({ comment: comment });
  };

  useEffect(() => {
    database
      .collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        dispatch({
          type: "UPDATE_USER_INFO",
          user: { uid: user.uid, ...doc.data() },
        });
      });
  }, [user.uid, dispatch]);

  const submitAvatarChange = async (event) => {
    if (!event.target.files[0]) {
      return;
    }
    const file = event.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`avatar`).child(`${user.uid}.jpg`);

    const metadata = {
      contentType: "image/jpeg",
    };

    await fileRef.put(file, metadata);

    await fileRef.getDownloadURL().then((url) => {
      database.collection("users").doc(user.uid).update({ avatar: url });
    });
  };

  const openFileUpload = () => {
    inputFile.current.click();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
      />
      <button onClick={submitDisplayNameChange}>save name change</button>

      <input
        type="text"
        placeholder="comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button onClick={submitCommentChange}>save comment change</button>

      {/* Profile picture change */}
      <IconButton color="primary" component="span">
        <Avatar
          src={user.avatar || "http://via.placeholder.com/300"}
          alt={`${user.displayName}'s avatar`}
          onClick={openFileUpload}
        />
      </IconButton>

      <input
        type="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={submitAvatarChange}
      />
    </div>
  );
}

export default UserSettings;
