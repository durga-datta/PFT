import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-purple-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="space-x-4">
          <Link
            to="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;