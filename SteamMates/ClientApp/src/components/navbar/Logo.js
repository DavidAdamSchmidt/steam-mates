import React, { useContext } from "react";
import styled, { css } from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";
import UserContext from "../../contexts/UserContext";
import { BIG, MEDIUM } from "../../constants/style";

const Wrapper = styled.span`
  padding: 0 20px;
  font-weight: bold;
  font-style: italic;
  color: white;
  user-select: none;

  ${({ loggedIn }) =>
    loggedIn
      ? css`
          display: none;

          @media (${MEDIUM}) {
            display: block;
            font-size: 2.62vw;
          }

          @media (${BIG}) {
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
  const [width] = useWindowSize();

  return (
    <Wrapper loggedIn={user}>
      {!user && width < 480 ? "SM" : "SteamMates"}
    </Wrapper>
  );
};

export default Logo;
