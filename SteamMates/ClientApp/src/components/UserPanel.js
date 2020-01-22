import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import UserAvatar from "./UserAvatar";
import LogoutButton from "./LogoutButton";
import { API_URL } from "../constants/api";
import "./../static/css/UserPanel.css";

const UserPanel = () => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const orderedFriends = [...friends].reverse();
  const emptySlots = [];

  for (let i = 3 - friends.length; i > 0; i--) {
    emptySlots.push(<UserAvatar />);
  }

  return (
    <div className="user-panel">
      {emptySlots.map((obj, index) => (
        <UserAvatar key={index} />
      ))}
      {orderedFriends.map(friend => (
        <UserAvatar key={friend.steamId} src={friend.avatarMedium} />
      ))}
      <UserAvatar src={user.avatarMedium} user={true} />
      <LogoutButton path={`${API_URL}/user/logout`} />
      <Redirect to="/friends" />
    </div>
  );
};

export default UserPanel;
