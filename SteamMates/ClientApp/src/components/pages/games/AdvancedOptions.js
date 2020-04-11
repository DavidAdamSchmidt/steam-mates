import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: ${({ display }) => display};
  overflow: hidden;
  margin: 0 60px 0 20px;
`;

const Panel = styled.div`
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

const AdvancedOptions = ({ show, tags, setTags }) => {
  const handleChange = tag => {
    tag.checked = !tag.checked;
    setTags([...tags]);
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
                  onChange={() => handleChange(tag)}
                />
                {tag.name}
              </ListItem>
            ))}
          </List>
        </Block>
      </Panel>
    </Wrapper>
  );
};

export default AdvancedOptions;
