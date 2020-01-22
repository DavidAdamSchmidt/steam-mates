import React from "react";
import { Switch, Route } from "react-router-dom";
import SearchBox from "./SearchBox";
import Home from "./Home";
import "./../static/css/MainContainer.css";
import GameContainer from "./GameContainer";

const MainContainer = () => {
  return (
    <div className="container">
      <Switch>
        <Route path="/friends" component={SearchBox} />
        <Route path="/games" component={GameContainer} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default MainContainer;
