import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: ${({ display }) => display};
  overflow: hidden;
  margin-top: 20px;
`;

const Panel = styled.div`
  border-radius: 4px;
  width: 100%;
  height: 200px;
  background: #dedede;
`;

const AdvancedOptions = ({ show }) => {
  return (
    <Wrapper display={show ? "block" : "none"}>
      <Panel />
    </Wrapper>
  );
};

export default AdvancedOptions;
