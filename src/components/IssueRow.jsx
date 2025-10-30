import React from "react";
import { HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function IssueRow({
  issues,
  handleDelete,
  handleStatusChange,
  handleView,
}) {
  return (
    <div className="bg-white shadow-sm rounded-xl">
      <div className="hidden md:block overflow-x-auto rounded-xl">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="p-4 text-left font-semibold">Title</th>
              <th className="p-4 text-left font-semibold">Category</th>
              <th className="p-4 text-left font-semibold">Status</th>
              <th className="p-4 text-left font-semibold">Reported By</th>
              <th className="p-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, idx) => (
              <tr
                key={issue._id}
                className={`transition-colors duration-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50/40`}
              >
                <td className="p-4 font-medium text-gray-900">
                  <Link to={`/issues/${issue._id}`}>
                    {" "}
                    {issue.title.length > 10
                      ? `${issue.title.substring(0, 10)} ...`
                      : issue.title}
                  </Link>
                </td>
                <td className="p-4 capitalize text-gray-700">
                  {issue.category || "General"}
                </td>
                <td className="p-4">
                  <select
                    value={issue.status}
                    onChange={(e) =>
                      handleStatusChange(issue._id, e.target.value)
                    }
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-slate-100 hover:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-4 text-gray-600">
                  {issue.createdBy?.username || "N/A"}
                </td>
                <td className="p-4 text-right flex justify-end items-center gap-3">
                  <button
                    onClick={() => handleView(issue._id)}
                    className="inline-flex items-center gap-1 bg-blue-100 p-3 rounded text-blue-600 hover:text-blue-700 font-medium transition"
                  >
                    <HiOutlineEye className="text-lg" />
                    <Link to={`/issues/${issue._id}`}>View</Link>
                  </button>
                  <button
                    onClick={() => handleDelete(issue._id)}
                    className="inline-flex items-center gap-1 bg-red-100 p-3 rounded text-red-600 hover:text-red-700 font-medium transition"
                  >
                    <HiOutlineTrash className="text-lg" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {issues.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-400 text-sm italic"
                >
                  No issues found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-100">
        {issues.length === 0 ? (
          <div className="p-6 text-center text-gray-400 text-sm italic">
            No issues found
          </div>
        ) : (
          issues.map((issue) => (
            <div
              key={issue._id}
              className="p-4 hover:bg-gray-50 transition rounded-xl"
            >
              <h3 className="text-base font-semibold text-gray-900 truncate">
                <Link to={`/issues/${issue._id}`}>
                  {issue.title.length > 10
                    ? `${issue.title.substring(0, 10)} . . .`
                    : issue.title}
                </Link>
              </h3>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-600 font-medium">
                  Status:
                </span>
                <select
                  value={issue.status}
                  onChange={(e) =>
                    handleStatusChange(issue._id, e.target.value)
                  }
                  className="text-sm border-gray-300 rounded-md px-2 py-1 bg-white hover:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="mt-3 flex justify-end gap-3">
                <button
                  onClick={() => handleView(issue._id)}
                  className="inline-flex bg-transparent items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  <HiOutlineEye className="text-lg" />
                  View
                </button>
                <button
                  onClick={() => handleDelete(issue._id)}
                  className="inline-flex bg-transparent items-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  <HiOutlineTrash className="text-lg" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
