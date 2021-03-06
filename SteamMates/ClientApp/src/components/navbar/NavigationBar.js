import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import styled, { css, ThemeContext } from "styled-components";
import { useHistory } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import UserContext from "../../contexts/UserContext";
import FriendContext from "../../contexts/FriendContext";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import UserPanel from "./UserPanel";
import HamburgerMenu from "./HamburgerMenu";
import SimpleMenu from "./SimpleMenu";
import DropdownMenu from "./DropdownMenu";
import { PATH, ERROR, STEAM } from "../../constants";

const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 60px;
  background: rgb(7, 2, 6);

  @media (min-width: 915px) {
    height: 6.56vw;
  }

  ${({ theme }) => css`
    @media (${theme.queries.big}) {
      height: 70px;
    }
  `}
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  max-width: 1050px;
  height: 100%;

  ${props =>
    props.loggedIn &&
    css`
      @media (${props.theme.queries.medium}) {
        display: grid;
        grid-template-columns: auto repeat(3, 1fr) auto;
      }
    `}
`;

const TogglerWrapper = styled.div`
  margin-left: 8px;
`;

const Toggler = styled.img`
  height: 40px;
  vertical-align: bottom;

  &:hover {
    cursor: pointer;
  }
`;

const NavigationBar = () => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const { user, error } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const { sizes } = useContext(ThemeContext);
  const togglerRef = useRef();
  const hamburgerMenuRef = useRef();
  const history = useHistory();
  const [width] = useWindowSize();

  const handleClick = useCallback(e => {
    if (
      togglerRef.current &&
      hamburgerMenuRef.current &&
      !togglerRef.current.contains(e.target) &&
      !hamburgerMenuRef.current.contains(e.target)
    ) {
      setShowHamburgerMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [handleClick]);

  const entries = [
    { name: "Home", path: PATH.HOME, disabled: false },
    { name: "Friends", path: PATH.FRIENDS, disabled: false },
    {
      name: "My Games",
      path: PATH.GAMES_OF_USER,
      disabled: history.location.pathname === PATH.GAMES_OF_USER
    },
    {
      name: "Common",
      path: PATH.GAMES_IN_COMMON,
      disabled:
        friends.length === 0 ||
        history.location.pathname === PATH.GAMES_IN_COMMON
    },
    { name: "Random", path: PATH.RANDOM_GAME, disabled: false }
  ];

  if (!user) {
    return (
      <Wrapper>
        <Container loggedIn={false}>
          <Logo />
          {(error || {}).message !== ERROR.NETWORK_ERROR && <LoginButton />}
        </Container>
      </Wrapper>
    );
  }

  if (width < sizes.medium) {
    return (
      <Wrapper>
        <Container loggedIn={user}>
          <TogglerWrapper>
            <Toggler
              src={STEAM.HAMBURGER_ICON}
              alt="Toggler"
              ref={togglerRef}
              onClick={() => setShowHamburgerMenu(prevState => !prevState)}
            />
          </TogglerWrapper>
          <UserPanel />
        </Container>
        <span ref={hamburgerMenuRef}>
          {showHamburgerMenu && (
            <HamburgerMenu
              entries={entries}
              callback={() => setShowHamburgerMenu(false)}
            />
          )}
        </span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container loggedIn={user}>
        <Logo />
        <SimpleMenu name="Home" path={PATH.HOME} />
        <SimpleMenu name="Friends" path={PATH.FRIENDS} />
        <DropdownMenu name="Games" entries={entries.slice(2)} />
        <UserPanel />
      </Container>
    </Wrapper>
  );
};

export default NavigationBar;
