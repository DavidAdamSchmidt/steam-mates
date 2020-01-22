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

  const removeFriend = friend => {
    setFriends(friends.filter(x => x.steamId !== friend.steamId));
  };

  return (
    <FriendContext.Provider value={{ friends, tryToAddFriend, removeFriend }}>
      {props.children}
    </FriendContext.Provider>
  );
};

export default FriendContext;
