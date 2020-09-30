import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 8px;
  input {
    background: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    width: 100%;
  }
  .error {
    color: red;
    font-size: 14px;
  }
`;

const InputComponent = (props) => {
  const {
    label,
    type,
    id,
    placeholder,
    required = false,
    error = "",
    onBlur,
    onChange,
    maxLength = null,
    minLength = null,
  } = props || {};

  return (
    <Wrapper>
      <label className="main" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        onBlur={onBlur}
        onChange={onChange}
      />
      {error !== "" && <div className="error">{error}</div>}
    </Wrapper>
  );
};

export default InputComponent;
