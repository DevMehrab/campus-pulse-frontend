import React from "react";

export default function StateCard({ title, value, color }) {
  return (
    <div
      className={`p-5 rounded-xl shadow-sm bg-white border hover:shadow-md transition duration-200`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
      </div>
      <p className="text-3xl font-semibold text-gray-800 mt-3">{value}</p>
    </div>
  );
}
