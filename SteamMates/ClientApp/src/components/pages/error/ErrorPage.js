import React from "react";
import { Redirect } from "react-router-dom";
import "./../../../static/css/ErrorPage.css";

const ErrorPage = props => {
  const message = (((props || {}).location || {}).state || {}).message;

  if (message) {
    return (
      <div className="error-page">
        <span className="error-message">Error: {message}</span>
      </div>
    );
  }

  return <Redirect to="/" />;
};

export default ErrorPage;
