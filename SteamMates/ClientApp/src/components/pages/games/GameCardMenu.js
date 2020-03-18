import React, { useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GAMES } from "../../../constants/routes";

const Container = styled.div`
  position: absolute;
  z-index: 1;
  top: 8%;
  left: 89%;
  border: 1px solid black;
  width: 72px;
  padding: 4px 0;
  background: rgba(57, 92, 100, 0.8);
`;

const Option = styled.div`
  padding: 4px 10px;
  color: white;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

const PlayGameLink = styled.a`
  text-decoration: none;
`;

const GameDetailsLink = styled(Link)`
  text-decoration: none;
`;

const GameCardMenu = ({ id, closeMenu }) => {
  const menu = useRef();

  const handleClick = useCallback(
    e => {
      if (!menu.current.contains(e.target)) {
        closeMenu();
      }
    },
    [closeMenu]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [handleClick]);

  return (
    <Container ref={menu}>
      <PlayGameLink href={`steam://run/${id}`}>
        <Option>Play</Option>
      </PlayGameLink>
      <GameDetailsLink to={`${GAMES}/${id}`}>
        <Option>Details</Option>
      </GameDetailsLink>
    </Container>
  );
};

export default GameCardMenu;
