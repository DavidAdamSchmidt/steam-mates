import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 0 8px 0;
  letter-spacing: 1.2px;
`;

const Row = styled.div`
  padding: 6px 0;
`;

const Name = styled.span`
  padding-right: 4px;
  font-weight: bold;
  color: #4b4b4b;
`;

const Value = styled.span`
  font-style: italic;
  color: #787878;
`;

const OfficialSite = styled.a`
  font-weight: bold;

  &:link,
  &:hover,
  &:focus,
  &:active,
  &:visited {
    color: #4b4b4b;
  }
`;

const ExtraInfo = ({ data }) => {
  return (
    <Container>
      {(data.releaseDate || {}).date && (
        <Row>
          <Name>Release Date:</Name>
          <Value>{data.releaseDate.date.substring(0, 10)}</Value>
        </Row>
      )}
      {data.supportedLanguages && (
        <Row>
          <Name>Languages:</Name>
          <Value
            dangerouslySetInnerHTML={{ __html: data.supportedLanguages }}
          />
        </Row>
      )}
      {data.controllerSupport && (
        <Row>
          <Name>Controller Support:</Name>
          <Value>{data.controllerSupport}</Value>
        </Row>
      )}
      {data.website && (
        <Row>
          <OfficialSite href={data.website}>Official Site</OfficialSite>
        </Row>
      )}
    </Container>
  );
};

export default ExtraInfo;
