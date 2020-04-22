import React, { useContext } from "react";
import styled, { css } from "styled-components";
import FriendContext from "../../../contexts/FriendContext";
import FriendColumn, { ColumnKey, ColumnValue } from "./FriendColumn";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 14px;
  border-radius: 4px;
  min-width: 224px;
  padding: 10px 0;
  background: rgba(198, 198, 198, 0.24);

  &:hover {
    background: rgba(198, 198, 198, 0.61);
    cursor: pointer;

    & ${ColumnKey} {
      color: #7b7b7b;
    }

    & ${ColumnValue} span {
      color: black;
    }
  }

  ${({ theme }) => css`
    @media (${theme.queries.extraSmall}) {
      display: grid;
      grid-template-columns: auto 1fr;
    }
  `}
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  padding: 0 20px;

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      width: 40px;
    }
  `}
`;

const Avatar = styled.img`
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  width: 100%;
`;

const FriendDetails = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 648px) {
    flex-direction: row;
  }
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  flex-grow: 0;

  & ${ColumnValue} {
    display: none;

    @media (min-width: 326px) {
      display: inline;
    }
  }

  &:first-of-type :first-child ${ColumnValue} {
    display: inline;
    padding: 0 0 10px 20px;

    ${({ theme }) => css`
      @media (${theme.queries.extraSmall}) {
        padding: 0;
      }
    `}
  }

  @media (min-width: 648px) {
    flex-direction: column;

    &:first-of-type ${ColumnKey} {
      min-width: 77px;
    }

    &:nth-of-type(2) ${ColumnKey} {
      min-width: 100px;
    }
  }

  ${({ theme }) => css`
    @media (${theme.queries.big}) {
      flex-direction: row;
    }
  `}
`;

const FriendRow = ({ result, searchTerm }) => {
  const { tryToAddFriend } = useContext(FriendContext);

  const handleClick = () => {
    tryToAddFriend(result.user);
  };

  return (
    <Wrapper onClick={handleClick}>
      <AvatarContainer>
        <Avatar src={result.user.avatarFull} alt="Avatar" />
      </AvatarContainer>
      <FriendDetails>
        {createColumn(result, 0, 2, searchTerm)}
        {createColumn(result, 2, 4, searchTerm)}
      </FriendDetails>
    </Wrapper>
  );
};

const createColumn = (result, start, end, searchTerm) => {
  return (
    <ColumnWrapper>
      {result.matches.slice(start, end).map(match => (
        <FriendColumn
          key={match.type}
          match={match}
          user={result.user}
          searchTerm={searchTerm}
        />
      ))}
    </ColumnWrapper>
  );
};

export default FriendRow;
