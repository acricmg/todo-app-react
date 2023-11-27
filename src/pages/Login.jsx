import React from "react";
import LoginLayout from "../components/LoginLayout";

const Login = () => {
  return (
    <LoginLayout>
      <div className="text-center sm:text-left">
        <h3 className="font-bold mb-2.5 text-2xl">Log in</h3>
        <p>
          Don't have an account?
          <span className="text-secondary hover:text-secondary-200 hover:font-medium transition ease-out duration-300">
            {" "}
            Create one
          </span>
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
      <span className="text-center text-secondary hover:text-secondary-200 hover:font-medium transition ease-out duration-300">
        Forgot Password?
      </span>
    </LoginLayout>
  );
};

export default Login;
