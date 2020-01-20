import React from "react";
import "../static/css/LoginButton.css";
import login_button from "../static/images/login_button.png";

const LoginButton = ({ path }) => {
  return (
    <form className="login-form" action={path} method="post">
      <button className="login-button">
        <img src={login_button} alt="LoginButton" />
      </button>
    </form>
  );
};

export default LoginButton;
