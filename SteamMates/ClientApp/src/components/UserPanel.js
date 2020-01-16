import React, { useState, useEffect } from "react";
import Axios from "axios";
import LoginButton from "./LoginButton";
import { API_URL } from "../constants";

const UserPanel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${API_URL}/user/info`)
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

  return loading ? null : user ? (
    <div>
      <p><strong>Welcome, {user.name}!</strong></p>
      <img src={user.avatar} alt="Avatar" />
      <p>Your id is {user.id}</p>
    </div>
  ) : (
    <LoginButton path={`${API_URL}/user/auth`} />
  );
};

export default UserPanel;
