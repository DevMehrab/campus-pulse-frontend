import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import IssueRow from "../../components/IssueRow";
import { useNavigate } from "react-router-dom";

export default function ManageIssues() {
  const { data: issues, loading, error, fetchApi } = useApi();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchApi("/issues");
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await fetchApi(`/admin/issues/${id}`, "PUT", { status: newStatus });
    setMessage("✅ Issue status updated successfully");
    fetchApi("/issues");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;
    await fetchApi(`/issues/${id}`, "DELETE");
    setMessage("🗑️ Issue deleted successfully");
    fetchApi("/issues");
    setTimeout(() => setMessage(""), 2000);
  };
  const handleView = async (id) => {
    navigate(`/issues/${id}`);
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 animate-pulse">Loading issues...</p>
      </div>
    );

  if (error)
    return <div className="text-center text-red-600 mt-10">❌ {error}</div>;

  if (!issues || issues.length === 0)
    return (
      <div className="text-center text-gray-500 mt-20">No issues found.</div>
    );

  return (
    <div className="w-full pt-4 md:pt-0 md:py-6 mx-auto max-w-6xl bg-gray-50">
      <div className="text-2xl font-bold text-gray-800 mb-6">Manage Issues</div>

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

      <IssueRow
        issues={issues}
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
        handleView={handleView}
      />
    </div>
  );
}
