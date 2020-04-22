import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  calculateTitleFontSize,
  calculateCreatorsFontSize
} from "../../../utils/gameUtils";
import library_hero_default from "../../../static/images/library_hero_default.png";
import { IMAGE_ROOT, STORE_PAGE } from "../../../constants/steam";

const Header = styled.div`
  position: relative;
  overflow: hidden;
  height: 242px;
  font-weight: bold;

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      height: initial;
    }

    @media (${theme.queries.big}) {
      width: ${theme.containerWidth}px;
      height: 339px;
    }
  `}
`;

const Image = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  vertical-align: bottom;

  ${({ theme }) => css`
    width: ${theme.sizes.medium - theme.scrollbarWidth}px;

    @media (${theme.queries.medium}) {
      position: initial;
      transform: translateX(0);
      width: 100%;
    }
  `}
`;

const Anchor = styled.a`
  text-decoration: none;
`;

const TextWrapper = styled.div`
  ${({ fontSize }) =>
    css`
      font-size: ${fontSize}px;
    `}
`;

const Title = styled.div`
  position: absolute;
  top: 0;
  padding: 0 10px;
  background: rgba(0, 0, 0, 0.58);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      margin: 2.81vw;
      font-size: 1.3em;
    }

    @media (${theme.queries.big}) {
      margin: 30px;
      font-size: 1.8em;
    }
  `}

  ${({ originalFontSize }) =>
    originalFontSize < 31 &&
    css`
      font-size: 0.6em;

      @media (min-width: 360px) {
        font-size: 1em;
      }

      @media (min-width: 449px) {
        font-size: 1.2em;
      }

      @media (min-width: 930px) {
        font-size: 1.5em;
      }
    `}
`;

const Creators = styled.div`
  position: absolute;
  bottom: 0;
  padding: 5px 10px;
  background: rgba(0, 0, 0, 0.58);
  font-size: 1.2em;
  letter-spacing: 0.095em;
  color: white;

  & div:first-of-type {
    padding: 5px 0 8px 0;
  }

  & div:last-of-type {
    padding: 8px 0 5px 0;
  }

  ${({ theme }) => css`
    @media (${theme.queries.medium}) {
      margin: 2.81vw;
      font-size: 1.4em;
    }

    @media (${theme.queries.big}) {
      margin: 30px;
      font-size: 1.6em;
    }
  `}
`;

const Button = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: none;
  margin: 40px;
  border-radius: 10px;
  padding: 5px 20px;
  background: linear-gradient(#b9ffbe, #13b413 40%);
  font-size: 30px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: white;

  &:hover {
    background: linear-gradient(#c4ffc8, #13cd13 40%);
  }

  ${({ theme }) => css`
    @media (${theme.queries.big}) {
      display: initial;
    }
  `}
`;

const GamePageHeader = ({ id, name, developers, publishers, owned }) => {
  const [developersText] = useState((developers || []).join(", "));
  const [publishersText] = useState((publishers || []).join(", "));
  const [titleFontSize] = useState(calculateTitleFontSize(name.length));
  const [creatorsFontSize] = useState(
    calculateCreatorsFontSize(developersText.length, publishersText.length)
  );

  return (
    <Header>
      <Image
        onError={e => (e.target.src = library_hero_default)}
        src={`${IMAGE_ROOT}/${id}/library_hero.jpg`}
        alt="LibraryHero"
      />
      <Anchor
        href={`${STORE_PAGE}/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TextWrapper fontSize={titleFontSize}>
          <Title originalFontSize={titleFontSize}>{name}</Title>
        </TextWrapper>
      </Anchor>
      <TextWrapper fontSize={creatorsFontSize}>
        <Creators>
          {developers && (
            <div>
              Developer{developers.length > 1 && "s"}: {developersText}
            </div>
          )}
          {publishers && (
            <div>
              Publisher{publishers.length > 1 && "s"}: {publishersText}
            </div>
          )}
        </Creators>
      </TextWrapper>
      {owned && (
        <Anchor href={`steam://run/${id}`}>
          <Button>▷ Play</Button>
        </Anchor>
      )}
    </Header>
  );
};

export default GamePageHeader;
