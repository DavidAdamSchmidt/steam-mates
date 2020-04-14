import React from "react";
import styled from "styled-components";
import { getPropertyValue } from "../../../utils/friendsUtils";
import { BIG, FRIENDS, MEDIUM } from "../../../constants/style";

export const ColumnKey = styled.span`
  font-size: 14px;
  color: #a4a4a4;
  padding-right: 5px;
  display: none;
  white-space: nowrap;

  @media (${FRIENDS.TIER_THREE}) {
    display: inline;
  }
`;

export const ColumnValue = styled.span``;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin-right: 26px;
  font-size: 14px;

  @media (${FRIENDS.TIER_THREE}) {
    font-size: 16px;
  }

  @media (${FRIENDS.TIER_ONE}) {
    flex-direction: column;
  }

  @media (${MEDIUM}) {
    flex-direction: row;
  }

  @media (${BIG}) {
    flex-direction: column;
    flex-basis: 50%;
    flex-grow: 0;
  }
`;

const Match = styled.span`
  font-weight: bold;
  color: red;
`;

const NoMatch = styled.span`
  font-weight: bold;
  color: #12343b;
`;

const FriendColumn = ({ match, user, searchTerm }) => {
  const propertyValue = getPropertyValue(user, match.type);

  if (match.startIndex === -1) {
    return (
      <Wrapper>
        <ColumnKey>{match.type}:</ColumnKey>
        <ColumnValue>
          <NoMatch>{propertyValue ? propertyValue : "N/A"}</NoMatch>
        </ColumnValue>
      </Wrapper>
    );
  }

  const endIndex = match.startIndex + searchTerm.length;
  const firstChars = propertyValue.substring(0, match.startIndex);
  const matchedChars = propertyValue.substring(match.startIndex, endIndex);
  const lastChars = propertyValue.substring(endIndex);

  return (
    <Wrapper>
      <ColumnKey>{match.type}:</ColumnKey>
      <ColumnValue>
        {firstChars.length > 0 && <NoMatch>{firstChars}</NoMatch>}
        {matchedChars.length > 0 && <Match>{matchedChars}</Match>}
        {lastChars.length > 0 && <NoMatch>{lastChars}</NoMatch>}
      </ColumnValue>
    </Wrapper>
  );
};

export default FriendColumn;
