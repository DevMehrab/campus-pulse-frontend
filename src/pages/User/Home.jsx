import React from "react";
import IssueCard from "../../components/IssueCard";
import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";

export default function Home() {
  const { data, loading, error, fetchApi } = useApi();

  useEffect(() => {
    fetchApi("/issues");
  }, []);

  return (
    <div className="mb-12 p-4 px-4 md:px-8 h-auto w-full max-w-2xl mx-auto overflow-scroll">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Campus Issues Feed
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading...</p>
      ) : data.length > 0 ? (
        data.map((issue) => <IssueCard key={issue._id} issue={issue} />)
      ) : (
        <p className=" text-gray-500 py-2">
          No issues found. Be the first to report one!
        </p>
      )}
    </div>
  );
}
