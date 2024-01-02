import { React, useState } from "react";

import { faBell, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PrimaryNav from "./PrimaryNav";

const Header = ({ user, logout }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <header className="px-6 py-5 flex justify-between drop-shadow-sm bg-white text-primary text-xl ">
        <PrimaryNav />
        <ul className="flex gap-7">
          <li>
            <FontAwesomeIcon className="header-icon-size" icon={faBell} />
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
      </header>
    </>
  );
};

export default Header;
