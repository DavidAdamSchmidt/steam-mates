import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import FriendsTable from "./FriendsTable";
import { API_URL } from "../constants";
import SearchBox from "./SearchBox";

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
      <SearchBox />
      <FriendsTable />
    </div>
  ) : (
    <LoginButton path={`${API_URL}/user/auth`} />
  );
};

export default UserPanel;
