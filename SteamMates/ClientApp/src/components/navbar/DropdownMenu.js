import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Wrapper = styled.div``;

const Dropdown = styled.div`
  position: absolute;
  visibility: hidden;
  width: 192px;
  background: rgb(214, 218, 232);

  ${Wrapper}:hover & {
    visibility: visible;
  }
`;

const Entry = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  height: 44px;
  color: red;

  ${props =>
    props.disabled
      ? css`
          pointer-events: none;
        `
      : css`
          &:hover {
            background: darkgreen;
            cursor: pointer;
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
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <Wrapper onMouseEnter={() => setShowDropdown(true)}>
      <Menu text={name} />
      {showDropdown && (
        <Dropdown>
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
