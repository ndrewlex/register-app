import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "../component/checkbox";
import Input from "../component/input";

const Wrapper = styled.div`
  padding: 20px;
  min-width: 325px;
  margin: auto;
  text-align: left;
  border: 1px solid black;
  border-radius: 10px;
  align-self: center;

  h2 {
    text-align: center;
  }
`;

const Form = styled.form`
  .row {
    label {
      &.main {
        display: block;
        text-align: left;
        margin-bottom: 5px;
      }
    }
    margin-bottom: 10px;
    &:first-of-type {
      margin-top: 10px;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
    &.flex {
      display: flex;
    }

    .col {
      width: 50%;
      .first {
        margin-right: 10px;
      }
      .last {
        margin-left: 0;
      }
    }
  }
`;

const GroupAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  input,
  button {
    padding: 8px;
    border-radius: 5px;
    background: none;
    border: 1px solid #ccc;
    float: right;
    cursor: pointer;
    width: 100px;
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const RegisterForm = () => {
  const [error, setError] = useState({
    email: "",
    name: "",
    password: "",
    username: "",
  });

  const onReset = (e) => {
    e.preventDefault();
    document.getElementById("registerForm").reset();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    let parsedData = {
      hobi: [],
    };

    let isError = false;
    for (let i in error) {
      if (error[i] !== "") {
        isError = true;
        break;
      }
    }
    if (isError) {
      alert("Failed, name must be capitalize");
    } else {
      for (let name of data.keys()) {
        const input = form.elements[name];
        const parserName =
          (input && input.dataset && input.dataset.parse) || null;

        const value = data.get(name);
        if (parserName === "options-hobi") {
          parsedData["hobi"].push(value);
        } else {
          parsedData[name] = value;
        }
      }
      alert(
        `Success, you have been registered \n ${JSON.stringify(parsedData)}`
      );
      document.getElementById("registerForm").reset();
    }
  };

  const onCheckerEmail = (e) => {
    const value = e.currentTarget.value;
    const test = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    if (!test) {
      setError({ ...error, email: "Email must be valid" });
    } else {
      setError({ ...error, email: "" });
    }
  };

  const onCheckerName = (e) => {
    const value = e.currentTarget.value;
    const test = /[A-Z]/.test(value[0]);
    if (!test) {
      setError({ ...error, name: "Name is required and must be capitalize" });
    } else {
      setError({ ...error, name: "" });
    }
  };

  const onCheckerUsername = (e) => {
    const value = e.currentTarget.value;
    const test = value !== "";
    if (!test) {
      setError({
        ...error,
        username: "Username is required, max 10 character",
      });
    } else {
      setError({ ...error, username: "" });
    }
  };

  const onCheckPassword = (e) => {
    const value = e.currentTarget.value;
    const test = value.length >= 7;
    if (!test) {
      setError({
        ...error,
        password: "Password is required, min 7 character",
      });
    } else {
      setError({ ...error, password: "" });
    }
  };

  return (
    <Wrapper>
      <h2>Register</h2>
      <Form id="registerForm" onSubmit={onSubmit} method="POST">
        <div className="row">
          <Input
            label="Nama"
            type="text"
            id="nama"
            placeholder="e.g John Doe"
            required
            onChange={onCheckerName}
            onBlur={onCheckerName}
            error={error.name}
          />
        </div>
        <div className="row">
          <Checkbox
            label="Jenis Kelamin"
            data={["Pria", "Wanita"]}
            name="gender"
            type="radio"
          />
        </div>
        <div className="row">
          <Checkbox
            label="Hobi"
            data={["Olahraga", "Nonton", "Belajar"]}
            name="hobi"
            type="checkbox"
          />
        </div>
        <div className="row flex">
          <div className="col first">
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="e.g test@gmail.com"
              onChange={onCheckerEmail}
              onBlur={onCheckerEmail}
              error={error.email}
              required
            />
          </div>
          <div className="col last">
            <Input
              label="Telp"
              type="number"
              id="telp"
              name="telp"
              placeholder="e.g 02323"
              required
            />
          </div>
        </div>

        <div className="row">
          <Input
            label="Username"
            type="text"
            id="username"
            name="username"
            placeholder="e.g user"
            onChange={onCheckerUsername}
            onBlur={onCheckerUsername}
            error={error.username}
            maxLength={10}
            required
          />
        </div>
        <div className="row">
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="e.g xx"
            minLength={7}
            onChange={onCheckPassword}
            onBlur={onCheckPassword}
            error={error.password}
            required
          />
        </div>
        <GroupAction>
          <button type="submit">Daftar</button>
          <button onClick={onReset}>Reset</button>
        </GroupAction>
      </Form>
    </Wrapper>
  );
};

export default RegisterForm;
