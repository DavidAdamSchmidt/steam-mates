import React, { useContext } from "react";
import styled from "styled-components";
import SearchTermContext from "../../../contexts/SearchTermContext";
import { getPropertyValue } from "../../../utils/friendSearchUtils";

const Wrapper = styled.span`
  margin: 0 10px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const Property = styled.span`
  font-size: 14px;
  color: #a4a4a4;
`;

const Match = styled.span`
  font-weight: bold;
`;

const NoMatch = styled.span`
  color: #5b5b5b;
`;

const FriendInfo = ({ match, user }) => {
  const searchTerm = useContext(SearchTermContext);
  const propertyValue = getPropertyValue(user, match.type);

  if (match.startIndex === -1) {
    return (
      <Wrapper>
        <Property>{match.type}: </Property>
        <NoMatch>{propertyValue ? propertyValue : "N/A"}</NoMatch>
      </Wrapper>
    );
  }

  const endIndex = match.startIndex + searchTerm.length;
  const firstChars = propertyValue.substring(0, match.startIndex);
  const matchedChars = propertyValue.substring(match.startIndex, endIndex);
  const lastChars = propertyValue.substring(endIndex);

  return (
    <Wrapper>
      <Property>{match.type}: </Property>
      {firstChars.length > 0 && <NoMatch>{firstChars}</NoMatch>}
      {matchedChars.length > 0 && <Match>{matchedChars}</Match>}
      {lastChars.length > 0 && <NoMatch>{lastChars}</NoMatch>}
    </Wrapper>
  );
};

export default FriendInfo;
