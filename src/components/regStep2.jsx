import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const RegStep2 = ({ input, handleChange, handleBack }) => {
    return (
        <>
        <label className="field-label" htmlFor="password">
          Password
        </label>
        <input
          className="field"
          type="password"
          name="password"
          id="password"
          placeholder="********"
          value={input.password || ""}
          onChange={(e) => handleChange(e)}
        />

        <label className="field-label" htmlFor="confirm-password">
          Confirm Password
        </label>
        <input
          className="field"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="********"
          value={input.confirmPassword || ""}
          onChange={(e) => handleChange(e)}
        />

        <button className="mt-3 field-rounded btn-primary" type="submit">
          Create Account
        </button>

        <span
          className="mt-6 text-sm text-center link"
          onClick={handleBack}
        >
          <FontAwesomeIcon className="mr-2" icon={faChevronLeft} />
          Go Back
        </span>
      </>
    );
  };
  
  export default RegStep2;
  