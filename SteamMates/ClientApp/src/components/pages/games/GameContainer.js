import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import TagContext from "../../../contexts/TagContext";
import GameContainerHeader from "./GameContainerHeader";
import GameContainerBody from "./GameContainerBody";
import { organizeByRatingCount } from "../../../utils/gamesInCommonUtils";
import { GAMES_IN_COMMON } from "../../../constants/routes";

const GameContainer = ({ data }) => {
  const history = useHistory();
  const { tags } = useContext(TagContext);

  const filteredGames = data.games.filter(x =>
    x.tags.some(tag => tags.includes(tag))
  );

  return (
    <div>
      <GameContainerHeader
        gameCount={filteredGames.length}
        latestUpdates={data.latestUpdates}
      />
      <GameContainerBody
        data={
          history.location.pathname === GAMES_IN_COMMON
            ? organizeByRatingCount(filteredGames)
            : filteredGames
        }
      />
      }
    </div>
  );
};

export default GameContainer;
