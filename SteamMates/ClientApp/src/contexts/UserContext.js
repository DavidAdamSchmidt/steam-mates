import React, { createContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import LoadingIndicator from "../components/common/LoadingIndicator";
import { STORAGE, API_ROOT } from "../constants";

const UserContext = createContext(null);

const key = STORAGE.USER_ID;

export const UserProvider = props => {
  const [clearFriends, setClearFriends] = useState(false);

  const request = useRequest(`${API_ROOT}/user/info`, true);
  const { loading, status, data, error, reset } = request;

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.steamId !== localStorage.getItem(key)) {
      setClearFriends(true);
    }

    localStorage.setItem(key, data.steamId);
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
