import React from "react";
import styled, { css } from "styled-components";
import { getPropertyValue } from "../../../utils/friendsUtils";

export const ColumnKey = styled.span`
  font-size: 14px;
  color: #a4a4a4;
  padding-right: 5px;
  display: none;
  white-space: nowrap;

  @media (min-width: 420px) {
    display: inline;
  }
`;

export const ColumnValue = styled.span``;

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin-right: 26px;
  font-size: 14px;

  @media (min-width: 420px) {
    font-size: 16px;
  }

  @media (min-width: 648px) {
    flex-direction: column;
  }

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      flex-direction: row;
    }

    @media (${theme.queries.big}) {
      flex-direction: column;
      flex-basis: 50%;
      flex-grow: 0;
    }
  `}
`;

const Match = styled.span`
  font-weight: bold;
  background: orange;
  color: white;
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
