import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import axiosInstance from "../services/axiosInstance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("authToken", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        console.log(authToken);
        // Check if token is still valid
        if (authToken && isMounted) {
          const response = await axiosInstance.get(
            `${config.backend.url}/api/user`
          );
          setUser(response.data.user);
        } else {
          localStorage.setItem("user", "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
