import styled from "styled-components";

export const Card = styled.div`
  margin: 30px 15px;
  width: fit-content;

  text-align: left;
`;

export const Text = styled.div`
  margin-left: 10px;
`;

export const UserAvatar = styled.img`
  height: 50px;
  border-radius: 50%;
  align-self: center;
`;

export const Header = styled.div`
  display: flex;
`;

export const Body = styled.div`
  display: flex;
  word-break: break-all;
`;

export const Username = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0;
  padding-right: 10px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  margin-bottom: 0.3rem;
`;

export const Timestamp = styled.p`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  margin: 0;
  font-size: 0.8rem;
  align-self: center;
`;
