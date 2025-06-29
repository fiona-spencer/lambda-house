import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-pink-500 pt-4 flex space-x-6 shadow-md justify-center">
      <Link to="/studio" className="text-gray-800 hover:text-gray-600 font-semibold">
        Studio
      </Link>
      <Link to="/products" className="text-gray-800 hover:text-gray-600 font-semibold">
        Products
      </Link>
      <Link to="/projects" className="text-gray-800 hover:text-gray-600 font-semibold">
        Projects
      </Link>
      <Link to="/logs" className="text-gray-800 hover:text-gray-600 font-semibold">
        Logs
      </Link>
      <Link to="/about" className="text-gray-800 hover:text-gray-600 font-semibold">
        About
      </Link>
    </nav>
  );
}