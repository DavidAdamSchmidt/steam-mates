import React from "react";
import styled from "styled-components";
import { RATING, TITLE } from "../../../constants/orderByOptions";

const Wrapper = styled.div`
  display: ${({ display }) => display};
  overflow: hidden;
  margin: 0 60px 0 20px;
`;

const Panel = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-radius: 4px;
  padding: 0 40px;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  background: #dedede;
`;

const Block = styled.div`
  padding: 10px 0;
`;

const List = styled.ul`
  padding-left: 0;
`;

const ListItem = styled.li`
  list-style: none;
  margin: 5px 0;
`;

const DropdownText = styled.span`
  display: inline-block;
  padding-left: 20px;
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

const AdvancedOptions = ({
  show,
  tags,
  setTags,
  ratings,
  setRatings,
  orderBy,
  setOrderBy
}) => {
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
    <Wrapper display={show ? "block" : "none"}>
      <Panel>
        <Block>
          <h3>Filter by tags</h3>
          <List>
            {tags.map(tag => (
              <ListItem key={tag.name}>
                <input
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
            {ratings.map(rating => (
              <ListItem key={rating.name}>
                {rating.type === "checkbox" && (
                  <>
                    <input
                      type="checkbox"
                      checked={rating.checked}
                      onChange={() => handleRatingChange(rating)}
                    />
                    <span>{rating.name}</span>
                  </>
                )}
                {rating.type === "dropdown" && (
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
                {[RATING, TITLE].map(property => (
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
                <input
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
    </Wrapper>
  );
};

export default AdvancedOptions;
