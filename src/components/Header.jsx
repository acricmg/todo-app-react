import { React } from "react";

import { faBell, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PrimaryNav from "./PrimaryNav";

const Header = () => {
  return (
    <>
      <header className="px-6 py-5 flex justify-between drop-shadow-sm bg-white text-primary text-xl ">
        <PrimaryNav/>
        <ul className="flex gap-7">
          <li>
            <FontAwesomeIcon className="header-icon-size" icon={faBell} />
          </li>
          <li className="flex flex-center">
            <FontAwesomeIcon className="mr-2" icon={faCircleUser} />
            Users
            <FontAwesomeIcon className="ml-2 w-4 h-4" icon={faChevronDown} />
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
