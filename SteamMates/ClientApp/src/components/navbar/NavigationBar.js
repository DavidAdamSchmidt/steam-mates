import React, { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import Logo from "./Logo";
import Menu from "./Menu";
import UserPanel from "./UserPanel";
import LoginPanel from "./LoginPanel";

const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 70px;
  background: linear-gradient(12deg, rgb(7, 2, 6), rgb(21, 1, 66) 91.71%);
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 192px repeat(3, 1fr) 1.3fr;
  margin: auto;
  max-width: 1050px;
  height: 100%;
  padding: 0 15px;
`;

const NavigationBar = () => {
  const { user } = useContext(UserContext);
  const menus = ["Home", "Friends", "Games"];

  return (
    <Wrapper>
      <Container>
        <Logo />
        {user ? (
          <>
            {menus.map((menu, index) => (
              <Menu key={index} name={menu} />
            ))}
            <UserPanel />
          </>
        ) : (
          <LoginPanel />
        )}
      </Container>
    </Wrapper>
  );
};

export default NavigationBar;
