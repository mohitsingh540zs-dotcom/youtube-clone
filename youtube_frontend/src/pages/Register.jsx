import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth';

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await register(formData);

      if (data.message) {
        console.log(data.message);
      }

      navigate('/login', { replace: true });

    } catch (error) {
      setError(error.response?.data?.message || "Register Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-2">

      <div className="w-full max-w-lg bg-white border rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">
            Welcome
          </h1>

          <p className="text-gray-500 mt-2">
            Create account to continue YouTube Clone
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* username */}
            <div>
              <label
                htmlFor="username"
                className="block mb-2 font-medium"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                value={formData.value}
                onChange={handleChange}
                type="text"
                placeholder="Enter your username"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

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
                value={formData.value}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />
            </div>
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
              value={formData.value}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          {/* confirmPassword */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 font-medium"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.value}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />
          </div>
          {/* avatar */}
          <div>
            <label
              htmlFor="avatar"
              className="block mb-2 font-medium"
            >
              Profile Picture
            </label>

            <input
              id="avatar"
              name="avatar"
              onChange={handleChange}
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-xl p-3 cursor-pointer"
            />
          </div>
          {
            error && (
              <p className='text-red-500 font-semibold '>Already account exists</p>
            )
          }

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-xl"
          >
            {loading ? "Loading" : "Register"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Register */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>
  )
}

export default Register