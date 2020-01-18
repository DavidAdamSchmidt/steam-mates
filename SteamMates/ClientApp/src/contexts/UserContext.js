import React, { createContext, useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../constants";

const UserContext = createContext(null);

export const UserContextProvider = props => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${API_URL}/user/info`, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setUser({
            id: response.data.steamId,
            name: response.data.name,
            avatar: response.data.avatar
          });
        } else {
          console.log(response);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
