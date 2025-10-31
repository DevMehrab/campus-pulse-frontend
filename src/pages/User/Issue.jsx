import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "../../context/AuthContext";
import Comment from "../../components/Comment";

export default function Issue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const issueApi = useApi();
  const commentApi = useApi();
  const getCommentApi = useApi();
  const { getUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [msg, setMsg] = useState("");
  const issue = issueApi.data;

  useEffect(() => {
    issueApi.fetchApi(`/issues/issue/${id}`);
  }, [id]);

  useEffect(() => {
    getCommentApi.fetchApi(`/comments/${id}`);
  }, [id]);

  useEffect(() => {
    if (getCommentApi.data) {
      setComments(getCommentApi.data);
    }
  }, [getCommentApi.data]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const res = await commentApi.fetchApi(`/comments/create`, "POST", {
      text: comment,
      userId: getUser() ? JSON.parse(getUser()) : null,
      issueId: id,
    });
    if (res) {
      setComments([...comments, res]);
      setComment("");
      setMsg("Comment added");
      await getCommentApi.fetchApi(`/comments/${id}`);
      setTimeout(() => setMsg(""), 2000);
    }
  };

  if (issueApi.loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 animate-pulse">Loading issue...</p>
      </div>
    );

  if (issueApi.error)
    return (
      <div className="text-center text-red-600 mt-10">{issueApi.error}</div>
    );
  if (!issue)
    return (
      <div className="text-center text-gray-500 mt-20">Issue not found.</div>
    );

  return (
    <div className="p-4 mb-12 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition"
        >
          ← Go Back
        </button>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {issue.title}
            </h1>
            <p className="text-sm text-gray-500">
              Posted by{" "}
              <span className="font-medium">{issue.createdBy?.username}</span> •{" "}
              {new Date(issue.createdAt).toLocaleDateString()}
            </p>
          </div>

          <span
            className={`w-fit mt-2 sm:mt-0 px-3 py-1 text-sm font-medium rounded-full ${
              issue.status === "resolved"
                ? "bg-green-100 text-green-700"
                : issue.status === "in-progress"
                ? "bg-sky-100 text-sky-700"
                : issue.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          {issue.description}
        </p>

        {issue.image && (
          <div className="mb-6">
            <img
              src={issue.image}
              alt="Issue"
              className="rounded-lg w-full max-h-[400px] object-cover"
            />
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Comments ({comments.length})
          </h2>

          <form onSubmit={handleAddComment} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
              rows="3"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Post Comment
              </button>
            </div>
          </form>

          {msg && (
            <p className="text-center text-green-600 font-medium mb-4">{msg}</p>
          )}

          <Comment comments={comments} />
        </div>
      </div>
    </div>
  );
}
