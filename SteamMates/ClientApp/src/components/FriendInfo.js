import React from "react";
import { getPropertyValue } from "../utils/friendSearchUtils";
import "./FriendInfo.css";

const FriendInfo = ({ match, user, searchTerm }) => {
  const propertyValue = getPropertyValue(user, match.type);

  if (match.startIndex === -1) {
    return (
      <span className="friend-info">
        <span>{match.type}: </span>
        <span>{propertyValue ? propertyValue : "N/A"}</span>
      </span>
    );
  }

  const endIndex = match.startIndex + searchTerm.length;
  const firstChars = propertyValue.substring(0, match.startIndex);
  const matchedChars = propertyValue.substring(match.startIndex, endIndex);
  const lastChars = propertyValue.substring(endIndex);

  return (
    <span className="friend-info">
      <span>{match.type}: </span>
      {firstChars.length > 0 && <span>{firstChars}</span>}
      {matchedChars.length > 0 && (
        <strong className="match">{matchedChars}</strong>
      )}
      {lastChars.length > 0 && <span>{lastChars}</span>}
    </span>
  );
};

export default FriendInfo;
