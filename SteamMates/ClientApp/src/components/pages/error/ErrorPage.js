import React, { useRef, useContext, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import FriendContext from "../../../contexts/FriendContext";
import "./../../../static/css/ErrorPage.css";
import UserContext from "../../../contexts/UserContext";

const ErrorPage = props => {
  const isFirstRun = useRef(true);
  const { user } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const history = useHistory();

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      history.goBack();
    }
  }, [friends, history]);

  if (user && friends.length === 0) {
    return <Redirect to="/" />;
  }

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
