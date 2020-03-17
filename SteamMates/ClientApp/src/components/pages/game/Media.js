import React, { useState } from "react";
import styled, { css } from "styled-components";
import library_hero_default from "../../../static/images/library_hero_default.png";
import play_video_button from "../../../static/images/play_video_button.png";

const Container = styled.div`
  width: 600px;
`;

const Video = styled.video`
  width: 600px;
  height: 338px;
  outline: 0;
`;

const SelectorMenu = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 116px;
  height: 66px;

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
  width: 116px;
  height: 66px;
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

const Media = ({ data }) => {
  const [selected, setSelected] = useState(
    (data.movies || [{ webm: {} }])[0].webm.max
  );

  return (
    <Container>
      <div>
        <Video key={selected} controls autoPlay muted>
          <source src={selected} type="video/webm" />
        </Video>
      </div>
      <SelectorMenu>
        {(data.movies || []).map(movie => (
          <ThumbnailContainer
            key={movie.id}
            onClick={() => setSelected((movie.webm || {}).max)}
            selected={selected === (movie.webm || {}).max}
          >
            <Thumbnail
              src={movie.thumbnail}
              alt="Thumbnail"
              onError={e => (e.target.src = library_hero_default)}
            />
            <PlayButton src={play_video_button} />
          </ThumbnailContainer>
        ))}
      </SelectorMenu>
    </Container>
  );
};

export default Media;
