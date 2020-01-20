import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import SearchResult from "./SearchResult";
import { getMatchingFriends } from "../utils/friendSearchUtils";

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
    <div>
      <h2>Search for a friend</h2>
      <input
        type="text"
        placeholder="Type here..."
        value={input}
        onChange={onInputChange}
      />
      {results &&
        results.map(result => (
          <SearchResult
            key={result.user.steamId}
            result={result}
            searchTerm={input}
          />
        ))}
    </div>
  );
};

export default SearchBox;
