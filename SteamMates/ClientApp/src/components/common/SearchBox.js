import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 60px auto 60px;
  align-items: center;
  margin-top: 40px;
  box-shadow: 0 0 5px #9d9d9d;
  -moz-box-shadow: 0 0 5px #9d9d9d;
  -webkit-box-shadow: 0 0 5px #9d9d9d;
  box-sizing: border-box;
  border-radius: 25px;
  width: 100%;
  min-width: 244px;
  height: 35px;
  background: white;

  ${({ theme }) => css`
    @media (${theme.queries.extraSmall}) {
      margin: 0;
    }

    @media (${theme.queries.small}) {
      height: 40px;
    }
  `}
`;

const SearchIcon = styled.div`
  justify-self: center;
`;

const CogIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  width: 100%;
  height: 100%;
  background: #393f4d;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

const InputField = styled.input`
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: gray;

  &:focus {
    outline: 0;
  }

  ::placeholder {
    font-style: italic;
    color: #bababa;
  }
`;

const SearchBox = ({ placeholder, handleInputChange, handleSettingsClick }) => {
  return (
    <Wrapper>
      <SearchIcon>
        <FontAwesomeIcon
          size="lg"
          style={{ color: "silver" }}
          icon={faSearch}
        />
      </SearchIcon>
      <InputField
        type="text"
        placeholder={placeholder}
        onChange={e => handleInputChange(e.target.value)}
      />
      {handleSettingsClick && (
        <CogIcon onClick={handleSettingsClick}>
          <FontAwesomeIcon size="lg" style={{ color: "silver" }} icon={faCog} />
        </CogIcon>
      )}
    </Wrapper>
  );
};

export default SearchBox;
