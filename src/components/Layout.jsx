import { React, useEffect, useState } from "react";

import Header from "./Header";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  // const [isOpen, setIsOpen] = useState(true);
  // const toggleNavbar = () => {
  //   setIsOpen(!isOpen);
  // };
  return (
    <>
      <Header />
      <div className="h-full lg:flex">
        <Navbar />
        {/* <div>{children}</div> */}
      </div>
    </>
  );
};

export default Layout;
