import React from "react";
import "./../static/css/SearchResultContainer.css";
import SearchResult from "./SearchResult";

const SearchResultContainer = ({ results }) => {
  return (
    <div className="search-result-container">
      {results.map(result => (
        <SearchResult key={result.user.steamId} result={result} />
      ))}
    </div>
  );
};

export default SearchResultContainer;
