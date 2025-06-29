import React, { useState } from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { FaUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import lhSmallLogo from '../../assets/lh-name-logo.svg';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  const cartCount = 0;

  const user = {
    name: "Fiona Spencer",
    avatarUrl: "https://i.pravatar.cc/40",
  };

  return (
<header className="bg-white shadow-inner py-4">
  <div className="max-w-6xl mx-auto px-6">
    {/* Container flex for mobile: logo and user/cart on same row */}
    <div className="flex justify-between items-center mb-4">
      {/* Logo on left */}
      <Link to="/" className="flex items-center">
        <img
          src={lhSmallLogo}
          alt="Lambda House Logo"
          className="h-16 w-auto object-contain hover:opacity-50 transition duration-200"
        />
      </Link>

      {/* User + Cart on right */}
      <div className="flex items-center space-x-10">
        <Dropdown
          inline
          label={
            loggedIn ? (
              <Avatar
                alt="User avatar"
                img={user.avatarUrl}
                rounded
                className="ring-2 ring-black"
              />
            ) : (
              <FaUserCircle className="text-black text-4xl cursor-pointer transition duration-300" />
            )
          }
        >
          {/* Dropdown content */}
        </Dropdown>

        <button
          aria-label="Shopping Cart"
          className="relative text-black transition duration-300"
          onClick={() => alert("Go to cart")}
        >
          <FaShoppingCart className="text-4xl" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-3 bg-black text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold shadow-lg">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>

    {/* Search bar on its own row by default (mobile), but inline on sm+ */}
    <div className="relative w-full mb-4 sm:mb-0 sm:flex sm:items-center sm:w-auto">
      <input
        type="search"
        placeholder="Search"
        className="w-full border-b border-black bg-transparent text-black placeholder-black/60 py-2 pr-10 focus:outline-none focus:border-b-2 focus:border-black sm:w-80"
      />
      <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
    </div>

    {/* On sm+ screens, put all three inline */}
    <div className="hidden sm:flex sm:justify-between sm:items-center sm:space-x-6 max-w-6xl mx-auto">
      {/* Logo */}
      <Link to="/" className="flex items-center sm:order-1">
        <img
          src={lhSmallLogo}
          alt="Lambda House Logo"
          className="h-16 w-auto object-contain hover:opacity-50 transition duration-200"
        />
      </Link>

      {/* Search */}
      <div className="relative sm:order-2">
        <input
          type="search"
          placeholder="Search"
          className="w-80 border-b border-black bg-transparent text-black placeholder-black/60 py-2 pr-10 focus:outline-none focus:border-b-2 focus:border-black"
        />
        <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
      </div>

      {/* User + Cart */}
      <div className="flex items-center space-x-10 sm:order-3">
        <Dropdown
          inline
          label={
            loggedIn ? (
              <Avatar
                alt="User avatar"
                img={user.avatarUrl}
                rounded
                className="ring-2 ring-black"
              />
            ) : (
              <FaUserCircle className="text-black text-4xl cursor-pointer transition duration-300" />
            )
          }
        >
          {/* Dropdown content */}
        </Dropdown>

        <button
          aria-label="Shopping Cart"
          className="relative text-black transition duration-300"
          onClick={() => alert("Go to cart")}
        >
          <FaShoppingCart className="text-4xl" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-3 bg-black text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold shadow-lg">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  </div>
</header>

  );
}

export default Header;
