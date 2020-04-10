import React from "react";
import styled from "styled-components";
import { BIG, FRIENDS, MEDIUM } from "../../constants/style";

const Wrapper = styled.div`
  display: flex;
  padding: 0 20px;
  justify-content: space-between;

  @media (${BIG}) {
    margin: 20px;
  }
`;

const TextBox = styled.div`
  display: none;
  line-height: 1.6;
  font-family: noticia, Georgia, Cambria, "Times New Roman", serif;

  @media (${FRIENDS.TIER_FIVE}) {
    display: block;
  }

  @media (${MEDIUM}) {
    padding-right: 30px;
  }
`;

const TextBoxMain = styled.h1`
  font-size: 24px;
  font-family: boxed, helvetica neue, Helvetica, Roboto, Arial, sans-serif;
  color: #0f0f0f;

  @media (${FRIENDS.TIER_TWO}) {
    font-size: 29px;
  }
`;

const Image = styled.img`
  display: none;
  align-self: flex-end;

  @media (${MEDIUM}) {
    display: inline;
    max-width: 289px;
    max-height: 252px;
  }

  @media (${BIG}) {
    max-width: 400px;
    max-height: 350px;
  }
`;

const Header = ({ title, children, image }) => {
  return (
    <Wrapper>
      <TextBox>
        <TextBoxMain>{title}</TextBoxMain>
        {children}
      </TextBox>
      <Image src={image} />
    </Wrapper>
  );
};

export default Header;
