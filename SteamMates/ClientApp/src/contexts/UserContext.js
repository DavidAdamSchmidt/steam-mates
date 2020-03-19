import React, { createContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { API_URL } from "../constants/api";
import { USER_ID } from "../constants/localStorage";

const UserContext = createContext(null);

export const UserProvider = props => {
  const [clearFriends, setClearFriends] = useState(false);

  const [loading, status, user, error, logout] = useRequest(
    `${API_URL}/user/info`,
    true
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.steamId !== localStorage.getItem(USER_ID)) {
      setClearFriends(true);
    }

    localStorage.setItem(USER_ID, user.steamId);
  }, [user]);

  return (
    <UserContext.Provider
      value={{ loading, status, user, error, logout, clearFriends }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
