import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

const FriendsTable = () => {
  const { user } = useContext(UserContext);

  return user && user.friends ? (
    <table>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {user.friends.map(friend => (
          <tr key={friend.steamId}>
            <td><img src={friend.avatar} alt="Avatar" /></td>
            <td>{friend.personaName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;
};

export default FriendsTable;
