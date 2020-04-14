import React, { useContext, useState } from "react";
import styled from "styled-components";
import useWindowSize from "../../../hooks/useWindowSize";
import UserContext from "../../../contexts/UserContext";
import Header from "../../common/Header";
import SearchBox from "../../common/SearchBox";
import FriendRow from "./FriendRow";
import {
  getAllFriends,
  getMatchingFriends
} from "../../../utils/friendsUtils";
import { getElapsedTimeText } from "../../../utils/sharedUtils";
import tf2_party from "./../../../static/images/tf2_kazotsky_kick.png";
import { MEDIUM } from "../../../constants/style";
import {
  PERSONA_NAME,
  REAL_NAME,
  VANITY_ID,
  STEAM_ID_64
} from "../../../constants/user";

const Wrapper = styled.div`
  @media (${MEDIUM}) {
    margin-top: 100px;
  }
`;

const LatestUpdate = styled.p`
  font-size: 14px;
  font-style: italic;
  color: #a4a4a4;
`;

const Main = styled.div`
  padding: 20px;
`;

const FriendsTable = styled.div`
  margin: 25px 10px 0 10px;
`;

const FriendsPage = () => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useContext(UserContext);
  const [allFriends] = useState(getAllFriends(user.friends));
  const [width] = useWindowSize();

  const handleInputChange = newInput => {
    setInput(newInput);
    setResults(() => getMatchingFriends(user.friends, newInput.toLowerCase()));
  };

  return (
    <Wrapper>
      <Header title="Let's get this party started!" image={tf2_party}>
        <p>
          Welcome to the <em>friends</em> page! You can select up to 3 friends
          to compare your games with. When you are ready, go to the{" "}
          <em>games</em> menu to see which games you and your selected friends
          can play together.
        </p>
        <LatestUpdate>
          Friend list was updated {getElapsedTimeText(user.latestUpdate)}
        </LatestUpdate>
      </Header>
      <Main>
        <SearchBox
          placeholder={`Search friends${
            width > 620
              ? ` by ${PERSONA_NAME}, ${REAL_NAME}, ${VANITY_ID} or ${STEAM_ID_64}`
              : ""
          }...`}
          handleInputChange={handleInputChange}
        />
        <FriendsTable>
          {(input.length > 0 ? results : allFriends).map(result => (
            <FriendRow
              key={result.user.steamId}
              result={result}
              searchTerm={input}
            />
          ))}
        </FriendsTable>
      </Main>
    </Wrapper>
  );
};

export default FriendsPage;
