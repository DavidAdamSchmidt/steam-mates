import React, { useState, useContext } from "react";
import useRequest from "../../hooks/useRequest";
import UserContext from "../../contexts/UserContext";
import { API_ROOT } from "../../constants";

const LogoutButton = ({ children }) => {
  const [sendRequest, setSendRequest] = useState(false);
  const context = useContext(UserContext);
  const { status } = useRequest(`${API_ROOT}/user/logout`, sendRequest, "POST");

  if (status === 204) {
    context.logout();
  }

  return <span onClick={() => setSendRequest(true)}>{children}</span>;
};

export default LogoutButton;
