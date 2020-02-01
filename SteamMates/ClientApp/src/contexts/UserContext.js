import React, { createContext } from "react";
import { API_URL } from "../constants/api";
import useRequest from "../hooks/useRequest";

const UserContext = createContext(null);

export const UserProvider = props => {
  const [loading, status, user, error, logout] = useRequest(
    `${API_URL}/user/info`,
    true
  );

  return (
    <UserContext.Provider value={{ loading, status, user, error, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
