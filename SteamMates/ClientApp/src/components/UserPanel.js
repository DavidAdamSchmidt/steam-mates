import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { API_URL } from "../constants";

const UserPanel = () => {
  const { user, loading } = useContext(UserContext);

  return loading ? null : user ? (
    <div>
      <p>
        <strong>Welcome, {user.personaName}!</strong>
      </p>
      <img src={user.avatarFull} alt="Avatar" />
      <p>Your id is {user.steamId}</p>
      <LogoutButton path={`${API_URL}/user/logout`} />
    </div>
  ) : (
    <LoginButton path={`${API_URL}/user/auth`} />
  );
};

export default UserPanel;
