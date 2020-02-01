import React, { useContext } from "react";
import TagContext from "../../../contexts/TagContext";
import GameContainerHeader from "./GameContainerHeader";
import GameContainerBody from "./GameContainerBody";

const GameContainer = ({ data }) => {
  const { tags } = useContext(TagContext);

  const filteredGames = data.games.filter(x =>
    x.tags.some(tag => tags.includes(tag))
  );

  return (
    <div className="game-container">
      <GameContainerHeader
        gameCount={filteredGames.length}
        latestUpdates={data.latestUpdates}
      />
      <GameContainerBody data={filteredGames} />
    </div>
  );
};

export default GameContainer;
