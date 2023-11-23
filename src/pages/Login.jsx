import React from "react";
import logo from "../assets/icons/notes-hidemaru.svg";

const Login = () => {
  return (
    <div className="flex flex-col flex-center mt-24">
      <div className="flex text-primary">
        <img
          className="h-7 self-center"
          src={logo}
          alt="minimalistic icon of sticky notes"
        />
        <h1 className="font-semibold text-3xl ml-3">AppName</h1>
      </div>
      <div className="mt-8 flex flex-col">
        <div>
          <h3>Log in</h3>
          <p>
            Don't have an account? <span>Create one</span>
          </p>
        </div>
        <form className="my-6 flex flex-col" action="" method="post">
          <input
            className="mb-3 rounded-md"
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
          <input
            className="mb-3 rounded-md"
            type="password"
            name="password"
            id="passwd"
            placeholder="Password"
          />
          <button type="submit">Log in</button>
        </form>
        <span className="self-center">Forgot Password?</span>
      </div>
    </div>
  );
};

export default Login;
