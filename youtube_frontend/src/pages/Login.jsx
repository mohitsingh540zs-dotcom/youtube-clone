import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await login(formData);

      // Backend should return { success, user, message }
      setUser(data);

      navigate("/", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white border rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue to YouTube Clone
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-medium"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-semibold py-3 rounded-xl transition cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;