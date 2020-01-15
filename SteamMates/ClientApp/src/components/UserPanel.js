import React from "react";
import LoginButton from "./LoginButton";
import { API_URL } from "../constants";

const UserPanel = () => {
  return <LoginButton path={`${API_URL}/user/auth`} />;
};

export default UserPanel;
