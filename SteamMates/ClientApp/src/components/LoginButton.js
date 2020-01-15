import React from "react";
import "./LoginButton.css";
import login_button from "../static/images/login_button.png";

const LoginButton = ({ path }) => {
  return (
    <form className="login-form" action={path}>
      <button className="login-button">
        <img src={login_button} alt="LoginButton" />
      </button>
    </form>
  );
};

export default LoginButton;
