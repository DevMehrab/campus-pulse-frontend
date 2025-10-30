import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Link } from "react-router-dom";

export default function ManageUsers() {
  const { data: users, loading, error, fetchApi } = useApi();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchApi("/users/all");
  }, []);

  const handleRoleChange = async (id, newRole) => {
    await fetchApi(`/admin/users/${id}/role`, "PUT", { role: newRole });
    setMessage("✅ User role updated");
    fetchApi("admin/users");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await fetchApi(`/admin/users/${id}`, "DELETE");
    setMessage("🗑️ User deleted successfully");
    fetchApi("/admin/users");
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 animate-pulse">Loading users...</p>
      </div>
    );

  if (error)
    return <div className="text-center text-red-600 mt-10">❌ {error}</div>;

  if (!users || users.length === 0)
    return (
      <div className="text-center text-gray-500 mt-20">No users found.</div>
    );

  return (
    <div className="pt-4 md:pt-0 w-full max-w-6xl mx-auto md:py-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>

      {message && (
        <div
          className={`mb-4 text-center font-medium ${
            message.startsWith("✅") || message.startsWith("🗑️")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="p-3 font-semibold text-left">Name</th>
              <th className="p-3 font-semibold text-left hidden sm:table-cell">
                Email
              </th>
              <th className="p-3 font-semibold text-left hidden md:table-cell">
                Joined
              </th>
              <th className="p-3 font-semibold text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="odd:bg-white even:bg-slate-50 hover:bg-gray-50 transition"
              >
                <td className="p-3 py-4 font-medium">
                  <Link
                    to={`/profile/${user._id}`}
                    className="hover:text-blue-600 hover:underline"
                  >
                    {user.username}
                  </Link>

                  <div className="block sm:hidden text-xs text-gray-500 mt-1">
                    <p>{user.email}</p>
                    <p className="capitalize">{user.role}</p>
                    <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </td>

                <td className="p-3 hidden sm:table-cell">{user.email}</td>

                <td className="p-3 text-gray-600 hidden md:table-cell">
                  {new Date(user.createdAt).toDateString()}
                </td>

                <td className="p-3">
                  {user.role === "admin" ? (
                    <span className="text-gray-400 italic">Protected</span>
                  ) : (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
