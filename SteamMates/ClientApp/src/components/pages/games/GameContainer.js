import React, { useContext } from "react";
import TagContext from "../../../contexts/TagContext";
import { useHistory } from "react-router-dom";
import GameContainerHeader from "./GameContainerHeader";
import GameContainerBody from "./GameContainerBody";
import { getGameGroups } from "../../../utils/gamesInCommonUtils";
import { GAMES_IN_COMMON } from "../../../constants/routes";

const GameContainer = ({ data }) => {
  const history = useHistory();
  const { tags } = useContext(TagContext);

  const filteredGames = data.games.filter(x =>
    x.tags.some(tag => tags.includes(tag))
  );

  const gameGroups =
    history.location.pathname === GAMES_IN_COMMON
      ? getGameGroups(filteredGames)
      : null;

  return (
    <div>
      <GameContainerHeader
        gameCount={filteredGames.length}
        latestUpdates={data.latestUpdates}
      />
      {gameGroups &&
        gameGroups.map(x => (
          <GameContainerBody data={x.games} title={x.title} />
        ))}
      {!gameGroups && <GameContainerBody data={filteredGames} />}
    </div>
  );
};

export default GameContainer;
