import { React } from "react";

import {
  faBell,
  faCircleUser,
  faFileLines,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <>
      <header className="px-6 py-5 mb-4 flex justify-between drop-shadow-sm bg-white text-primary text-xl ">
        <nav>
          <ul className="flex gap-7">
            <li className="font-bold">
              <FontAwesomeIcon className="mr-2" icon={faHouse} />
              Home
            </li>
            <li>
              <FontAwesomeIcon className="mr-2" icon={faFileLines} />
              Reports
            </li>
          </ul>
        </nav>

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
      ;
    </>
  );
};

export default Header;
