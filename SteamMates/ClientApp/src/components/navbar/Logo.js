import React, { useContext } from "react";
import styled, { css, ThemeContext } from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";
import UserContext from "../../contexts/UserContext";

const Wrapper = styled.span`
  padding: 0 20px;
  font-weight: bold;
  font-style: italic;
  color: white;
  user-select: none;

  ${props =>
    props.loggedIn
      ? css`
          display: none;

          @media (${props.theme.queries.medium}) {
            display: block;
            font-size: 2.62vw;
          }

          @media (${props.theme.queries.big}) {
            font-size: 28px;
          }
        `
      : css`
          display: block;
          font-size: 28px;
        `}
`;

const Logo = () => {
  const { user } = useContext(UserContext);
  const { sizes } = useContext(ThemeContext);
  const [width] = useWindowSize();

  return (
    <Wrapper loggedIn={user}>
      {!user && width < sizes.small ? "SM" : "SteamMates"}
    </Wrapper>
  );
};

export default Logo;
