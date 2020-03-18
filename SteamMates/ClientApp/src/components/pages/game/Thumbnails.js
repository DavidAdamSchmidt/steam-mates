import React from "react";
import library_hero_default from "../../../static/images/library_hero_default.png";
import play_video_button from "../../../static/images/play_video_button.png";
import styled, { css } from "styled-components";

const ThumbnailContainer = styled.div`
  position: relative;
  width: 124px;
  height: 69px;

  ${({ selected }) =>
    selected
      ? css`
          border: 2px solid dodgerblue;
          padding: 0;
        `
      : css`
          padding: 2px;
        `};
`;

const Thumbnail = styled.img`
  width: 124px;
  height: 69px;
  cursor: pointer;
`;

const PlayButton = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const Thumbnails = ({
  thumbnails,
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
    <>
      {thumbnails.map(thumbnail => (
        <ThumbnailContainer
          key={thumbnail.id}
          onClick={() => changeSelected(thumbnail)}
          selected={
            areVideos
              ? selected === (thumbnail.webm || {}).max
              : selected === thumbnail.full
          }
        >
          <Thumbnail
            src={thumbnail.thumbnail}
            alt="Thumbnail"
            onError={e => (e.target.src = library_hero_default)}
          />
          {areVideos && <PlayButton src={play_video_button} />}
        </ThumbnailContainer>
      ))}
    </>
  );
};

export default Thumbnails;
