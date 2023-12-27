import { React, useState } from "react";

import { useAuth } from "../contexts/authContext";
import { useMobNav } from "../contexts/mobNavContext";

import MobileNavbar from "./MobileNavbar";
import PrimaryNav from "./PrimaryNav";

import { faBell, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const {toggleState } = useMobNav();
  const { user } = useAuth();

  return (
    <>
      <MobileNavbar user={user} />
      <header className="px-6 py-5 flex items-center drop-shadow-sm bg-white text-primary text-base sm:text-xl">
        <PrimaryNav />
        <FontAwesomeIcon
          className="header-icon-size cursor-pointer lg:hidden"
          onClick={toggleState}
          icon={faBars}
        />
        <div className="ml-auto">
          <ul className="flex gap-5 sm:gap-7">
            <li>
              <FontAwesomeIcon
                className="header-icon-size cursor-pointer"
                icon={faBell}
              />
            </li>
            <li className="flex flex-center cursor-pointer">
              <FontAwesomeIcon className="mr-2" icon={faCircleUser} />
              Users
              <FontAwesomeIcon
                className="ml-2 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5"
                icon={faChevronDown}
              />
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
