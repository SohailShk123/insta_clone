// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <p className="text-2xl text-gray-500 mt-4">Oops! Page not found.</p>
        <p className="text-gray-400 mt-4">The page you are looking for might have been removed or is temporarily unavailable.</p>
        <Link to={'/signup'} className="text-indigo-600 hover:underline mt-4 block">Go back to Home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
