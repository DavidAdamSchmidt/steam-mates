import React from "react";
import FriendInfo from "./FriendInfo";
import "../static/css/SearchResult.css";

const SearchResult = ({ result }) => {
  return (
    <div className="search-result">
      <img className="avatar" src={result.user.avatar} alt="Avatar" />
      {result.matches.map(match => (
        <FriendInfo key={match.type} match={match} user={result.user} />
      ))}
    </div>
  );
};

export default SearchResult;
