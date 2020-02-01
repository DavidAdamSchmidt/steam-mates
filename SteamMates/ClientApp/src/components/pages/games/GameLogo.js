import React from "react";
import { LOGO_URL } from "../../../constants/steam";

const GameLogo = ({ game }) => {
  return (
    <div className="game-logo">
      <img
        src={`${LOGO_URL}/${game.appId}/${game.imgLogoUrl}.jpg`}
        alt="GameLogo"
      />
    </div>
  );
};

export default GameLogo;
