import { React, useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    user && (
      <>
        <Header user={user} logout={logout} />
        <div className="h-full lg:flex">
          <Navbar user={user} logout={logout} />
          <div>{children}</div>
        </div>
      </>
    )
  );
};

export default Layout;
