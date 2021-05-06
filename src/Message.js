import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledCard = styled(Card)`
  padding: 10px;
  margin: 10px;
  width: fit-content;

  background-color: ${(props) => (props.currentuser ? `purple` : `grey`)} !important;

  ${(props) => props.currentuser && `margin-left: auto;`};

  color: white !important;
  text-align: left;
`;

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;

  return (
    <StyledCard ref={ref} currentuser={isUser}>
      <CardContent>
        <Typography color="white" variant="h4">
          {!isUser && `${message.username || "Unknown User"}`}
          {/* {console.log(new Date(message.timestamp.seconds*1000))} */}
        </Typography>
        <Typography color="textPrimary" variant="body1">
          {message.text}
        </Typography>
      </CardContent>
    </StyledCard>
  );
});

export default Message;
