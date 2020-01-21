import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import UserPanel from "./UserPanel";
import LoginPanel from "./LoginPanel";
import "./../static/css/NavigationBar.css";

const NavigationBar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="navigation-bar">
      <div className="navigation-bar-container">
        {user ? <UserPanel /> : <LoginPanel />}
      </div>
    </div>
  );
};

export default NavigationBar;
