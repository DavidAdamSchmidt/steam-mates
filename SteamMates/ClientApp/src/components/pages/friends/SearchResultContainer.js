import React from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";

const Wrapper = styled.div`
  padding-top: 10px;
`;

const SearchResultContainer = ({ results }) => {
  return (
    <Wrapper>
      {results.map(result => (
        <SearchResult key={result.user.steamId} result={result} />
      ))}
    </Wrapper>
  );
};

export default SearchResultContainer;
