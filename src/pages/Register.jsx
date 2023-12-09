import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import config from "../../config/config";
import LoginLayout from "../components/LoginLayout";
import RegStep1 from "../components/RegStep1";
import RegStep2 from "../components/RegStep2";

const Register = () => {
  const [input, setInput] = useState({});
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

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
        name: input.name,
        password: input.password,
        email: input.email,
      };

      if (formData.password === input.confirmPassword) {
        const response = await axios.post(
          `${config.backend.url}/api/user-c`,
          formData
        );
        console.log("POST request successful:", response.data);
        setInput({});
      } else {
        console.log("Password not match");

        setInput((inputs) => {
          return { ...inputs, password: "" };
        });
        setInput((inputs) => {
          return { ...inputs, confirmPassword: "" };
        });
      }
    } catch (error) {
      console.error("POST request failed:", error);
    }
  };

  return (
    <LoginLayout>
      <div className="text-center sm:text-left">
        <h3 className="font-bold mb-2.5 text-2xl">Create Account</h3>
        <p>
          Already have an account?
          <Link className="link" to="/">
            {" "}
            Log in
          </Link>
        </p>
      </div>
      <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
        {step === 1 ? (
          <RegStep1
            input={input}
            handleChange={handleChange}
            handleContinue={handleContinue}
          />
        ) : (
          <RegStep2
            input={input}
            handleChange={handleChange}
            handleBack={handleBack}
          />
        )}
      </form>
    </LoginLayout>
  );
};

export default Register;
