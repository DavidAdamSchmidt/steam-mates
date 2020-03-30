import React from "react";
import styled from "styled-components";
import SimpleMenu from "./SimpleMenu";
import LogoutButton from "./LogoutButton";
import Menu from "./Menu";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 44px);
  background: rgb(214, 218, 232);
`;

const HamburgerMenu = ({ entries, callback }) => {
  return (
    <Wrapper>
      {entries.map(entry => (
        <SimpleMenu
          key={entry.name}
          name={entry.name}
          path={entry.path}
          disabled={entry.disabled}
          callback={callback}
        />
      ))}
      <LogoutButton>
        <Menu text={"Logout"} clickable={true} />
      </LogoutButton>
    </Wrapper>
  );
};

export default HamburgerMenu;
