import React from "react";
import play_video_button from "../../../static/images/play_video_button.png";
import styled, { css } from "styled-components";
import { MEDIUM, BIG } from "../../../constants/style";

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: calc(20% - 4px);
  height: 10.56vw;

  @media (${MEDIUM}) {
    height: 6.38vw;
  }

  @media (${BIG}) {
    height: 73px;
  }

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

  @media (${BIG}) {
    width: 40px;
    height: 40px;
  }
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
