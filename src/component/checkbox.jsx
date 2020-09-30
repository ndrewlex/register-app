import React from "react";
import styled from "styled-components";

const generateOptions = (data = []) => {
  return data.map((item, index) => {
    return {
      id: index,
      name: item,
      value: item.toLowerCase(),
    };
  });
};

const Wrapper = styled.div`
  padding: 5px;
`;

const InputStyled = styled.input``;

const ContainerCheckbox = styled.div`
  label {
    display: flex;
  }
  .item {
    margin-top: 10px;
    &:first-of-type {
      margin-top: 0;
    }
    display: flex;
    font-size: 14px;
    input {
      margin-right: 8px;
    }
  }
`;
const Checkbox = (props) => {
  const {
    data,
    label,
    type = "checkbox",
    name: globalName = "",
    selected = [],
  } = props || {};
  const options = generateOptions(data);

  return (
    <Wrapper>
      <label className="main">{label}</label>
      <ContainerCheckbox>
        {options.map((item) => {
          const { id, name, value } = item ?? {};

          const generatedName = type === "checkbox" ? value : globalName;

          return (
            <div className="item" key={`${id}-${label}`}>
              <InputStyled
                type={type}
                id={value}
                value={value}
                name={generatedName}
                data-parse={`options-${globalName}`}
              />
              <label htmlFor={value}>{name}</label>
            </div>
          );
        })}
      </ContainerCheckbox>
    </Wrapper>
  );
};

export default Checkbox;
