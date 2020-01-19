import React from "react";

const SearchResult = ({ result, searchTerm }) => {
  const {
    friend: { personaName },
    startIndex
  } = result;
  const endIndex = startIndex + searchTerm.length;
  const firstChars = personaName.substring(0, startIndex);
  const matchedChars = personaName.substring(startIndex, endIndex);
  const lastChars = personaName.substring(endIndex);

  return (
    <p>
      {firstChars.length > 0 && <span>{firstChars}</span>}
      {matchedChars.length > 0 && <strong>{matchedChars}</strong>}
      {lastChars.length > 0 && <span>{lastChars}</span>}
    </p>
  );
};

export default SearchResult;
