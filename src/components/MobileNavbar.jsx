import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import config from "../../config/config";
import { useMobNav } from "../contexts/mobNavContext";

import PrimaryNav from "./PrimaryNav";

import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faBars, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AllIcon from "../assets/icons/all.svg?react";
import HobbyIcon from "../assets/icons/hobby.svg?react";
import PersonalIcon from "../assets/icons/personal.svg?react";
import WorkIcon from "../assets/icons/work.svg?react";

const MobileNavbar = ({ user }) => {
  const { state, toggleState } = useMobNav();

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

  return (
    <div>
      {state && (
        <>
          <div className="w-full h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-10"></div>
          <div className="w-3/5 h-screen bg-slate-600 text-sky-50 fixed top-0 left-0 z-20">
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
                    onClick={toggleState}
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

            <div className="border-b-2 border-white">
              <nav className="p-6">
                <ul>
                  <li className="font-bold mb-2">
                    <Link to="/tasks">
                      <FontAwesomeIcon className="mr-2" icon={faHouse} />
                      Home
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="#">
                      <FontAwesomeIcon className="mr-2" icon={faFileLines} />
                      Reports
                    </Link>
                  </li>
                </ul>
              </nav>
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
                    <WorkIcon
                      className="h-4"
                      fill="none"
                      stroke="currentColor"
                    />
                    Work
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="sidebar-icon">
                    <HobbyIcon
                      className="h-4"
                      fill="none"
                      stroke="currentColor"
                    />
                    Hobby
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNavbar;
