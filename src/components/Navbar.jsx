import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { getUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(getUser()));
  function handleProfile() {
    navigate("/profile");
  }
  return (
    <nav className="w-full h-fit z-50 fixed bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="font-bold text-2xl text-indigo-600 tracking-wide">
        Campus Pulse
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="hidden sm:block text-gray-700 font-medium">
              Hi, {user.username.split(" ")[0]}
            </span>
            <div
              onClick={handleProfile}
              className="px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-500 text-sm transition"
            >
              {user.username.split(" ")[0].split("")[0].toUpperCase()}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
