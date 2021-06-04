import { Typography } from "@material-ui/core";
import moment from "moment";
import { forwardRef, useState } from "react";
import { database } from "./firebase";
import * as S from "./Message.style";

const Message = forwardRef(({ currentUserId, message }, ref) => {
  const isUser = currentUserId === message.uid;
  const [displayName, setDisplayName] = useState(null);
  const [avatar, setAvatar] = useState(null);


  database.collection("users").doc(message.uid).get().then((userData) => {
    setDisplayName(userData.data().displayName)
    setAvatar(userData.data().avatar)
  })

  return (
    <S.Card ref={ref} $currentuser={isUser}>
      <S.Body>
        <S.UserAvatar
          src={avatar}
          alt={`${displayName}'s avatar`}
        />

        <S.Text $currentuser={isUser}>
          <S.Header>
            <S.Username>{displayName}</S.Username>

            <S.Timestamp variant="subtitle2">
              {moment(message.timestamp?.toDate()).format("h:mm a  DD/MM/YYYY")}
            </S.Timestamp>
          </S.Header>

          <Typography variant="body1">{message.text}</Typography>
        </S.Text>
      </S.Body>
    </S.Card>
  );
});

export default Message;
