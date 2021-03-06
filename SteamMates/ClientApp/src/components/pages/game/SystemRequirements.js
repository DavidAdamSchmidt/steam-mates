import React, { useState } from "react";
import styled, { css } from "styled-components";
import SectionTitle from "./SectionTitle";

const Container = styled.div`
  min-height: 300px;
  margin-bottom: 30px;
`;

const SelectionMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 20px 0;
  border-radius: 3px;
  padding: 12px;
  background: linear-gradient(#f3f3f3, #d4d4d4);

  ${({ theme }) => css`
    @media (${theme.queries.smaller}) {
      display: block;
    }
  `}
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Option = styled.div`
  display: inline-block;
  padding: 3px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #5c5c5c;

  ${({ selected }) =>
    selected &&
    css`
      border-radius: 3px;
      background: #c2c2c2;
    `}

  ${({ theme }) => css`
    @media (${theme.queries.smaller}) {
      margin: 0 20px;
      text-align: initial;
    }
  `}

  &:hover {
    ${({ selected }) =>
      !selected &&
      css`
        color: #b4b4b4;
      `}
  }
`;

const Requirements = styled.span`
  width: 480px;
  line-height: 1.6;

  ${({ theme }) => css`
    @media (${theme.queries.smaller}) {
      padding: 0 20px;
    }
  `}
`;

const SystemRequirements = ({
  pcRequirements,
  macRequirements,
  linuxRequirements
}) => {
  const requirements = [
    {
      name: "Windows",
      minimum: pcRequirements.minimum,
      recommended: pcRequirements.recommended
    },
    {
      name: "Mac OS X",
      minimum: macRequirements.minimum,
      recommended: macRequirements.recommended
    },
    {
      name: "SteamOS + Linux",
      minimum: linuxRequirements.minimum,
      recommended: linuxRequirements.recommended
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
      <SectionTitle>System requirements</SectionTitle>
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
