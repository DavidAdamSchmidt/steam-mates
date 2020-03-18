import React, { useState } from "react";
import styled from "styled-components";
import Thumbnails from "./Thumbnails";

const Container = styled.div`
  width: 100%;
`;

const Video = styled.video`
  width: 100%;
  height: 360px;
  outline: 0;
`;

const Screenshot = styled.img`
  width: 100%;
  height: 360px;
  cursor: pointer;
`;

const SelectorMenu = styled.div`
  display: flex;
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
      <div>
        {selectedIsVideo && (
          <Video key={selected} controls autoPlay muted>
            <source src={selected} type="video/webm" />
          </Video>
        )}
        {!selectedIsVideo && (
          <a href={selected} target="_blank" rel="noopener noreferrer">
            <Screenshot src={selected} alt="Screenshot" />
          </a>
        )}
      </div>
      <SelectorMenu>
        <Thumbnails
          thumbnails={movies || []}
          areVideos={true}
          selected={selected}
          setSelected={setSelected}
          setSelectedIsVideo={setSelectedIsVideo}
        />
        <Thumbnails
          thumbnails={screenshots || []}
          areVideos={false}
          selected={selected}
          setSelected={setSelected}
          setSelectedIsVideo={setSelectedIsVideo}
        />
      </SelectorMenu>
    </Container>
  );
};

export default Media;
