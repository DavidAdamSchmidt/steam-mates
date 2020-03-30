import React, { useContext } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import SearchBox from "./SearchBox";
import { getElapsedTimeText } from "../../../utils/updateInfoUtils";
import tf2_party from "./../../../static/images/tf2_kazotsky_kick.png";
import { HOME } from "../../../constants/routes";

const Wrapper = styled.div`
  margin-top: -20px;
  box-sizing: border-box;
  padding: 0 40px;
`;

const Header = styled.div`
  display: flex;
  padding: 20px;
`;

const TextBox = styled.div`
  padding-right: 30px;
  line-height: 1.6;
  font-family: noticia, Georgia, Cambria, "Times New Roman", serif;
`;

const LatestUpdate = styled.p`
  font-size: 14px;
  font-style: italic;
  color: #a4a4a4;
`;

const Image = styled.img`
  align-self: flex-end;
  height: 245.5px;
`;

const TextBoxMain = styled.h1`
  margin-bottom: 30px;
  font-size: 29px;
  font-family: boxed, helvetica neue, Helvetica, Roboto, Arial, sans-serif;
  color: #0f0f0f;
`;

const FriendsPage = () => {
  const { user } = useContext(UserContext);

  if (user == null) {
    return <Redirect to={HOME} />;
  }

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
      <SearchBox />
    </Wrapper>
  );
};

export default FriendsPage;
