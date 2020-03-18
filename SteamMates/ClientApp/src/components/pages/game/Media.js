import React, { useState } from "react";
import styled from "styled-components";
import Thumbnails from "./Thumbnails";

const Container = styled.div`
  width: 100%;
`;

const Video = styled.video`
  width: 100%;
  height: 338px;
  outline: 0;
`;

const Screenshot = styled.img`
  width: 100%;
  height: 338px;
  cursor: pointer;
`;

const SelectorMenu = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
`;

const Media = ({ data }) => {
  const [selected, setSelected] = useState(
    ((data.movies || [{}])[0].webm || {}).max ||
      (data.screenshots || [])[0].full
  );
  const [selectedIsVideo, setSelectedIsVideo] = useState(
    ((data.movies || [{}])[0].webm || {}).max !== undefined
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
          thumbnails={data.movies || []}
          areVideos={true}
          selected={selected}
          setSelected={setSelected}
          setSelectedIsVideo={setSelectedIsVideo}
        />
        <Thumbnails
          thumbnails={data.screenshots || []}
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
