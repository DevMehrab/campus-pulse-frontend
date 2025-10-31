import { Link } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";

export default function Comment({ comments }) {
  return (
    <div className="space-y-4">
      <div>Recent Comments</div>
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">
          No comments yet. Be the first to comment.
        </p>
      ) : (
        comments.map((c) => (
          <div
            key={c._id}
            className={
              c.user.role === "student"
                ? "border w-full sm:max-w-1/2 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
                : "border w-full sm:max-w-1/2 border-teal-800 rounded-lg p-3 bg-teal-50 hover:bg-gray-100 transition"
            }
          >
            <div className="flex justify-between items-center mb-1">
              <Link
                to={`/profile/${c.user._id}`}
                className={
                  c.user.role === "admin"
                    ? "font-medium text-teal-800 flex justify-center items-center"
                    : "font-medium text-gray-800 flex justify-center items-center"
                }
              >
                {c.user.role === "admin" ? (
                  <MdAdminPanelSettings size={22} />
                ) : (
                  <IoPersonCircleSharp size={22} />
                )}{" "}
                <span className="ml-1 mr-3 flex">
                  {c?.user.username || "User"}
                </span>
              </Link>
              <span className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleTimeString()}{" "}
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 text-sm ">{c.text}</p>
          </div>
        ))
      )}
    </div>
  );
}
