import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const GameContainer = () => {
  const { user } = useContext(UserContext);
  if (user == null) {
    return <Redirect to="/" />;
  }

  return <div>Under construction...</div>;
};

export default GameContainer;
