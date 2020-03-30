import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Dropdown = styled.div`
  position: absolute;
  visibility: hidden;
  background: rgb(214, 218, 232);

  ${Wrapper}:hover & {
    visibility: visible;
  }

  ${({ width }) =>
    css`
      width: ${width}px;
    `};
`;

const Entry = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  height: 44px;

  ${props =>
    props.disabled
      ? css`
          pointer-events: none;
        `
      : css`
          &:hover {
            background: darkgreen;
          }
        `}
`;

const Text = styled.div`
  ${props =>
    props.disabled
      ? css`
          color: #a5a5a5;
        `
      : css`
          color: #393939;
        `};

  ${Entry}:hover & {
    color: white;
  }
`;

const DropdownMenu = ({ name, entries }) => {
  const [dropdownWidth, setDropdownWidth] = useState();
  const [showDropdown, setShowDropdown] = useState(true);
  const wrapperRef = useRef();

  useEffect(() => {
    setDropdownWidth(wrapperRef.current.clientWidth);
  }, []);

  if (dropdownWidth !== (wrapperRef.current || {}).clientWidth) {
    setDropdownWidth(wrapperRef.current.clientWidth);
  }

  return (
    <Wrapper ref={wrapperRef} onMouseEnter={() => setShowDropdown(true)}>
      <Menu text={name} clickable={false} />
      {showDropdown && (
        <Dropdown width={dropdownWidth}>
          {entries &&
            entries.map((entry, index) => (
              <Entry
                disabled={entry.disabled}
                key={index}
                to={entry.path}
                onClick={() => setShowDropdown(entry.disabled)}
              >
                <Text disabled={entry.disabled}>{entry.name}</Text>
              </Entry>
            ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default DropdownMenu;
