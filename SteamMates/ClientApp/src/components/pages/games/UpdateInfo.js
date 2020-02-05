import React from "react";
import styled from "styled-components";
import { getElapsedTimeText } from "../../../utils/updateInfoUtils";

const Wrapper = styled.span`
  margin: 0 10px;
  font-size: 14px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const UpdateInfoValue = styled.span`
  font-style: italic;
`;

const UpdateInfo = ({ updateInfo }) => {
  return (
    <Wrapper>
      <span>{updateInfo.name}:</span>
      <UpdateInfoValue>
        {getElapsedTimeText(updateInfo.latestUpdate)}
      </UpdateInfoValue>
    </Wrapper>
  );
};

export default UpdateInfo;
