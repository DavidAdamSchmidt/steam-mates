import React from "react";

const SearchResult = ({ result, searchTerm }) => {
  return (
    <p>
      {Array.from(result.friend.personaName).map((char, index) =>
        index >= result.startIndex &&
        index < result.startIndex + searchTerm.length ? (
          <strong>{char}</strong>
        ) : (
          <>{char}</>
        )
      )}
    </p>
  );
};

export default SearchResult;
