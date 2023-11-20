import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Register from "./pages/Register";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
