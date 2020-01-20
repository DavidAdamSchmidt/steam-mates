import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import SearchTermContext from "../contexts/SearchTermContext";
import SearchResultContainer from "./SearchResultContainer";
import { getMatchingFriends } from "../utils/friendSearchUtils";
import {
  PERSONA_NAME,
  REAL_NAME,
  STEAM_ID_64,
  VANITY_ID
} from "../constants/user";
import "../static/css/SearchBox.css";

const SearchBox = () => {
  const [input, setInput] = useState("");
  const {
    user: { friends }
  } = useContext(UserContext);
  const [results, setResults] = useState([]);

  const onInputChange = e => {
    const searchTerm = e.target.value;

    setInput(searchTerm);
    setResults(() => getMatchingFriends(friends, searchTerm.toLowerCase()));
  };

  return (
    <div className="search-box">
      <input
        className="search-field"
        type="text"
        placeholder={`Search friends by ${PERSONA_NAME}, ${REAL_NAME}, ${VANITY_ID} or ${STEAM_ID_64}...`}
        value={input}
        onChange={onInputChange}
      />
      {results && (
        <SearchTermContext.Provider value={input}>
          <SearchResultContainer results={results} />
        </SearchTermContext.Provider>
      )}
    </div>
  );
};

export default SearchBox;
