import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const RegStep1 = ({ input, handleChange, handleContinue }) => {
  return (
    <>
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

      <button
        className="mt-3 field-rounded btn-primary"
        onClick={handleContinue}
      >
        Continue
      </button>

      <Link className="mt-6 text-sm text-center link" to="/">
        <span>
          <FontAwesomeIcon className="mr-2" icon={faChevronLeft} />
          Go Back
        </span>
      </Link>
    </>
  );
};

export default RegStep1;
