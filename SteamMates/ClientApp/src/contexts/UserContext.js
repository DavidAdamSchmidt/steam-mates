import React, { createContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import RequestHandler from "../components/RequestHandler";
import { API_URL } from "../constants/api";
import { USER_ID } from "../constants/localStorage";

const UserContext = createContext(null);

export const UserProvider = props => {
  const [clearFriends, setClearFriends] = useState(false);

  const request = useRequest(`${API_URL}/user/info`, true);
  const { loading, status, data, error, reset } = request;

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.steamId !== localStorage.getItem(USER_ID)) {
      setClearFriends(true);
    }

    localStorage.setItem(USER_ID, data.steamId);
  }, [data]);

  return (
    <RequestHandler request={request}>
      <UserContext.Provider
        value={{
          loading,
          status,
          user: data,
          error,
          logout: reset,
          clearFriends
        }}
      >
        {props.children}
      </UserContext.Provider>
    </RequestHandler>
  );
};

export default UserContext;
