import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import InputField from "../../components/InputField";

export default function Login() {
  const navigate = useNavigate();
  const { login, getUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await login(formData);

      const user = JSON.parse(getUser());
      if (user.role === "student") {
        navigate("/home");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      }

      setSuccess("Login successful! Redirecting...");
    } catch (err) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4 w-screen">
      <div className="w-full max-w-lg p-10 transition-all duration-500">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Welcome Back
          </h2>
          <p className="text-lg text-gray-500">
            Log in to continue to Campus Pulse
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
            icon={FiMail}
            label="Email"
            name="email"
            type="email"
            placeholder="dev.mehrabhossain@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <InputField
            icon={FiLock}
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
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
                Signing In...
              </>
            ) : (
              <>
                Login Now
                <FiArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
