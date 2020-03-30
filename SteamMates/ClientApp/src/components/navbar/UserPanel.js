import React, { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import FriendContext from "../../contexts/FriendContext";
import UserAvatar from "./UserAvatar";
import Tooltip from "./Tooltip";
import LogoutButton from "./LogoutButton";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 5px 0 18px;
  user-select: none;
`;

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
    <Wrapper>
      {emptySlots.map((obj, index) => (
        <Tooltip key={index} text={`Friend slot #${ids[index]}`}>
          {obj}
        </Tooltip>
      ))}
      {orderedFriends.map(friend => (
        <Tooltip key={friend.steamId} text={friend.personaName}>
          <UserAvatar profile={friend} isFriend={true} />
        </Tooltip>
      ))}
      <Tooltip text={`${user.personaName} (you)`}>
        <LogoutButton>
          <UserAvatar profile={user} isFriend={false} />
        </LogoutButton>
      </Tooltip>
    </Wrapper>
  );
};

export default UserPanel;
