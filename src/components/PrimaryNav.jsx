import { React } from "react";
import { Link } from "react-router-dom";

import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PrimaryNav = () => {
  return (
    <>
      <nav className="hidden lg:block">
        <ul className="flex gap-7">
          <li className="font-bold">
            <Link to="/tasks">
              <FontAwesomeIcon className="mr-2" icon={faHouse} />
              Home
            </Link>
          </li>
          <li>
            <Link to="#">
              <FontAwesomeIcon className="mr-2" icon={faFileLines} />
              Reports
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PrimaryNav;
