import React from "react";
import GameLogo from "./GameLogo";
import "./../static/css/GameContainer.css";

const GameContainer = ({ loading, data }) => {
  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="game-container">
      {data &&
        data.map(stat => <GameLogo key={stat.game.appId} game={stat.game} />)}
      {data && data.length === 0 && <div>0 games were found</div>}
    </div>
  );
};

export default GameContainer;
