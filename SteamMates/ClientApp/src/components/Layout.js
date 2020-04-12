import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 60px auto 0 auto;
  max-width: 1050px;
`;

const Layout = props => {
  return <Container>{props.children}</Container>;
};

export default Layout;
