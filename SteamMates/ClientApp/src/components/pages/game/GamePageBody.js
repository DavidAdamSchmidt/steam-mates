import React from "react";
import styled from "styled-components";
import ShortDescription from "./ShortDescription";
import Media from "./Media";
import ExtraInfo from "./ExtraInfo";
import UserInfo from "./UserInfo";
import DetailedDescription from "./DetailedDescription";
import SystemRequirements from "./SystemRequirements";
import SectionTitle from "./SectionTitle";
import { MEDIUM, BIG } from "../../../constants/style";

const Wrapper = styled.div`
  margin: 0 2.6vw;

  @media (${MEDIUM}) {
    margin: 0 20px;
  }

  @media (${BIG}) {
    margin: 0;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (${MEDIUM}) {
    display: grid;
    grid-template-columns: 56.37vw auto;
    grid-column-gap: 5vw;
    grid-auto-flow: column dense;
  }

  @media (${BIG}) {
    grid-template-columns: 640px auto;
    grid-column-gap: 65px;
  }
`;

const GameInfo = styled.span`
  width: calc(100vw - 2.6vw * 2 - var(--scrollbar-width));

  @media (${MEDIUM}) {
    width: 56.37vw;
  }

  @media (${BIG}) {
    width: 640px;
  }
`;

const GameInfoTitle = styled(SectionTitle)`
  @media (${MEDIUM}) {
    display: none;
  }
`;

const GamePageBody = ({ id, data, info }) => {
  return (
    <Wrapper>
      <ShortDescription description={data.shortDescription} />
      <Grid>
        <GameInfo>
          <GameInfoTitle>Game info</GameInfoTitle>
          <Media movies={data.movies} screenshots={data.screenshots} />
          <ExtraInfo
            releaseDate={data.releaseDate}
            supportedLanguages={data.supportedLanguages}
            controllerSupport={data.controllerSupport}
            website={data.website}
          />
        </GameInfo>
        <UserInfo id={id} info={info} />
      </Grid>
      <DetailedDescription description={data.detailedDescription} />
      <SystemRequirements
        pcRequirements={data.pcRequirements}
        macRequirements={data.macRequirements}
        linuxRequirements={data.linuxRequirements}
      />
    </Wrapper>
  );
};

export default GamePageBody;
