import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePlusCircle,
  AiOutlineBell,
  AiOutlineSolution,
  AiOutlineBulb,
} from "react-icons/ai";

import { NavLink } from "react-router-dom";

export default function MobileNav() {
  const navItems = [
    { name: "Home", icon: <AiOutlineHome size={22} />, path: "/home" },
    {
      name: "Report",
      icon: <AiOutlinePlusCircle size={22} />,
      path: "/create",
    },
    { name: "Profile", icon: <AiOutlineUser size={22} />, path: "/profile" },
    {
      name: "About",
      icon: <AiOutlineBulb size={22} />,
      path: "/about",
    },
    {
      name: "Admin",
      icon: <AiOutlineSolution size={22} />,
      path: "/admin/dashboard",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs font-medium transition-colors duration-200 ${
                isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-500"
              }`
            }
          >
            {item.icon}
            <span className="text-[10px] mt-1">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
