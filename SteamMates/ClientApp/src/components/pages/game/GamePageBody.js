import React from "react";
import styled, { css } from "styled-components";
import ShortDescription from "./ShortDescription";
import Media from "./Media";
import ExtraInfo from "./ExtraInfo";
import UserInfo from "./UserInfo";
import DetailedDescription from "./DetailedDescription";
import SystemRequirements from "./SystemRequirements";
import SectionTitle from "./SectionTitle";

const Wrapper = styled.div`
  margin: 0 2.6vw;

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      margin: 0 20px;
    }

    @media (${theme.queries.big}) {
      margin: 0;
    }
  `}
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      display: grid;
      grid-template-columns: 56.37vw auto;
      grid-column-gap: 5vw;
      grid-auto-flow: column dense;
    }

    @media (${theme.queries.big}) {
      grid-template-columns: 640px auto;
      grid-column-gap: 65px;
    }
  `}
`;

const GameInfo = styled.span`
  ${({ theme }) => css`
    width: calc(100vw - 2.6vw * 2 - ${theme.scrollbarWidth}px);

    @media (${theme.queries.medium}) {
      width: 56.37vw;
    }

    @media (${theme.queries.big}) {
      width: 640px;
    }
  `}
`;

const GameInfoTitle = styled(SectionTitle)`
  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      display: none;
    }
  `}
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
