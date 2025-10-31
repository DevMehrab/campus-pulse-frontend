import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import InputField from "../../components/InputField";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    department: "",
  });

  const { register } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        setError(
          "Username can only contain letters, numbers, and underscores — no spaces!"
        );
        return;
      }
      setLoading(true);
      await register(formData);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred during registration."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4 w-screen">
      <div className=" w-full max-w-lg p-10 transition-all duration-500">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Join Campus Pulse
          </h2>
          <p className="text-lg text-gray-500">
            Create your account to get started.
          </p>
        </div>

        {success && (
          <div
            className="flex items-center p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
            role="alert"
          >
            <FiCheckCircle className="w-5 h-5 mr-3" />
            <span className="font-medium">{success}</span>
          </div>
        )}
        {error && (
          <div
            className="flex items-center p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            <FiAlertCircle className="w-5 h-5 mr-3" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={FiUser}
            label="Username"
            name="username"
            minLength="3"
            placeholder="mehrab52"
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            icon={FiMail}
            label="Email"
            name="email"
            type="email"
            placeholder="dev.mehrabhossain@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            icon={FiLock}
            label="Password"
            name="password"
            type="password"
            minLength="6"
            placeholder="Min. 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-[1.01] disabled:bg-indigo-400"
          >
            {loading ? (
              <>
                <FiLoader className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Register Now
                <FiArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
