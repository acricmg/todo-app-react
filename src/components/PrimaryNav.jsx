import { React } from "react";

import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PrimaryNav = () => {
  return (
    <>
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
    </>
  );
};

export default PrimaryNav;
