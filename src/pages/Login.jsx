import React from "react";
import { Link } from "react-router-dom";
import LoginLayout from "../components/LoginLayout";

const Login = () => {
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
          className="field-rounded btn-primary"
          type="submit"
        >
          Log in
        </button>
      </form>
      <span className="text-center link">
        Forgot Password?
      </span>
    </LoginLayout>
  );
};

export default Login;
