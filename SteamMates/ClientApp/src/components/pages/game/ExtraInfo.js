import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 0 8px 0;
  font-size: 13px;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
`;

const Row = styled.div`
  padding: 6px 0;
`;

const Name = styled.span`
  padding-right: 4px;
  font-weight: bold;
`;

const Value = styled.span`
  font-style: italic;
  color: #4b4b4b;
`;

const OfficialSite = styled.a`
  font-weight: bold;

  &:link,
  &:hover,
  &:focus,
  &:active,
  &:visited {
    color: black;
  }
`;

const ExtraInfo = ({
  releaseDate,
  supportedLanguages,
  controllerSupport,
  website
}) => {
  return (
    <Container>
      {(releaseDate || {}).date && (
        <Row>
          <Name>Release Date:</Name>
          <Value>{releaseDate.date.substring(0, 10)}</Value>
        </Row>
      )}
      {supportedLanguages && (
        <Row>
          <Name>Languages:</Name>
          <Value dangerouslySetInnerHTML={{ __html: supportedLanguages }} />
        </Row>
      )}
      {controllerSupport && (
        <Row>
          <Name>Controller Support:</Name>
          <Value>{controllerSupport}</Value>
        </Row>
      )}
      {website && (
        <Row>
          <OfficialSite
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Official Site
          </OfficialSite>
        </Row>
      )}
    </Container>
  );
};

export default ExtraInfo;
