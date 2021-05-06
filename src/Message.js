import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledCard = styled(Card)`
  padding: 10px;
  margin: 10px;
  width: fit-content;

  background: ${(props) => (props.currentuser ? `blue` : `grey`)};

  ${(props) => props.currentuser && `margin-left: auto;`};

  color: white;
  text-align: left;
`;

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;

  console.log(message);

  return (
    <StyledCard ref={ref} currentuser={isUser}>
      <CardContent>
        <Typography color="white" variant="h4">
          {message.username}
          {/* {console.log(new Date(message.timestamp.seconds*1000))} */}
        </Typography>
        <Typography color="white" variant="h5">
          {message.text}
        </Typography>
      </CardContent>
    </StyledCard>
  );
})

export default Message;
