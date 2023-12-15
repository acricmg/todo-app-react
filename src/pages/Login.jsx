import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import config from "../../config/config";
import LoginLayout from "../components/LoginLayout";
import { useAuth } from "../contexts/authContext";

const Login = () => {
  const { user, login } = useAuth();
  const [input, setInput] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate("/tasks", { replace: true });
    }
  }, []);

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
        `${config.backend.url}/api/login`,
        formData
      );

      if (response.data) {
        login(response.data.user);
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
        <h3 className="font-bold mb-1.5 text-2xl">Log in</h3>
        <p>
          Don't have an account?
          <Link className="link" to="/register">
            {" "}
            Create one
          </Link>
        </p>
      </div>
      <form className="my-4 flex flex-col" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="username">
          Username
        </label>
        <input
          className="field"
          type="text"
          name="username"
          id="username"
          placeholder="johndoe1988"
          value={input.username || ""}
          onChange={(e) => handleChange(e)}
          required
        />
        <label className="field-label" htmlFor="username">
          Password
        </label>
        <input
          className="field"
          type="password"
          name="password"
          id="password"
          placeholder="********"
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
