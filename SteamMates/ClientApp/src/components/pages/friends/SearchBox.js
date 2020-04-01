import React from "react";
import styled from "styled-components";
import useWindowSize from "../../../hooks/useWindowSize";
import {
  PERSONA_NAME,
  REAL_NAME,
  STEAM_ID_64,
  VANITY_ID
} from "../../../constants/user";
import { FRIENDS } from "../../../constants/style";

const InputField = styled.input`
  margin-top: 40px;
  box-shadow: 0 0 5px #9d9d9d;
  -moz-box-shadow: 0 0 5px #9d9d9d;
  -webkit-box-shadow: 0 0 5px #9d9d9d;
  box-sizing: border-box;
  border: none;
  border-radius: 25px;
  width: 100%;
  min-width: 244px;
  height: 35px;
  padding-left: 25px;
  font-size: 16px;
  color: gray;

  &:focus {
    outline: 0;
  }

  ::placeholder {
    font-style: italic;
    color: #bababa;
  }

  @media (${FRIENDS.TIER_FIVE}) {
    margin: 0;
  }

  @media (${FRIENDS.TIER_TWO}) {
    height: 40px;
  }
`;

const SearchBox = ({ input, onInputChange }) => {
  const [width] = useWindowSize();

  return (
    <InputField
      type="text"
      placeholder={`Search friends${
        width > 620
          ? ` by ${PERSONA_NAME}, ${REAL_NAME}, ${VANITY_ID} or ${STEAM_ID_64}`
          : ""
      }...`}
      value={input}
      onChange={e => onInputChange(e.target.value)}
    />
  );
};

export default SearchBox;
