import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const Navbar = ({ state }) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = today.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`l-0 lg:w-1/5 mb-3 ${state ? "block" : "hidden"}`}>
      <div className="sticky top-5 p-4 container mx-auto flex justify-between items-center shadow-lg lg:shadow-sm rounded-lg border bg-white text-black z-10">
        <div>DaHub 😉</div>
        <div className="lg:hidden">
          <button onClick={toggleNavbar} className="focus:outline-none">
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6ZM20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12ZM19 17H5C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18C20 17.4477 19.5523 17 19 17Z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6ZM19 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13ZM5 18C4.44772 18 4 18.5523 4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19C20 18.5523 19.5523 18 19 18H5Z"
                />
              )}
            </svg>
          </button>
        </div>
        <div className={`lg:flex ${isOpen ? "block" : "hidden"}`}>
          <div className="ml-3">Home</div>
          <div className="ml-3">Reports</div>
        </div>
      </div>
      <div className="sticky top-[130px] mt-10">
        <div className="container rounded-lg border bg-white p-5 mx-auto">
          <div className="text-black text-left">
            <p className="text-xl mb-2">
              Hello <strong> User</strong>!
            </p>
            <p>
              Today is {formattedDate} {formattedTime}
            </p>
            <div className="border rounded p-4 mt-3 flex flex-wrap">
              <div>
                <p className="font-bold">Tasks Today</p>
                <p>5</p>
              </div>
              <div>
                <p className="font-bold">Tasks Completed</p>
                <p>0 (bruh 💀)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container rounded-lg border bg-white p-5 mt-5 mx-auto">
          <div className="text-black text-left">
            <p className="text-xl mb-2">
              Hello <strong> another</strong>!
            </p>
            <p>Group uno!</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
