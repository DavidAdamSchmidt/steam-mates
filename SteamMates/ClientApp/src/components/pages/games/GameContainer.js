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
import { filterGames } from "../../../utils/gameSearchUtils";
import { copyData } from "../../../utils/sharedUtils";
import { FRIENDS } from "../../../constants/style";
import { RATING } from "../../../constants/orderByOptions";

const Wrapper = styled.div`
  position: relative;
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

const GameContainer = ({ data, dataOrganizer }) => {
  const increaseAmount = () => {
    setIsLoading(false);
    setAmount(prevState => prevState + pageSize);
  };

  const [games, setGames] = useState(data);
  const [tags, setTags] = useState([
    { name: "Multiplayer", checked: true },
    { name: "Local Multiplayer", checked: true },
    { name: "Online Co-Op", checked: true },
    { name: "Local Co-Op", checked: true }
  ]);
  const [ratings, setRatings] = useState([
    { name: "Rated", type: "checkbox", checked: true },
    { name: "From", type: "dropdown", min: 1, max: 5, selected: 1 },
    { name: "To", type: "dropdown", min: 1, max: 5, selected: 5 },
    { name: "Unrated", type: "checkbox", checked: true }
  ]);
  const [orderBy, setOrderBy] = useState({
    value: RATING,
    asc: false,
    applyToSearch: false
  });
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

  useEffect(() => {
    setGames(
      filterGames(
        copyData(data),
        tags,
        ratings,
        inputRef.current,
        orderBy,
        dataOrganizer
      )
    );
  }, [tags, ratings, orderBy, data, dataOrganizer]);

  const onInputChange = newInput => {
    setGames(
      filterGames(
        copyData(data),
        tags,
        ratings,
        newInput,
        orderBy,
        dataOrganizer
      )
    );
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
        <AdvancedOptions
          show={showAdvancedOptions}
          tags={tags}
          setTags={setTags}
          ratings={ratings}
          setRatings={setRatings}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
      </SearchBoxWrapper>
      {games.slice(0, amount).map((info, index) => (
        <Fragment key={info.game.appId}>
          {info.title && <AmountOfRatings text={info.title} />}
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
