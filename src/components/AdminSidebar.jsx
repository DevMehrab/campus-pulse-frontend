import { useState } from "react";
import {
  HiOutlineChartPie,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineHome,
  HiOutlineX,
  HiOutlineMenu,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const location = useLocation();

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <HiOutlineChartPie /> },
    {
      to: "/admin/issues",
      label: "Manage Issues",
      icon: <HiOutlineDocumentText />,
    },
    { to: "/admin/users", label: "Manage Users", icon: <HiOutlineUsers /> },
    {
      to: "/home",
      label: "Back to Home",
      icon: <HiOutlineHome />,
      danger: true,
    },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow text-gray-700 hover:bg-gray-100 transition"
      >
        {sidebarOpen ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
      </button>

      <aside
        className={`fixed md:sticky h-screen z-40 top-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out
        bg-white w-64 border-r border-r-gray-300 flex flex-col`}
      >
        <div className="p-5 border-b border-b-gray-300 flex justify-between items-center md:block">
          <div className="text-2xl font-bold text-blue-600 tracking-tight">
            Admin Panel
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600 text-2xl font-bold px-2"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-lg font-medium transition-colors duration-150
                  ${
                    item.danger
                      ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                      : active
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <footer className="p-4 text-xs text-gray-500 border-t mt-auto text-center">
          © {new Date().getFullYear()} CampusPulse
        </footer>
      </aside>
    </>
  );
};

export default AdminSidebar;
