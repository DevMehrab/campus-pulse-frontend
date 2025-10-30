import { useContext, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateIssue() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });
  const { data, loading, error, fetchApi } = useApi();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("description", form.description);
    if (form.image) formData.append("file", form.image);

    const data = await fetchApi("/issues/create", "POST", formData, true);
    if (data) {
      navigate("/home");
      toast.success("Issue Posted successfully!");
    } else {
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-2xl mx-auto h-screen w-full p-4 px-8 mb-12 bg-transparent">
      <div className="text-xl font-semibold text-gray-900 mb-8 ">
        Report a New Issue
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <>{error.message}</>}
        <div>
          <label
            htmlFor="title"
            className="block text-gray-800 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Enter a concise issue title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 transition"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-gray-800 font-medium mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, category: e.target.value }))
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select category</option>
            <option value="maintenance">Maintenance</option>
            <option value="facilities">Facilities</option>
            <option value="academic">Academic</option>
            <option value="security">Security</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-gray-800 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Describe the issue in detail..."
            required
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 resize-none transition"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-gray-800 font-medium mb-2"
          >
            Attach File (optional)
          </label>
          <input
            type="file"
            id="file"
            accept="image/*, .pdf, .docx"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, image: e.target.files[0] }))
            }
            className="w-full text-gray-700 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <p className="text-sm text-gray-500 mt-1">
            You can upload images, PDFs, or documents.
          </p>
        </div>

        <button
          type="submit"
          className={`w-full py-3 font-semibold rounded-lg text-white text-lg transition-all duration-200 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400`}
        >
          Submit Issue
        </button>
        {error && <>{error.message}</>}
      </form>
    </div>
  );
}
