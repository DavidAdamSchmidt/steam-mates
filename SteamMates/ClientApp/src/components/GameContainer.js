import React from "react";
import GameContainerHeader from "./GameContainerHeader";
import GameContainerBody from "./GameContainerBody";

const GameContainer = ({ loading, data, tags }) => {
  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="game-container">
      <GameContainerHeader tags={tags} gameCount={data ? data.length : 0} />
      {data && <GameContainerBody data={data} />}
    </div>
  );
};

export default GameContainer;
