import React, { useContext } from "react";
import styled from "styled-components";
import FriendContext from "../../../contexts/FriendContext";
import FriendInfo from "./FriendInfo";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50px repeat(4, 1fr);
  padding: 10px;

  &:hover {
    background-color: rgba(198, 198, 198, 0.41);
    cursor: pointer;
  }
`;

const Avatar = styled.img`
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.5);
`;

const SearchResult = ({ result }) => {
  const { tryToAddFriend } = useContext(FriendContext);

  const handleClick = () => {
    tryToAddFriend(result.user);
  };

  return (
    <Wrapper onClick={handleClick}>
      <Avatar src={result.user.avatar} alt="Avatar" />
      {result.matches.map(match => (
        <FriendInfo key={match.type} match={match} user={result.user} />
      ))}
    </Wrapper>
  );
};

export default SearchResult;
