import { useEffect, useState } from "react";
import StateCard from "../../components/StateCard";
import { useApi } from "../../hooks/useApi";
import ManageIssues from "./ManageIssues";
import ManageUsers from "./ManageUsers";

export default function Dashboard() {
  const { data, loading, error, fetchApi } = useApi();

  useEffect(() => {
    fetchApi("/admin/stats");
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col w-full mx-auto md:flex-row min-h-screen bg-gray-50">
      <main className="flex-1 sm:p-6">
        <div className="text-2xl font-bold text-gray-800 mb-6">
          Dashboard Overview
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StateCard
            title="Total Users"
            value={data?.totalUsers}
            color="bg-blue-500"
          />
          <StateCard
            title="Total Issues"
            value={data?.totalIssues}
            color="bg-indigo-500"
          />
          <StateCard
            title="Resolved Issues"
            value={data?.resolvedIssues}
            color="bg-green-500"
          />
          <StateCard
            title="In Progress"
            value={data?.inProgressIssues}
            color="bg-yellow-500"
          />
          <StateCard
            title="Pending Issues"
            value={data?.pendingIssues}
            color="bg-orange-500"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-6">
          <ManageIssues />
          <ManageUsers />
        </div>
      </main>
    </div>
  );
}
