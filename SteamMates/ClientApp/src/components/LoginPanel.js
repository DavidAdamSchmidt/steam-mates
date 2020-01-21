import React from "react";
import LoginButton from "./LoginButton";
import { API_URL } from "../constants/api";
import "./../static/css/LoginPanel.css";

const LoginPanel = () => {
  return (
    <div className="login-panel">
      <LoginButton path={`${API_URL}/user/auth`} />
    </div>
  );
};

export default LoginPanel;
