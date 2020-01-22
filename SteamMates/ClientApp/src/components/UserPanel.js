import React, { useContext } from "react";
import {Redirect} from "react-router-dom";
import UserContext from "../contexts/UserContext";
import LogoutButton from "./LogoutButton";
import { API_URL } from "../constants/api";
import "./../static/css/UserPanel.css";
import UserAvatar from "./UserAvatar";

const UserPanel = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="user-panel">
      <UserAvatar />
      <UserAvatar />
      <UserAvatar />
      <UserAvatar src={user.avatarMedium} />
      <LogoutButton path={`${API_URL}/user/logout`} />
      <Redirect to="/friends"/>
    </div>
  );
};

export default UserPanel;
