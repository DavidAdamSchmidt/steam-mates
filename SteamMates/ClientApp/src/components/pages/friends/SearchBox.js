import React, { useState, useContext } from "react";
import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";
import SearchTermContext from "../../../contexts/SearchTermContext";
import SearchResultContainer from "./SearchResultContainer";
import { getMatchingFriends } from "../../../utils/friendSearchUtils";
import {
  PERSONA_NAME,
  REAL_NAME,
  STEAM_ID_64,
  VANITY_ID
} from "../../../constants/user";

const InputField = styled.input`
  box-sizing: border-box;
  box-shadow: 0 0 5px #9d9d9d;
  -moz-box-shadow: 0 0 5px #9d9d9d;
  -webkit-box-shadow: 0 0 5px #9d9d9d;
  border: none;
  border-radius: 25px;
  width: 100%;
  height: 45px;
  padding-left: 25px;
  font-size: 16px;
  color: gray;

  &:focus {
    outline: 0;
  }

  ::placeholder {
    font-style: italic;
    color: #bababa;
  }
`;

const SearchBox = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const { user } = useContext(UserContext);

  const onInputChange = e => {
    const searchTerm = e.target.value;

    setInput(searchTerm);
    setResults(() =>
      getMatchingFriends(user.friends, searchTerm.toLowerCase())
    );
  };

  return (
    <div>
      <InputField
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
