import React, { useContext } from "react";
import styled from "styled-components";
import TagContext from "../../../contexts/TagContext";
import Tag from "./Tag";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 100px 0 40px 0;
  border-radius: 20px;
  padding: 20px;
  background: #e4e4e4;
  line-height: 30px;
`;

const TagContainer = () => {
  const { initialTagsState, tags } = useContext(TagContext);

  return (
    <Wrapper>
      {initialTagsState.map((tag, index) => (
        <Tag key={index} name={tag} checked={tags.includes(tag)} />
      ))}
    </Wrapper>
  );
};

export default TagContainer;
