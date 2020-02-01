import React from "react";
import SearchResult from "./SearchResult";
import "../../../static/css/SearchResultContainer.css";

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
