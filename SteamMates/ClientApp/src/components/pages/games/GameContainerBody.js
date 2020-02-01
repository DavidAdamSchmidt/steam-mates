import React from "react";
import GameLogo from "./GameLogo";
import "../../../static/css/GameContainerBody.css";

const GameContainerBody = ({ data }) => {
  return (
    <div className="game-container-body">
      {data.map(stat => (
        <GameLogo key={stat.game.appId} game={stat.game} />
      ))}
    </div>
  );
};

export default GameContainerBody;
