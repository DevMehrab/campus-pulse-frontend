import { useContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import IssueCard from "../../components/IssueCard";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  const userApi = useApi();
  const issueApi = useApi();
  const updateUserApi = useApi();
  const [editMode, setEditMode] = useState(false);
  const [issues, setIssues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });
  const user = userApi.data;
  const { getUser } = useContext(AuthContext);
  const storedUser = getUser() ? JSON.parse(getUser()) : null;
  const userId = storedUser?._id;

  useEffect(() => {
    console.log("param Id:", id);
    if (id) {
      userApi.fetchApi(`/users/${id}`);
      issueApi.fetchApi(`/issues/user/${id}`);
      console.log("Your user: ", userApi.data, userApi.error);
    } else {
      userApi.fetchApi("/auth/me");
      issueApi.fetchApi(`/issues/user/${userId}`);
    }
  }, [userId, id]);

  useEffect(() => {
    if (issueApi.data) setIssues(issueApi.data);
  }, [issueApi.data]);
  useEffect(() => {
    if (updateUserApi.data) return;
  }, [updateUserApi.data]);
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        department: user.department || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const res = await updateUserApi.fetchApi("/users/update", "PUT", formData);
    if (!res.error) {
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } else {
      toast.error("Failed to update profile.");
    }
  };

  if (userApi.loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 animate-pulse">
        Loading profile...
      </div>
    );

  if (userApi.error)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load profile: {userApi.error}
      </div>
    );

  if (!user)
    return (
      <div className="text-center text-gray-500 mt-10">No user found.</div>
    );

  return (
    <div className="max-w-3xl w-full p-4 px-8 mb-12 mx-auto md:p-8 bg-transparent">
      <div className="md:p-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-3xl font-bold">
            {user.name?.charAt(0).toUpperCase() || "!"}
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            {user.name || "No Name"}
          </h2>
          <p className="text-gray-500 text-sm tracking-wide">
            @{user.username}
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-5 border-b pb-2">
            Account Details
          </h3>

          <div className="space-y-5">
            {["name", "email", "department"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  disabled={field === "email" || !editMode}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg text-gray-800 transition ${
                    field === "email"
                      ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                      : editMode
                      ? "bg-white border-blue-400 focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-100 border-gray-200 cursor-not-allowed"
                  }`}
                />
              </div>
            ))}
          </div>

          {!id && (
            <div className="mt-6 flex justify-end gap-3">
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Your Reported Issues
          </h3>

          {issues.length > 0 ? (
            <div className="space-y-3">
              {issues.map((issue) => (
                <IssueCard key={issue._id} issue={issue} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No issues reported yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
