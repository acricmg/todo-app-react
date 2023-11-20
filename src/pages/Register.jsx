import React, { useState } from "react";
import axios from "axios";
import config from "../../config/config";

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
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-white-900">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-white-900">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-white-900">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-white-900">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      {status}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
