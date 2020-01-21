import React, { useState, useContext } from "react";
import useRequest from "../hooks/useRequest";
import UserContext from "../contexts/UserContext";
import "./../static/css/LogoutButton.css";

const LogoutButton = ({ path }) => {
  const [sendRequest, setSendRequest] = useState(false);
  const context = useContext(UserContext);
  const [, status] = useRequest(path, sendRequest, "POST");
  if (status === 204) {
    context.logout();
  }

  return (
    <button className="logout-button" onClick={() => setSendRequest(true)}>
      Logout
    </button>
  );
};

export default LogoutButton;
