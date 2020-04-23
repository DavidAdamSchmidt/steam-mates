import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { showError } from "../utils/errorUtils";
import { PATH } from "../constants";

const PrivateRoute = ({ component, ...options }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to={PATH.HOME} />;
  }

  if (user.communityVisibilityState === 1) {
    return showError(
      "Your profile is set to private. Please change it to public on Steam to let us access your gaming data."
    );
  }

  return <Route {...options} component={component} />;
};

export default PrivateRoute;
