import { useState } from "react";

export const useApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApi = async (
    endpoint,
    method = "GET",
    body = {},
    isMultipart = false
  ) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      if (!isMultipart) {
        headers["Content-Type"] = "application/json";
      }

      const options = {
        method,
        headers,
      };

      if (body && method !== "GET") {
        options.body = isMultipart ? body : JSON.stringify(body);
      }
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api${endpoint}`,
        options
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setData(data);
      return data;
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchApi };
};
