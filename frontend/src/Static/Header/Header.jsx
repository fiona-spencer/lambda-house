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
  <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center">
    {/* Logo */}
    <Link to="/" className="flex items-center order-1 sm:order-1 w-auto">
      <img
        src={lhSmallLogo}
        alt="Lambda House Logo"
        className="sm:h-16 h-6 w-auto object-contain hover:opacity-50 transition duration-200"
      />
    </Link>

    {/* Search Bar */}
    <div className="flex-grow max-w-xl mx-6 relative order-3 sm:order-2 w-full sm:w-auto mt-4 sm:mt-0">
      <input
        type="search"
        placeholder="Search"
        className="w-full border-b border-black bg-transparent text-black placeholder-black/60 py-2 pr-10 focus:outline-none focus:border-b-2 focus:border-black"
      />
      <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
    </div>

    {/* User + Cart */}
    <div className="flex items-center space-x-10 order-2 sm:order-3 w-auto text-right">
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

      {/* Cart */}
      <button
        aria-label="Shopping Cart"
        className="relative text-black transition duration-300"
        onClick={() => alert("Go to cart")}
      >
        <FaShoppingCart className="text-4xl" />
        {cartCount > 0 && (
          <span className="absolute -top-1 bg-black text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold shadow-lg">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  </div>
</header>

  );
}

export default Header;
