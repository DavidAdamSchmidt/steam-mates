import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import SectionTitle from "./SectionTitle";

const Container = styled.div`
  padding: 30px 0;
`;

const Description = styled.div`
  overflow: hidden;
  line-height: 1.6;

  ${({ collapse }) =>
  collapse &&
  css`
    max-height: 400px;
  `};

  & h1 {
    line-height: 1em;
  }
  
  & img {
    max-width: 100%;
  }
`;

const FadeContainer = styled.div`
  position: relative;
`;

const Fade = styled.div`
  position: absolute;
  top: -100px;
  width: 100%;
  height: 100px;
  background: linear-gradient(rgba(243, 243, 243, 0), #f3f3f3);
`;

const Collapsible = styled.div`
  display: inline-block;
  margin-top: 5px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 12px;
  font-family: "Arial Black", Gadget, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1.2px;

  &:hover {
    color: #969696;
  }

  ${({ overflown }) =>
    !overflown &&
    css`
      margin-top: 15px;
    `}
`;

const DetailedDescription = ({ description }) => {
  const [images, setImages] = useState(null);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [collapse, setCollapse] = useState(true);

  const ref = useRef();

  useEffect(() => {
    setImages(ref.current.querySelectorAll("img"));
  }, []);

  useEffect(() => {
    for (const image of images || []) {
      image.onload = () => setLoadedImagesCount(prevState => prevState + 1);
    }
  }, [images]);

  useEffect(() => {
    if (images !== null && loadedImagesCount === images.length) {
      const overflown = ref.current.offsetHeight < ref.current.scrollHeight;

      setCollapse(overflown);
      setHasOverflow(overflown);
    }
  }, [loadedImagesCount, images]);

  return (
    <Container>
      <SectionTitle>Detailed description</SectionTitle>
      <Description
        dangerouslySetInnerHTML={{ __html: description }}
        ref={ref}
        collapse={collapse}
      />
      {collapse && (
        <FadeContainer>
          <Fade />
        </FadeContainer>
      )}
      {hasOverflow && (
        <Collapsible
          overflown={collapse}
          onClick={() => setCollapse(prevState => !prevState)}
        >
          Show {collapse ? "more ▼" : "less ▲"}
        </Collapsible>
      )}
    </Container>
  );
};

export default DetailedDescription;
