import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import config from "../../config/config";

const Navbar = ({ state }) => {
  const [isOpen, setIsOpen] = useState(true);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
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
    <div
      className={`bg-slate-600 text-sky-50 lg:w-1/6 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="border-b-2 border-white">
        <div className="p-6">
          <div className="mb-3 flex justify-between items-center">
            <h3 className="text-xl">
              Hello <span className="font-semibold">user!</span>
            </h3>
            <FontAwesomeIcon className="cursor-pointer" icon={faBars} />
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
          <li className="font-bold mb-2">All</li>
          <li className="mb-2">Personal</li>
          <li className="mb-2">Work</li>
          <li className="mb-2">Hobby</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
