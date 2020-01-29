import React from "react";
import GameContainerHeader from "./GameContainerHeader";
import GameContainerBody from "./GameContainerBody";

const GameContainer = ({ loading, data, tags }) => {
  if (loading) {
    return <span>Loading...</span>;
  }

  const filteredGames = data.filter(x =>
    x.tags.some(tag => tags.includes(tag))
  );

  return (
    <div className="game-container">
      <GameContainerHeader tags={tags} gameCount={filteredGames.length} />
      <GameContainerBody data={filteredGames} tags={tags} />
    </div>
  );
};

export default GameContainer;
