import { Typography } from "@material-ui/core";
import moment from "moment";
import { forwardRef } from "react";
import * as S from "./Message.style";

const Message = forwardRef(({ uid, message }, ref) => {
  const isUser = uid === message.uid;

  return (
    <S.Card ref={ref} $currentuser={isUser}>
      <S.Body>
        <S.UserAvatar
          src={message.photoURL}
          alt={`${message.username}'s avatar`}
        />

        <S.Text $currentuser={isUser}>
          <S.Header>
            <S.Username>{message.username}</S.Username>

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
