import React, { useContext } from "react";
import SearchTermContext from "../../../contexts/SearchTermContext";
import { getPropertyValue } from "../../../utils/friendSearchUtils";
import "../../../static/css/FriendInfo.css";

const FriendInfo = ({ match, user }) => {
  const searchTerm = useContext(SearchTermContext);
  const propertyValue = getPropertyValue(user, match.type);
  const [container, propertyName, valueMatched, valueNotMatched] = [
    "friend-info",
    "property-name",
    "match",
    "no-match"
  ];

  if (match.startIndex === -1) {
    return (
      <span className={container}>
        <span className={propertyName}>{match.type}: </span>
        <span className={valueNotMatched}>
          {propertyValue ? propertyValue : "N/A"}
        </span>
      </span>
    );
  }

  const endIndex = match.startIndex + searchTerm.length;
  const firstChars = propertyValue.substring(0, match.startIndex);
  const matchedChars = propertyValue.substring(match.startIndex, endIndex);
  const lastChars = propertyValue.substring(endIndex);

  return (
    <span className={container}>
      <span className={propertyName}>{match.type}: </span>
      {firstChars.length > 0 && (
        <span className={valueNotMatched}>{firstChars}</span>
      )}
      {matchedChars.length > 0 && (
        <span className={valueMatched}>{matchedChars}</span>
      )}
      {lastChars.length > 0 && (
        <span className={valueNotMatched}>{lastChars}</span>
      )}
    </span>
  );
};

export default FriendInfo;
