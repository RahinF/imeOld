import styled from "styled-components";
import { FormControl, IconButton, TextField } from "@material-ui/core";

export const Form = styled.form`
  padding: 20px;
  background: #e9e9eb;
  position: fixed:
  bottom: 0;
`;

export const StyledFormControl = styled(FormControl)`
  display: flex !important;
  flex-direction: row !important;
`;

export const Input = styled(TextField)`
  width: 100%;
`;

export const InputArea = styled.div`
  flex: 1;
`;

export const StyledIconButton = styled(IconButton)`
  flex: 0;
`;
