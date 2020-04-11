import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import SearchBox from "../../common/SearchBox";
import AdvancedOptions from "./AdvancedOptions";
import AmountOfRatings from "./AmountOfRatings";
import GameCard from "./GameCard";
import LoadingIndicator from "../../common/LoadingIndicator";
import { getMatchingGames } from "../../../utils/gameSearchUtils";
import { copyData } from "../../../utils/sharedUtils";
import { FRIENDS } from "../../../constants/style";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 25px;
  height: 75px;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 80px;
`;

const SearchBoxWrapper = styled.div`
  padding: 20px;
  width: 100%;
`;

const CogIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: none;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  width: 60px;
  height: 35px;
  background: #1e5b62;
  user-select: none;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: calc(284px + 17px)) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (${FRIENDS.TIER_TWO}) {
    height: 40px;
  }
`;

const pageSize = 32;

const GameContainer = ({ data }) => {
  const increaseAmount = () => {
    setIsLoading(false);
    setAmount(prevState => prevState + pageSize);
  };

  const [games, setGames] = useState(data);
  const [amount, setAmount] = useState(pageSize);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isLoading, setIsLoading] = useInfiniteScroll(
    amount < games.length,
    useCallback(increaseAmount, [])
  );

  const inputRef = useRef("");

  useEffect(() => {
    setAmount(pageSize);
  }, [games]);

  const filterGames = input => {
    const matchingGames = getMatchingGames(copyData(data), input.toLowerCase());

    if (matchingGames.length > 0) {
      matchingGames[0].title = `Results (${matchingGames.length})`;
    }

    return matchingGames;
  };

  const onInputChange = newInput => {
    if (newInput.length > 2) {
      setGames(filterGames(newInput));
    } else if (inputRef.current.length > 2) {
      setGames(copyData(data));
    }

    inputRef.current = newInput;
  };

  const adjustAmount = titleIndex => {
    if (titleIndex > currentTitleIndex) {
      setCurrentTitleIndex(titleIndex);
      setAmount(prevState => prevState + (titleIndex % 4));
    }
  };

  return (
    <Wrapper>
      <SearchBoxWrapper>
        <SearchBox
          onInputChange={onInputChange}
          placeholder={"Search games..."}
        />
        <CogIcon
          onClick={() => setShowAdvancedOptions(prevState => !prevState)}
        >
          <FontAwesomeIcon size="lg" style={{ color: "white" }} icon={faCog} />
        </CogIcon>
        <AdvancedOptions show={showAdvancedOptions} />
      </SearchBoxWrapper>
      {games.slice(0, amount).map((info, index) => (
        <Fragment key={info.game.appId}>
          {info.title && (!index || inputRef.current.length < 3) && (
            <AmountOfRatings text={info.title} />
          )}
          {info.title && adjustAmount(index)}
          <GameCard info={info} />
        </Fragment>
      ))}
      {amount < games.length && (
        <SpinnerWrapper>{isLoading && <LoadingIndicator />}</SpinnerWrapper>
      )}
    </Wrapper>
  );
};

export default GameContainer;
