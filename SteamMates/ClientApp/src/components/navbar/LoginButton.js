import React from "react";
import login_button from "../../static/images/login_button.png";
import "../../static/css/LoginButton.css";

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
