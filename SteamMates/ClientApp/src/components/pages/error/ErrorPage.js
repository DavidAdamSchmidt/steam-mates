import React, { useRef, useContext, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import FriendContext from "../../../contexts/FriendContext";
import "./../../../static/css/ErrorPage.css";

const ErrorPage = props => {
  const isFirstRun = useRef(true);
  const { friends } = useContext(FriendContext);
  const history = useHistory();

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      history.goBack();
    }
  }, [friends, history]);

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
