import React, { useContext } from "react";
import {Redirect} from "react-router-dom";
import UserContext from "../contexts/UserContext";
import LogoutButton from "./LogoutButton";
import { API_URL } from "../constants/api";
import "./../static/css/UserPanel.css";

const UserPanel = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="user-panel">
      <img className="user-avatar" src={user.avatarMedium} alt="Avatar" />
      <LogoutButton path={`${API_URL}/user/logout`} />
      <Redirect to="/search-friends"/>
    </div>
  );
};

export default UserPanel;
