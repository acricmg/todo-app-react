import { React, useState } from "react";

import { useMobNav } from "../contexts/mobNavContext";

import MobileNavbar from "./MobileNavbar";
import PrimaryNav from "./PrimaryNav";

import { faBell, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ user, logout }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const {toggleState } = useMobNav();

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
            <li className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleDropdownToggle}
            >
              <FontAwesomeIcon className="mr-2" icon={faCircleUser} />
              {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
              <FontAwesomeIcon className="ml-2 w-4 h-4" icon={faChevronDown} />
            </div>
            {isDropdownOpen && (
              <div className="absolute mt-2 p-2 bg-white border border-gray-300 rounded shadow-md">
                <ul>
                  <li
                    className="px-3 cursor-pointer hover:text-black"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
