import React from "react";
import { Link } from "react-router-dom";
import LogoImage from '../assets/lg-color-logo.svg'

export default function Construction() {
 return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <img
        src={LogoImage}
        alt="Under Construction"
        className="w-40 h-40 mb-6"
      />
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        This page is currently under construction
      </h1>
      <Link
        to="/"
        className="text-blue-600 hover:underline text-lg"
      >
        Go back to Home
      </Link>
    </div>
  );
}
