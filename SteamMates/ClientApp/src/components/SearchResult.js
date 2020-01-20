import React from "react";
import FriendInfo from "./FriendInfo";

const SearchResult = ({ result, searchTerm }) => {
  return (
    <div>
      {result.matches.map(match => (
        <FriendInfo
          key={match.type}
          match={match}
          user={result.user}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
};

export default SearchResult;
