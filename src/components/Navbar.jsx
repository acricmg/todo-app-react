import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config/config";

import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AllIcon from "../assets/icons/all.svg?react";
import HobbyIcon from "../assets/icons/hobby.svg?react";
import PersonalIcon from "../assets/icons/personal.svg?react";
import WorkIcon from "../assets/icons/work.svg?react";

const Navbar = ({ state, user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = today.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`bg-slate-600 text-sky-50 lg:w-1/6 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="border-b-2 border-white">
          <div className="p-6">
            <div className="mb-3 flex justify-between items-center">
              <h3 className="text-xl">
                Hello{" "}
                <span className="font-semibold">
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!
                </span>
              </h3>
              <FontAwesomeIcon
                className="cursor-pointer"
                onClick={toggleNavbar}
                icon={faBars}
              />
            </div>
            <p className="font-semibold">
              {formattedDate}
              <br />
              {formattedTime}
            </p>
          </div>
        </div>
        <nav className="p-6">
          <h3 className="font-semibold text-xl mb-3">Groups</h3>
          <ul>
            <li className="font-bold mb-2">
              <Link className="sidebar-icon">
                <AllIcon className="h-4" fill="#4ADE80" />
                All
              </Link>
            </li>
            <li className="mb-2">
              <Link className="sidebar-icon">
                <PersonalIcon
                  className="h-4"
                  fill="none"
                  stroke="currentColor"
                />
                Personal
              </Link>
            </li>
            <li className="mb-2">
              <Link className="sidebar-icon">
                <WorkIcon className="h-4" fill="none" stroke="currentColor" />
                Work
              </Link>
            </li>
            <li className="mb-2">
              <Link className="sidebar-icon">
                <HobbyIcon className="h-4" fill="none" stroke="currentColor" />
                Hobby
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className={`p-2 bg-slate-600 text-sky-50 opacity-30 hover:opacity-100 hover:drop-shadow-smshadow-lg transform ease-out duration-300 cursor-pointer ${
          !isOpen ? "block" : "hidden"
        }`}
        onClick={toggleNavbar}
      >
        <FontAwesomeIcon className="mt-5" icon={faBars} />
      </div>
    </>
  );
};

export default Navbar;
