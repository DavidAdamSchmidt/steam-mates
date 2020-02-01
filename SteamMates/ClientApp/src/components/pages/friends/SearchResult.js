import React, { useContext } from "react";
import FriendContext from "../../../contexts/FriendContext";
import FriendInfo from "./FriendInfo";
import "../../../static/css/SearchResult.css";

const SearchResult = ({ result }) => {
  const { tryToAddFriend } = useContext(FriendContext);

  const handleClick = () => {
    tryToAddFriend(result.user);
  };

  return (
    <div className="search-result" onClick={handleClick}>
      <img className="avatar" src={result.user.avatar} alt="Avatar" />
      {result.matches.map(match => (
        <FriendInfo key={match.type} match={match} user={result.user} />
      ))}
    </div>
  );
};

export default SearchResult;
