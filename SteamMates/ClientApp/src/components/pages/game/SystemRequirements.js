import React, { useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  min-height: 300px;
  padding: 30px 0;
`;

const Header = styled.div`
  margin-bottom: 15px;
  border-bottom: 1px solid black;
  padding-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
`;

const SelectionMenu = styled.div`
  margin: 10px 0 20px 0;
  border-radius: 3px;
  padding: 12px;
  background: linear-gradient(#f3f3f3, #d4d4d4);
`;

const Option = styled.span`
  margin: 0 20px;
  padding: 3px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: #5c5c5c;

  ${({ selected }) =>
    selected &&
    css`
      border-radius: 3px;
      background: #c2c2c2;
    `}

  &:hover {
    ${({ selected }) =>
      !selected &&
      css`
        color: #b4b4b4;
      `}
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Requirements = styled.span`
  width: 480px;
  padding: 0 20px;
`;

const SystemRequirements = ({ data }) => {
  const requirements = [
    {
      name: "Windows",
      minimum: data.pcRequirements.minimum,
      recommended: data.pcRequirements.recommended
    },
    {
      name: "Mac OS X",
      minimum: data.macRequirements.minimum,
      recommended: data.macRequirements.recommended
    },
    {
      name: "SteamOS + Linux",
      minimum: data.linuxRequirements.minimum,
      recommended: data.linuxRequirements.recommended
    }
  ].filter(x => x.minimum || x.recommended);

  const [selected, setSelected] = useState(
    requirements.length > 0 ? requirements[0] : null
  );

  if (requirements.length === 0) {
    return null;
  }

  return (
    <Container>
      <Header>System requirements</Header>
      {requirements.length > 1 && (
        <SelectionMenu>
          {requirements.map(requirement => (
            <Option
              key={requirement.name}
              selected={selected.name === requirement.name}
              onClick={() => setSelected(requirement)}
            >
              {requirement.name}
            </Option>
          ))}
        </SelectionMenu>
      )}
      <Wrapper>
        {selected.minimum && (
          <Requirements
            dangerouslySetInnerHTML={{ __html: selected.minimum }}
          />
        )}
        {selected.recommended && (
          <Requirements
            dangerouslySetInnerHTML={{ __html: selected.recommended }}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default SystemRequirements;
