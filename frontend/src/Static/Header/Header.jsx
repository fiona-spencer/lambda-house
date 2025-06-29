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
    {/* Row 1: Logo left, User+Cart right */}
    <div className="flex justify-between items-center flex-wrap">
      <Link to="/" className="flex items-center order-1 w-auto">
        <img
          src={lhSmallLogo}
          alt="Lambda House Logo"
          className="h-16 w-auto object-contain hover:opacity-50 transition duration-200"
        />
      </Link>

      <div className="flex items-center space-x-10 order-2 w-auto">
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

    {/* Row 2: Search bar full width on small screens */}
    <div className="relative mt-4 w-full sm:flex sm:mt-0 sm:w-auto sm:order-none">
      <input
        type="search"
        placeholder="Search"
        className="w-full border-b border-black bg-transparent text-black placeholder-black/60 py-2 pr-10 focus:outline-none focus:border-b-2 focus:border-black sm:w-auto"
      />
      <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
    </div>
  </div>
</header>
  );
}

export default Header;
