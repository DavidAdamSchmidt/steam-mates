import React from "react";
import play_video_button from "../../../static/images/play_video_button.png";
import styled, { css } from "styled-components";

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: calc(20% - 4px);
  height: 10.56vw;

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      height: 6.38vw;
    }

    @media (${theme.queries.big}) {
      height: 73px;
    }
  `}

  ${({ selected }) =>
    selected
      ? css`
          border: solid dodgerblue 2px;
        `
      : css`
          border: solid white 2px;
        `};

  ${({ img }) =>
    css`
      background: url(${img}) center no-repeat;
      background-size: cover;
    `};

  cursor: pointer;
`;

const PlayButton = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.5vw;
  height: 3.5vw;
  cursor: pointer;

  ${({ theme }) => css`
    @media (${theme.queries.big}) {
      width: 40px;
      height: 40px;
    }
  `}
`;

const Thumbnail = ({
  thumbnail,
  areVideos,
  selected,
  setSelected,
  setSelectedIsVideo
}) => {
  const changeSelected = thumbnail => {
    areVideos
      ? setSelected((thumbnail.webm || {}).max)
      : setSelected(thumbnail.full);

    setSelectedIsVideo(areVideos);
  };

  return (
    <Container
      onClick={() => changeSelected(thumbnail)}
      selected={
        areVideos
          ? selected === (thumbnail.webm || {}).max
          : selected === thumbnail.full
      }
      img={thumbnail.thumbnail}
    >
      {areVideos && <PlayButton src={play_video_button} />}
    </Container>
  );
};

export default Thumbnail;
