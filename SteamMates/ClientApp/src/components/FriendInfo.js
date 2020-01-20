import React from "react";
import { getPropertyValue } from "./../utils";
import "./FriendInfo.css";

const FriendInfo = ({ match, user, searchTerm }) => {
  const property = getPropertyValue(user, match.type);

  if (match.startIndex === -1) {
    return (
      <span className="friend-info">
        <span>{match.type.value}: </span>
        <span>{property ? property : "N/A"}</span>
      </span>
    );
  }

  const endIndex = match.startIndex + searchTerm.length;
  const firstChars = property.substring(0, match.startIndex);
  const matchedChars = property.substring(match.startIndex, endIndex);
  const lastChars = property.substring(endIndex);

  return (
    <span className="friend-info">
      <span>{match.type.value}: </span>
      {firstChars.length > 0 && <span>{firstChars}</span>}
      {matchedChars.length > 0 && <strong className="match">{matchedChars}</strong>}
      {lastChars.length > 0 && <span>{lastChars}</span>}
    </span>
  );
};

export default FriendInfo;
