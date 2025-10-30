import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen w-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex flex-1 w-screen flex-col">
        <header className="sticky top-0 bg-white border-b shadow-sm flex items-center justify-between p-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-gray-100 text-xl"
          >
            ☰
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Admin</h2>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
