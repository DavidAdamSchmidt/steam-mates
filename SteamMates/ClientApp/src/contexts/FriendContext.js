import React, { createContext, useState, useEffect } from "react";
import { FRIENDS } from "../constants/localStorage";

const FriendContext = createContext(null);

export const FriendProvider = props => {
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem(FRIENDS)) || []
  );

  useEffect(() => {
    localStorage.setItem(FRIENDS, JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    if (props.clearFriends) {
      localStorage.removeItem(FRIENDS);
      setFriends([]);
    }
  }, [props.clearFriends]);

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
