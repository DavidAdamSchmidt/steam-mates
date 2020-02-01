import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Logo from "./Logo";
import Menu from "./Menu";
import UserPanel from "./UserPanel";
import LoginPanel from "./LoginPanel";
import "../../static/css/NavigationBar.css";

const NavigationBar = () => {
  const { user } = useContext(UserContext);
  const menus = ["Home", "Friends", "Games"];

  return (
    <div className="navigation-bar">
      <div className="navigation-bar-container">
        <Logo />
        {user ? (
          <>
            {menus.map((menu, index) => (
              <Menu key={index} name={menu} />
            ))}
            <UserPanel />
          </>
        ) : (
          <LoginPanel />
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
