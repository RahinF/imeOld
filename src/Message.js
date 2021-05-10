import { Typography } from "@material-ui/core";
import moment from "moment";
import { forwardRef } from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  margin: 30px 15px;
  width: fit-content;

  text-align: left;
`;

const MessageText = styled.div`
  margin-left: 10px;
`;

const UserAvatar = styled.img`
  height: 50px;
  border-radius: 50%;
  align-self: center;
`;

const MessageHeader = styled.div`
  display: flex;
`;

const MessageBody = styled.div`
  display: flex;
  word-break: break-all;
`;

const MessageUsername = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0;
  padding-right: 10px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  margin-bottom: 0.3rem;
`;
const MessageTimestamp = styled.p`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  margin: 0;
  font-size: 0.8rem;
  align-self: center;
`;

const Message = forwardRef(({ uid, message }, ref) => {
  const isUser = uid === message.uid;

  return (
    <StyledCard ref={ref} $currentuser={isUser}>
      <MessageBody>
        <UserAvatar
          src={message.photoURL}
          alt={`${message.username}'s avatar`}
        />

        <MessageText $currentuser={isUser}>
          <MessageHeader>
            <MessageUsername>{message.username}</MessageUsername>

            <MessageTimestamp variant="subtitle2">
              {moment(message.timestamp?.toDate()).format("h:mm a  DD/MM/YYYY")}
            </MessageTimestamp>
          </MessageHeader>

          <Typography variant="body1">{message.text}</Typography>
        </MessageText>
      </MessageBody>
    </StyledCard>
  );
});

export default Message;
