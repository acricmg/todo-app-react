import { React, useEffect, useState } from "react";

import Header from "./Header";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Header />
      <div className="lg:flex">
        {/* <Navbar state={isOpen} /> */}
        {/* <div className="sticky lg:top-1/3 bottom-1/2 h-12 mr-8 mb-3">
        <button
          className="absolute rounded-full left-[-10px] p-3 bg-white border"
          onClick={toggleNavbar}
        >
          <FontAwesomeIcon icon={isOpen ? faCaretLeft : faCaretRight} />
        </button>
      </div> */}

        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
