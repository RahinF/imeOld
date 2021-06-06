import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { database, storage } from "./firebase";
import { useStateValue } from "./StateProvider";
import SettingsIcon from "@material-ui/icons/Settings";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

function UserSettings() {
  const inputFile = useRef(null);
  const [{ user }, dispatch] = useStateValue();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [comment, setComment] = useState(user.comment);

  const submitUserInfoChange = () => {
    database
      .collection("users")
      .doc(user.uid)
      .update({ displayName: displayName, comment: comment });

    closeDialogBox();
  };

  useEffect(() => {
    //  pull user data from db if changed
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
    const file = event.target.files[0];

    if (!file) {
      return;
    }

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

  //
  const [open, setOpen] = useState(false);

  const openDialogBox = () => {
    setOpen(true);
  };

  const closeDialogBox = () => {
    setOpen(false);
  };
  //

  return (
    <div>
      <Card style={{ width: "400px" }}>
        <CardHeader
          avatar={
            <Avatar
              src={user.avatar || "http://via.placeholder.com/300"}
              alt={`${user.displayName}'s avatar`}
            />
          }
          action={
            <IconButton
              color="primary"
              onClick={openDialogBox}
              style={{ marginTop: "0" }}
            >
              <SettingsIcon />
            </IconButton>
          }
          title={user.displayName}
          subheader={user.comment}
        />
      </Card>

      <Dialog open={open} onClose={closeDialogBox}>
        <DialogTitle>User Settings</DialogTitle>
        <div>
          <Grid container justify="center">
            <IconButton
              color="primary"
              component="span"
              onClick={openFileUpload}
            >
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={<AddAPhotoIcon color="secondary"/>}
                
                
              >
                <Avatar
                  src={user.avatar || "http://via.placeholder.com/300"}
                  alt={`${user.displayName}'s avatar`}
                  style={{ height: "100px", width: "100px" }}
                />
              </Badge>
            </IconButton>

            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={submitAvatarChange}
            />
          </Grid>

          <Box m={4}>
            <TextField
              type="text"
              label="Display Name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>

          <Box m={4}>
            <TextField
              type="text"
              label="Comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
        </div>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={submitUserInfoChange}
            disabled={!displayName}
          >
            Save
          </Button>

          <Button onClick={closeDialogBox} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserSettings;
