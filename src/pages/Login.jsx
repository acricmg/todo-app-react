import React from "react";
import logo from "../assets/icons/notes-hidemaru.svg";

const Login = () => {
  return (
    <div className="mt-24 flex flex-col flex-center">
      <div className="flex flex-center text-primary">
        <img
          className="h-10 sm:h-7 self-center"
          src={logo}
          alt="minimalistic icon of sticky notes"
        />
        <h1 className="font-semibold text-3xl ml-3 hidden sm:block">AppName</h1>
      </div>
      <div
        className="mt-8 flex flex-col border-opacity-80 rounded-xl w-64 sm:w-96 sm:p-9 sm:bg-white sm:border-1 sm:border-gray-300 sm:shadow"
      >
        <div className="text-center sm:text-left">
          <h3 className="font-bold mb-2.5 text-2xl">Log in</h3>
          <p>
            Don't have an account?
            <span className="text-secondary hover:text-secondary-200 hover:font-medium transition ease-out duration-300"> Create one</span>
          </p>
        </div>
        <form className="my-6 flex flex-col" action="" method="post">
          <input
            className="mb-3 field-rounded field-border"
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
          <input
            className="mb-3 field-rounded field-border"
            type="password"
            name="password"
            id="passwd"
            placeholder="Password"
          />
          <button
            className="field-rounded bg-primary text-white font-medium hover:bg-primary-200 hover:shadow-md transition ease-out duration-500"
            type="submit"
          >
            Log in
          </button>
        </form>
        <span className="text-center text-secondary hover:text-secondary-200 hover:font-medium transition ease-out duration-300">Forgot Password?</span>
      </div>
    </div>
  );
};

export default Login;
