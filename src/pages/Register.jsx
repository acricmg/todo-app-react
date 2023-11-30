import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../../config/config";
import LoginLayout from "../components/LoginLayout";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
