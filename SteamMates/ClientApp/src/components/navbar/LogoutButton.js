import React, { useState, useContext } from "react";
import useRequest from "../../hooks/useRequest";
import UserContext from "../../contexts/UserContext";
import { API_URL } from "../../constants/api";

const LogoutButton = ({ children }) => {
  const [sendRequest, setSendRequest] = useState(false);
  const context = useContext(UserContext);
  const { status } = useRequest(`${API_URL}/user/logout`, sendRequest, "POST");

  if (status === 204) {
    context.logout();
  }

  return <span onClick={() => setSendRequest(true)}>{children}</span>;
};

export default LogoutButton;
