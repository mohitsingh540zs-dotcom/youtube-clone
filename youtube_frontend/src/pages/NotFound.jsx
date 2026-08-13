import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 w-full max-w-md bg-gray-200 flex flex-col gap-4 m-4 justify-center items-center rounded-xl border border-gray-300">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Oops, Page Not Found
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl font-semibold animate-pulse">404</p>

        <p className="text-lg sm:text-xl md:text-2xl text-center font-semibold">
          Seems like you redirected to error page
        </p>

        <Link to={"/"} className="bg-black text-white rounded-full px-4 py-2">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
