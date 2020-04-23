import React, { createContext, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { STORAGE } from "../constants";

const FriendContext = createContext(null);

const key = STORAGE.FRIENDS;

export const FriendProvider = props => {
  const { clearFriends } = useContext(UserContext);

  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem(key)) || []
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    if (clearFriends) {
      localStorage.removeItem(key);
      setFriends([]);
    }
  }, [clearFriends]);

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
