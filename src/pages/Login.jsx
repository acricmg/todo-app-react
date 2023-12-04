import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import config from "../../config/config";
import LoginLayout from "../components/LoginLayout";

const Login = () => {
  const [input, setInput] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput((inputs) => {
      return { ...inputs, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = {
        username: input.username,
        password: input.password,
      };

      const response = await axios.post(
        `${config.backend.url}/api/authorize`,
        formData
      );

      if (response.data) {
        navigate("/tasks");
        setInput({});
      }
    } catch (error) {
      console.error("POST request failed:", error);
    }
  };

  return (
    <LoginLayout>
      <div className="text-center sm:text-left">
        <h3 className="font-bold mb-2.5 text-2xl">Log in</h3>
        <p>
          Don't have an account?
          <Link className="link" to="/register">
            {" "}
            Create one
          </Link>
        </p>
      </div>
      <form className="my-4 flex flex-col" onSubmit={handleSubmit}>
        <input
          className="field"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={input.username || ""}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          className="field"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={input.password || ""}
          onChange={(e) => handleChange(e)}
          required
        />
        <button className="field-rounded btn-primary" type="submit">
          Log in
        </button>
      </form>
      <span className="text-sm text-center link">Forgot Password?</span>
    </LoginLayout>
  );
};

export default Login;
