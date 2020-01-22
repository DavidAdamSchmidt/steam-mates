import React, { createContext, useState } from "react";

const FriendContext = createContext(null);

export const FriendProvider = props => {
  const [friends, setFriends] = useState([]);

  const tryToAddFriend = friend => {
    if (friends.length < 3) {
      if (friends.some(x => x.steamId === friend.steamId)) {
        return false;
      }
      setFriends([...friends, friend]);
      return true;
    }
    return false;
  };

  return (
    <FriendContext.Provider value={{ friends, tryToAddFriend }}>
      {props.children}
    </FriendContext.Provider>
  );
};

export default FriendContext;
