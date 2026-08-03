import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
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

        <form className="flex flex-col gap-4">

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
                type="text"
                placeholder="Enter your username"
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
                placeholder="Enter your email"
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
              placeholder="Enter your password"
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
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

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
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-xl p-3 cursor-pointer"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-xl"
          >
            Register
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