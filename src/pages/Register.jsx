import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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

    try {
      const formData = {
        username: username,
        name: name,
        password: password,
        email: email,
      };

      const response = await axios.post(
        `${config.backend.url}/api/user-c`,
        formData
      );
      setStatus("Account Created");
      console.log("POST request successful:", response.data);
    } catch (error) {
      setStatus("Was not able to create account. Check logs.");
      console.error("POST request failed:", error);
    }
    setUsername("");
    setName("");
    setPassword("");
    setEmail("");
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
        <input
          className="mb-3 field-rounded field-border"
          type="text"
          name="name"
          id="name"
          placeholder="Full Name / Nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="mb-3 field-rounded field-border"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="mb-3 field-rounded field-border"
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="field-rounded btn-primary" type="submit">
          Continue
        </button>
      </form>
      <Link className="text-sm link" to="/"> 
      Go Back
      </Link>
    </LoginLayout>

    // <input
    //     className="mb-3 field-rounded field-border"
    //     type="password"
    //     name="password"
    //     id="passwd"
    //     placeholder="Password"
    //   />
  );
};

export default Register;
