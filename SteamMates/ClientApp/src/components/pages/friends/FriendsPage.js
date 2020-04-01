import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import SearchBox from "./SearchBox";
import FriendRow from "./FriendRow";
import { getElapsedTimeText } from "../../../utils/updateInfoUtils";
import {
  getAllFriends,
  getMatchingFriends
} from "../../../utils/friendSearchUtils";
import tf2_party from "./../../../static/images/tf2_kazotsky_kick.png";
import { BIG, MEDIUM, FRIENDS } from "../../../constants/style";
import { HOME } from "../../../constants/routes";

const Wrapper = styled.div`
  @media (${MEDIUM}) {
    padding: 40px 10px 0 10px;
  }
`;

const Header = styled.div`
  display: flex;
  padding: 0 20px;

  @media (${BIG}) {
    margin: 20px;
  }
`;

const TextBox = styled.div`
  display: none;
  line-height: 1.6;
  font-family: noticia, Georgia, Cambria, "Times New Roman", serif;

  @media (${FRIENDS.TIER_FIVE}) {
    display: block;
  }

  @media (${MEDIUM}) {
    padding-right: 30px;
  }
`;

const TextBoxMain = styled.h1`
  font-size: 24px;
  font-family: boxed, helvetica neue, Helvetica, Roboto, Arial, sans-serif;
  color: #0f0f0f;

  @media (${FRIENDS.TIER_TWO}) {
    font-size: 29px;
  }
`;

const LatestUpdate = styled.p`
  font-size: 14px;
  font-style: italic;
  color: #a4a4a4;
`;

const Image = styled.img`
  display: none;
  align-self: flex-end;

  @media (${MEDIUM}) {
    display: inline;
    width: 289px;
  }

  @media (${BIG}) {
    width: 400px;
  }
`;

const Main = styled.div`
  padding: 10px;
`;

const FriendsTable = styled.div`
  margin: 25px 10px 0 10px;
`;

const FriendsPage = () => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useContext(UserContext);
  const [allFriends] = useState(getAllFriends(user.friends));

  if (!user) {
    return <Redirect to={HOME} />;
  }

  const onInputChange = newInput => {
    setInput(newInput);
    setResults(() => getMatchingFriends(user.friends, newInput.toLowerCase()));
  };

  return (
    <Wrapper>
      <Header>
        <TextBox>
          <TextBoxMain>Let's get this party started!</TextBoxMain>
          <p>
            You can select up to 3 friends to compare your games with. When you
            are ready, go to the <em>games</em> menu to see which games you and
            your selected friends can play together.
          </p>
          <LatestUpdate>
            Friend list was updated {getElapsedTimeText(user.latestUpdate)}
          </LatestUpdate>
        </TextBox>
        <Image src={tf2_party} />
      </Header>
      <Main>
        <SearchBox input={input} onInputChange={onInputChange} />
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
