import React, { useState, useEffect } from "react";
import Axios from "axios";
import LoginButton from "./LoginButton";
import { API_URL } from "../constants";

const UserPanel = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${API_URL}/user/info`)
      .then(response => {
        if (response.status === 200) {
          setUserId(response.data.steamId);
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

  return loading ? null : userId ? (
    <p>Your id is {userId}</p>
  ) : (
    <LoginButton path={`${API_URL}/user/auth`} />
  );
};

export default UserPanel;
