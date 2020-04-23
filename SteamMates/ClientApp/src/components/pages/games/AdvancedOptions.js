import React, { useContext } from "react";
import styled, { css } from "styled-components";
import SettingsContext from "../../../contexts/SettingsContext";
import { ORDER } from "../../../constants";

const Panel = styled.div`
  display: ${({ display }) => display};
  grid-template-rows: repeat(3, 1fr);
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  min-width: 200px;
  min-height: 600px;
  background: #dedede;

  ${({ theme }) => css`
    @media (${theme.queries.verySmall}) {
      min-height: initial;
      padding: 0 40px;
    }

    @media (${theme.queries.medium}) {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: none;
      height: 200px;
    }
  `}
`;

const Block = styled.div`
  padding: 10px 0;
`;

const List = styled.ul`
  padding-left: 0;
`;

const ListItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 8px 0;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const DropdownText = styled.span`
  display: inline-block;
  margin-left: 28px;
  width: 50px;
`;

const Dropdown = styled.select`
  margin-right: ${({ marginRight }) => marginRight};

  &:disabled {
    background: #dadada;
  }
`;

const ApplyToSearch = styled.span`
  display: inline-block;
  margin-top: 10px;
`;

const AdvancedOptions = ({ show }) => {
  const {
    tags,
    setTags,
    ratings,
    setRatings,
    orderBy,
    setOrderBy
  } = useContext(SettingsContext);

  const handleTagChange = tag => {
    tag.checked = !tag.checked;
    setTags([...tags]);
  };

  const handleRatingChange = rating => {
    rating.checked = !rating.checked;
    setRatings([...ratings]);
  };

  const handleRatingValueChange = (rating, e) => {
    rating.selected = parseInt(e.target.value);
    ratings[1].max = ratings[2].selected;
    ratings[2].min = ratings[1].selected;
    setRatings([...ratings]);
  };

  const handleOrderByDirectionChange = e => {
    orderBy.asc = e.target.value === "Asc";
    setOrderBy({ ...orderBy });
  };

  const handleOrderByValueChange = e => {
    orderBy.value = e.target.value;
    setOrderBy({ ...orderBy });
  };

  const handleApplyToSearchChange = () => {
    orderBy.applyToSearch = !orderBy.applyToSearch;
    setOrderBy({ ...orderBy });
  };

  return (
    <Panel display={show ? "grid" : "none"}>
      <Block>
        <h3>Filter by tags</h3>
        <List>
          {tags.map(tag => (
            <ListItem key={tag.name}>
              <Checkbox
                type="checkbox"
                checked={tag.checked}
                onChange={() => handleTagChange(tag)}
              />
              <span>{tag.name}</span>
            </ListItem>
          ))}
        </List>
      </Block>
      <Block>
        <h3>Filter by ratings</h3>
        <List>
          {ratings.map((rating, index) => (
            <ListItem key={rating.name}>
              {index === 0 || index === 3 ? (
                <>
                  <Checkbox
                    type="checkbox"
                    checked={rating.checked}
                    onChange={() => handleRatingChange(rating)}
                  />
                  <span>{rating.name}</span>
                </>
              ) : (
                <>
                  <DropdownText>{rating.name}</DropdownText>
                  <Dropdown
                    defaultValue={rating.selected}
                    disabled={!ratings[0].checked}
                    onChange={e => handleRatingValueChange(rating, e)}
                  >
                    {Array.from(Array(rating.max).keys())
                      .slice(rating.min - 1, rating.max)
                      .map(value => (
                        <option key={value} value={value + 1}>
                          {value + 1}
                        </option>
                      ))}
                  </Dropdown>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Block>
      <Block>
        <h3>Order by</h3>
        <List>
          <ListItem>
            <Dropdown
              defaultValue={orderBy.value}
              marginRight={"15px"}
              onChange={handleOrderByValueChange}
            >
              {[ORDER.RATING, ORDER.TITLE].map(property => (
                <option key={property} value={property}>
                  {property}
                </option>
              ))}
            </Dropdown>
            <Dropdown
              defaultValue={orderBy.asc ? "Asc" : "Desc"}
              onChange={handleOrderByDirectionChange}
            >
              {["Asc", "Desc"].map(property => (
                <option key={property} value={property}>
                  {property}
                </option>
              ))}
            </Dropdown>
          </ListItem>
          <ListItem>
            <ApplyToSearch>
              <Checkbox
                type="checkbox"
                checked={orderBy.applyToSearch}
                onChange={handleApplyToSearchChange}
              />
              <span>Apply to search</span>
            </ApplyToSearch>
          </ListItem>
        </List>
      </Block>
    </Panel>
  );
};

export default AdvancedOptions;
