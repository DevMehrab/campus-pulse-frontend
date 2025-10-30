import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div className="w-screen h-auto bg-gray-50 flex flex-col">
      <div className="flex w-full h-full">
        <main className="flex w-full flex-col h-full">
          <Navbar />
          <div className="flex flex-1 ">
            <Sidebar />
            <MobileNav />
            <div className="pt-16 w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
