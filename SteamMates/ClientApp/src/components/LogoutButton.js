import React from "react";
import Axios from "axios";

const LogoutButton = ({ path, onLogout }) => {
  const logout = () => {
    Axios.post(path, undefined, { withCredentials: true })
      .then(response => {
        if (response.status === 204) {
          onLogout();
        }
      })
      .catch(error => console.log(error));
  };

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
