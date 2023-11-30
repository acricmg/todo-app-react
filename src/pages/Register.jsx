import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../../config/config";
import LoginLayout from "../components/LoginLayout";

const Register = () => {
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput((inputs) => {
      console.log(inputs);
      return { ...inputs, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log(inputs);

    // try {
    //   const formData = {
    //     username: username,
    //     name: name,
    //     password: password,
    //     email: email,
    //   };

    //   const response = await axios.post(
    //     `${config.backend.url}/api/user-c`,
    //     formData
    //   );
    //   setStatus("Account Created");
    //   console.log("POST request successful:", response.data);
    // } catch (error) {
    //   setStatus("Was not able to create account. Check logs.");
    //   console.error("POST request failed:", error);
    // }
    // setUsername("");
    // setName("");
    // setPassword("");
    // setEmail("");
  };

  return (
    <LoginLayout>
      <div className="text-center sm:text-left">
        <h3 className="font-bold mb-2.5 text-2xl">Create Account</h3>
        <p>
          Already have an account?
          <span className="link"> Log in</span>
        </p>
      </div>
      <form className="my-6 flex flex-col" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="name">
          Full Name / Nickname
        </label>
        <input
          className="field"
          type="text"
          name="name"
          id="name"
          placeholder="John Doe / John"
          value={input.name || ""}
          onChange={(e) => handleChange(e)}
          required
        />

        <label className="field-label" htmlFor="username">
          Username
        </label>
        <input
          className="field"
          type="text"
          name="username"
          id="username"
          placeholder="johndoe1998"
          value={input.username || ""}
          onChange={(e) => handleChange(e)}
          required
        />

        <label className="field-label" htmlFor="email">
          Email Address
        </label>
        <input
          className="field"
          type="email"
          name="email"
          id="email"
          placeholder="johndoe@gmail.com"
          value={input.email || ""}
          onChange={(e) => handleChange(e)}
          required
        />

        {/* <label className="field-label" htmlFor="password">
          Password
        </label>
        <input
          className="field"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={input.passwd1 || ""}
          onChange={(e) => handleChange(e)}
        />

        <label className="field-label" htmlFor="confirm-password">
          Confirm Password
        </label>
        <input
          className="field"
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirm Password"
          value={input.passwd2 || ""}
          onChange={(e) => handleChange(e)}
        /> */}

        <button className="mt-3 field-rounded btn-primary" type="submit">
          Continue
        </button>
      </form>
      <Link className="text-sm text-center link" to="/">
        <FontAwesomeIcon className="mr-2" icon={faChevronLeft} />
        <span>Go Back</span>
      </Link>
    </LoginLayout>
  );
};

export default Register;
