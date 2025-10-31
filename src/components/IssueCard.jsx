import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiArrowFatLineUp } from "react-icons/pi";
import { useApi } from "../hooks/useApi";
import { IoPersonCircleSharp } from "react-icons/io5";

export default function IssueCard({ issue }) {
  const navigate = useNavigate();

  const voteApi = useApi();
  const issueApi = useApi();

  const [votes, setVotes] = useState(issue.votes || 0);
  const [voted, setVoted] = useState(issue.hasVoted || false);

  const text =
    issue.description.length > 200 ? (
      <>
        {issue.description.substring(0, 200)}{" "}
        <b className="text-gray-600">...see more</b>
      </>
    ) : (
      issue.description
    );

  const handleVote = async (e) => {
    e.stopPropagation();

    const newVoteState = !voted;
    setVoted(newVoteState);
    setVotes((prev) => prev + (newVoteState ? 1 : -1));

    const res = await voteApi.fetchApi(`/issues/${issue._id}/vote`, "PUT");

    if (res?.votes !== undefined) setVotes(res.votes);
    if (res?.hasVoted !== undefined) setVoted(res.hasVoted);
  };

  useEffect(() => {
    issueApi.fetchApi(`/issues/issue/${issue._id}`);
  }, []);

  return (
    <div
      onClick={() => navigate(`/issues/${issue._id}`)}
      className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 mb-4 hover:shadow-md transition cursor-pointer"
    >
      <div
        className="flex justify-between items-center text-xs text-gray-500 mb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Link to={`/profile/${issue.createdBy._id}`}>
          <span className="font-bold text-base text-black flex justify-center items-center">
            <IoPersonCircleSharp size={30} color="gray" />{" "}
            <span className="pl-2">@{issue.createdBy.username}</span>
          </span>
        </Link>
        <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{issue.title}</h3>
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            issue.status === "resolved"
              ? "bg-green-100 text-green-700"
              : issue.status === "in-progress"
              ? "bg-sky-100 text-sky-700"
              : issue.status === "rejected"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {issue.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-3">{text}</p>

      {issue.image && (
        <div className="mb-4">
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-64 object-cover rounded-lg border border-gray-200 shadow-sm hover:opacity-90 transition"
          />
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={handleVote}
          className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-lg transition ${
            voted
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <PiArrowFatLineUp />
          {votes}
        </button>
        <button
          className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-lg transition bg-gray-100 text-gray-600 hover:bg-gray-200`}
        >
          See Comments
        </button>
      </div>
    </div>
  );
}
