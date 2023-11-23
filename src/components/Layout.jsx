import { React, useEffect, useState } from "react";
import Navbar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="lg:flex">
      <Navbar state={isOpen} />
      <div className="sticky lg:top-1/3 bottom-1/2 h-12 mr-8 mb-3">
        <button
          className="absolute rounded-full left-[-10px] p-3 bg-white border"
          onClick={toggleNavbar}
        >
          <FontAwesomeIcon icon={isOpen ? faCaretLeft : faCaretRight} />
        </button>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Layout;
