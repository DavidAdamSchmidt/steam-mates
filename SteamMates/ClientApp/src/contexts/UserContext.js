import React, { createContext } from "react";
import { API_URL } from "../constants";
import useRequest from "../hooks/useRequest";

const UserContext = createContext(null);

export const UserContextProvider = props => {
  const [loading, , user, , logout] = useRequest(`${API_URL}/user/info`, true);

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
