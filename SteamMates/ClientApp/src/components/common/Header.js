import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding: 0 20px;
  justify-content: space-between;

  ${({ theme }) => css`
    @media (${theme.queries.big}) {
      margin: 20px;
    }
  `}
`;

const TextBox = styled.div`
  display: none;
  line-height: 1.6;
  font-family: noticia, Georgia, Cambria, "Times New Roman", serif;

  ${({ theme }) => css`
    @media (${theme.queries.extraSmall}) {
      display: block;
    }

    @media (${theme.queries.medium}) {
      padding-right: 30px;
    }
  `}
`;

const TextBoxMain = styled.h1`
  font-size: 24px;
  font-family: boxed, helvetica neue, Helvetica, Roboto, Arial, sans-serif;
  color: #0f0f0f;

  ${({ theme }) => css`
    @media (${theme.queries.small}) {
      font-size: 29px;
    }
  `}
`;

const Image = styled.img`
  display: none;
  align-self: flex-end;

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      display: inline;
      max-width: 289px;
      max-height: 252px;
    }

    @media (${theme.queries.big}) {
      max-width: 400px;
      max-height: 350px;
    }
  `}
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
