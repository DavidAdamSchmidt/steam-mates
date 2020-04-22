import React, { useState } from "react";
import styled, { css } from "styled-components";
import Thumbnail from "./Thumbnail";

const Container = styled.div`
  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      padding-top: 0;
    }
  `}
`;

const Selected = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;

  ${({ theme }) => css`
    height: calc((360 / 640) * (100vw - 2.6vw * 2 - ${theme.scrollbarWidth}px));

    @media (${theme.queries.medium}) {
      height: calc((360 / 640) * 56.37vw);
    }

    @media (${theme.queries.big}) {
      height: 360px;
    }
  `}
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  outline: 0;
`;

const Screenshot = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
`;

const SelectorMenu = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
`;

const Media = ({ movies, screenshots }) => {
  const [selected, setSelected] = useState(
    ((movies || [{}])[0].webm || {}).max || (screenshots || [])[0].full
  );
  const [selectedIsVideo, setSelectedIsVideo] = useState(
    ((movies || [{}])[0].webm || {}).max !== undefined
  );

  return (
    <Container>
      {selectedIsVideo && (
        <Selected>
          <Video key={selected} controls autoPlay muted>
            <source src={selected} type="video/webm" />
          </Video>
        </Selected>
      )}
      {!selectedIsVideo && (
        <a href={selected} target="_blank" rel="noopener noreferrer">
          <Selected>
            <Screenshot src={selected} alt="Screenshot" />
          </Selected>
        </a>
      )}
      <SelectorMenu>
        {[movies || [], screenshots || []].map((array, index) =>
          array.map(thumbnail => (
            <Thumbnail
              key={thumbnail.id}
              thumbnail={thumbnail}
              areVideos={!index}
              selected={selected}
              setSelected={setSelected}
              setSelectedIsVideo={setSelectedIsVideo}
            />
          ))
        )}
      </SelectorMenu>
    </Container>
  );
};

export default Media;
