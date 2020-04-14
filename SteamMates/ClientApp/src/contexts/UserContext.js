import React, { createContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import LoadingIndicator from "../components/common/LoadingIndicator";
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

  if (loading) {
    return <LoadingIndicator marginTop={"100px"} />;
  }

  return (
    <UserContext.Provider
      value={{
        status,
        user: data,
        error,
        logout: reset,
        clearFriends
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
