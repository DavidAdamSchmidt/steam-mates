import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import SearchResult from "./SearchResult";
import { getMatchingFriends } from "../utils";

const SearchBox = () => {
  const [input, setInput] = useState("");
  const {
    user: { friends }
  } = useContext(UserContext);
  const [matches, setMatches] = useState([]);

  const onInputChange = e => {
    const searchTerm = e.target.value;

    setInput(searchTerm);
    setMatches(() => getMatchingFriends(friends, searchTerm.toLowerCase()));
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
      {matches &&
        matches.map(match => (
          <SearchResult key={match.friend.steamId} result={match} searchTerm={input} />
        ))}
    </div>
  );
};

export default SearchBox;
