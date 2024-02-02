import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import { AuthProvider } from "./contexts/authContext";
import TaskView from "./pages/TaskView";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/task" element={<TaskView />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
