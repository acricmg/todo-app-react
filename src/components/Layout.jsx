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
      <div className="hidden lg:block sticky top-1/3 bottom-1/2 h-12 mr-5">
        <button
          className="absolute rounded-full left-[-30px]"
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
