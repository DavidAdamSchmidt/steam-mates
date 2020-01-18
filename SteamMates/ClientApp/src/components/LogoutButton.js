import React, { useContext } from "react";
import Axios from "axios";
import UserContext from "../contexts/UserContext";

const LogoutButton = ({ path, onLogout }) => {
  const context = useContext(UserContext);

  const logout = () => {
    Axios.post(path, undefined, { withCredentials: true })
      .then(response => {
        if (response.status === 204) {
          context.logout();
        }
      })
      .catch(error => console.log(error));
  };

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
