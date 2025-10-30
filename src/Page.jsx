import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import StudentLayout from "./layouts/StudentLayout";
import Adminlayout from "./layouts/Adminlayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Admin/Dashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageIssues from "./pages/Admin/ManageIssues";
import Home from "./pages/User/Home";
import CreateIssue from "./pages/User/CreateIssue";
import Profile from "./pages/User/Profile";
import Issue from "./pages/User/Issue";
import About from "./pages/User/About";

export default function Page() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/issues/:id" element={<Issue />} />

          <Route
            element={<ProtectedRoute allowedRoles={["student", "admin"]} />}
          >
            <Route element={<StudentLayout />}>
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<CreateIssue />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<Adminlayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/issues" element={<ManageIssues />} />
              <Route path="/admin/profile/:id" element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Router>
    </>
  );
}
