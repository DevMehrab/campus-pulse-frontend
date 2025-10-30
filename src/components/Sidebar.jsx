import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePlusCircle,
  AiOutlineBell,
  AiOutlineSetting,
} from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { getUser, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  function handleAdmin() {
    navigate("/admin/dashboard");
  }
  const links = [
    { name: "Home", icon: <AiOutlineHome size={22} />, path: "/home" },
    {
      name: "Report",
      icon: <AiOutlinePlusCircle size={22} />,
      path: "/create",
    },
    { name: "Profile", icon: <AiOutlineUser size={22} />, path: "/profile" },
  ];
  return (
    <aside className="hidden md:flex flex-col h-screen justify-items-stretch w-60 border-r fixed border-gray-200 bg-white p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-6 mt-16">Menu</h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
              location.pathname === link.path
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
        <button
          onClick={logout}
          className="p-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
        >
          Logout
        </button>
        <button
          onClick={handleAdmin}
          className="p-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-indigo-700 transition"
        >
          Admin Panel
        </button>
      </nav>
    </aside>
  );
}
