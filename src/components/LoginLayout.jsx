import React from "react";
import logo from "../assets/icons/notes-hidemaru.svg";

const LoginLayout = ({children}) => {
  return (
    <div className="mt-24 flex flex-col flex-center">
      <div className="flex flex-center text-primary">
        <img
          className="h-10 sm:h-7 self-center"
          src={logo}
          alt="minimalistic icon of sticky notes"
        />
        <h1 className="font-semibold text-3xl ml-3 hidden sm:block">AppName</h1>
      </div>
      <div
        className="mt-8 flex flex-col border-opacity-80 rounded-xl w-64 sm:w-96 sm:p-9 sm:bg-white sm:border-1 sm:border-gray-300 sm:shadow"
      >
        <>{children}</>
      </div>
    </div>
  );
};

export default LoginLayout;
