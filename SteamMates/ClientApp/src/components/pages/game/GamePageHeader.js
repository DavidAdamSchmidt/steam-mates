import React from "react";
import styled from "styled-components";
import library_hero_default from "../../../static/images/library_hero_default.png";
import { IMAGE_ROOT, STORE_PAGE } from "../../../constants/steam";

const Header = styled.div`
  position: relative;
  font-weight: bold;
`;

const Image = styled.img`
  width: 1050px;
`;

const Anchor = styled.a`
  text-decoration: none;
`;

const Title = styled.div`
  position: absolute;
  top: 0;
  margin: 30px;
  padding: 0 10px;
  background: rgba(0, 0, 0, 0.58);
  font-size: 52px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: white;
`;

const Creators = styled.div`
  position: absolute;
  bottom: 0;
  margin: 40px;
  padding: 5px 10px;
  background: rgba(0, 0, 0, 0.58);
  line-height: 30px;
  letter-spacing: 1.5px;
  color: white;
`;

const Button = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 40px;
  border-radius: 10px;
  padding: 5px 20px;
  background: linear-gradient(#b9ffbe, #13b413 40%);
  font-size: 36px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: white;

  &:hover {
    margin: 39px;
    padding: 6px 21px;
    background: linear-gradient(#c4ffc8, #13cd13 40%);
  }
`;

const GamePageHeader = ({ data }) => {
  return (
    <Header>
      <Image
        onError={e => (e.target.src = library_hero_default)}
        src={`${IMAGE_ROOT}/${data.steamId}/library_hero.jpg`}
        alt="LibraryHero"
      />
      <Anchor href={`${STORE_PAGE}/${data.steamId}`} target="_blank">
        <Title>{data.name}</Title>
      </Anchor>
      <Creators>
        {data.developers && (
          <div>
            Developer{data.developers.length > 1 && "s"}:{" "}
            {data.developers.join(", ")}
          </div>
        )}
        {data.publishers && (
          <div>
            Publisher{data.publishers.length > 1 && "s"}:{" "}
            {data.publishers.join(", ")}
          </div>
        )}
      </Creators>
      <Anchor href={`steam://run/${data.steamId}`}>
        <Button>▷ Play</Button>
      </Anchor>
    </Header>
  );
};

export default GamePageHeader;