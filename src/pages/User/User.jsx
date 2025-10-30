import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, loading, error, fetchApi } = useApi();
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchApi(`/admin/users/${id}`);
  }, [id]);

  useEffect(() => {
    if (user && user.role) setRole(user.role);
  }, [user]);

  const handleRoleChange = async () => {
    await fetchApi(`admin/users/${id}/role`, "PUT", { role });
    setMessage("✅ User role updated successfully");
    setTimeout(() => setMessage(""), 2500);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await fetchApi(`admin/users/${id}`, "DELETE");
    navigate("/admin/manage-users");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 animate-pulse">
        Loading user details...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-10">
        ❌ Failed to load user: {error}
      </div>
    );

  if (!user)
    return (
      <div className="text-center text-gray-500 mt-10">User not found.</div>
    );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h1>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-blue-400"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={handleRoleChange}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        {message && (
          <div className="text-center text-green-600 font-medium mb-4">
            {message}
          </div>
        )}

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            User Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <span className="font-medium">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-medium">Department:</span>{" "}
              {user.department || "N/A"}
            </div>
            <div>
              <span className="font-medium">Role:</span> {user.role}
            </div>
            <div>
              <span className="font-medium">Joined:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Reported Issues
          </h3>

          {user.issues && user.issues.length > 0 ? (
            <div className="space-y-3">
              {user.issues.map((issue) => (
                <div
                  key={issue._id}
                  className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-700">
                      {issue.title}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        issue.status === "resolved"
                          ? "bg-green-100 text-green-600"
                          : issue.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {issue.category || "General"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No issues reported.</p>
          )}
        </div>
      </div>
    </div>
  );
}
