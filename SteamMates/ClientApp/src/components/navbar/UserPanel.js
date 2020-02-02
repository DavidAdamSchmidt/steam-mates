import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import FriendContext from "../../contexts/FriendContext";
import UserAvatar from "./UserAvatar";
import Tooltip from "./Tooltip";
import LogoutButton from "./LogoutButton";
import { API_URL } from "../../constants/api";
import "../../static/css/UserPanel.css";

const UserPanel = () => {
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const orderedFriends = [...friends].reverse();
  const ids = [3, 2, 1];
  const emptySlots = [];

  for (let i = 3 - orderedFriends.length; i > 0; i--) {
    emptySlots.push(<UserAvatar />);
  }

  return (
    <div className="user-panel">
      {emptySlots.map((obj, index) => (
        <Tooltip key={index} text={`Friend slot #${ids[index]}`}>
          {obj}
        </Tooltip>
      ))}
      {orderedFriends.map(friend => (
        <Tooltip key={friend.steamId} text={friend.personaName}>
          <UserAvatar user={friend} isFriend={true} />
        </Tooltip>
      ))}
      <Tooltip text={`${user.personaName} (you)`}>
        <UserAvatar user={user} isFriend={false} />
      </Tooltip>
      <LogoutButton path={`${API_URL}/user/logout`} />
    </div>
  );
};

export default UserPanel;
