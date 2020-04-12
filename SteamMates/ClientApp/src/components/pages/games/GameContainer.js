import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import useWindowSize from "../../../hooks/useWindowSize";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import SettingsContext from "../../../contexts/SettingsContext";
import SearchBox from "../../common/SearchBox";
import AdvancedOptions from "./AdvancedOptions";
import AmountOfRatings from "./AmountOfRatings";
import GameCard from "./GameCard";
import LoadingIndicator from "../../common/LoadingIndicator";
import { filterGames } from "../../../utils/gamesUtils";
import { copyData } from "../../../utils/sharedUtils";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 25px;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 80px;
`;

const SearchBoxWrapper = styled.div`
  padding: 20px;
  width: 100%;
`;

const SearchResultWrapper = styled.div`
  margin: 0 20px;
`;

const HiddenGames = styled.p`
  font-style: italic;
  text-align: right;
  color: gray;
`;

const pageSize = 32;

const GameContainer = ({ data, dataOrganizer, allowRating }) => {
  const increaseAmount = () => {
    setIsLoading(false);
    setAmount(prevState => prevState + pageSize);
  };

  const [games, setGames] = useState(data);
  const [amount, setAmount] = useState(pageSize);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const settings = useContext(SettingsContext);

  const [width] = useWindowSize();
  const [isLoading, setIsLoading] = useInfiniteScroll(
    amount < games.length,
    useCallback(increaseAmount, [])
  );

  const inputRef = useRef("");

  useEffect(() => {
    setAmount(pageSize);
  }, [games]);

  useEffect(() => {
    setGames(
      filterGames(copyData(data), inputRef.current, settings, dataOrganizer)
    );
  }, [data, dataOrganizer, settings]);

  const handleInputChange = newInput => {
    setGames(filterGames(copyData(data), newInput, settings, dataOrganizer));
    inputRef.current = newInput;
  };

  const adjustAmount = titleIndex => {
    if (titleIndex > currentTitleIndex) {
      setCurrentTitleIndex(titleIndex);
      setAmount(prevState => prevState + (titleIndex % 4));
    }
  };

  const hidden = data.length - games.length;

  return (
    <Wrapper>
      <SearchBoxWrapper>
        <SearchBox
          placeholder={"Search games..."}
          handleInputChange={handleInputChange}
          handleSettingsClick={() =>
            setShowAdvancedOptions(prevState => !prevState)
          }
        />
        <SearchResultWrapper>
          <AdvancedOptions show={showAdvancedOptions} />
          {!!hidden && inputRef.current.length < 3 && (
            <HiddenGames>
              {hidden} game{hidden > 1 ? "s were" : " was"} hidden
              {width >= 768 && " based on your preferences"}
            </HiddenGames>
          )}
        </SearchResultWrapper>
      </SearchBoxWrapper>
      {games.slice(0, amount).map((info, index) => (
        <Fragment key={info.game.appId}>
          {info.title && <AmountOfRatings text={info.title} />}
          {info.title && adjustAmount(index)}
          <GameCard info={info} allowRating={allowRating} />
        </Fragment>
      ))}
      {amount < games.length && (
        <SpinnerWrapper>{isLoading && <LoadingIndicator />}</SpinnerWrapper>
      )}
    </Wrapper>
  );
};

export default GameContainer;
