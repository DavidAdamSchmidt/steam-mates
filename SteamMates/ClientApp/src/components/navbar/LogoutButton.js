import React, { useState, useContext } from "react";
import styled from "styled-components";
import useRequest from "../../hooks/useRequest";
import UserContext from "../../contexts/UserContext";

const Button = styled.button`
  margin: 0;
  border: none;
  padding: 0 0 0 10px;
  background: none;
  cursor: pointer;
  font-size: 14pt;
  color: white;

  &:focus {
    outline: 0;
  }
`;

const LogoutButton = ({ path }) => {
  const [sendRequest, setSendRequest] = useState(false);
  const context = useContext(UserContext);
  const [, status] = useRequest(path, sendRequest, "POST");
  if (status === 204) {
    context.logout();
  }

  return <Button onClick={() => setSendRequest(true)}>Logout</Button>;
};

export default LogoutButton;
