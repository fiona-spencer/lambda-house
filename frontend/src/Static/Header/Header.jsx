import React, { useState } from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import lhSmallLogo from '../../assets/lg-small-logo.svg';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  const cartCount = 0;

  const user = {
    name: "Fiona Spencer",
    avatarUrl: "https://i.pravatar.cc/40",
  };

  return (
    <header className="bg-white shadow-inner py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={lhSmallLogo}
            alt="Lambda House Logo"
            className="h-24 w-auto object-contain hover:opacity-50 transition duration-200"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl mx-6">
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-black bg-transparent text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder-black/60"
          />
        </div>

        {/* User + Cart */}
        <div className="flex items-center space-x-8">
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
            {loggedIn ? (
              <>
                <Dropdown.Header>
                  <span className="block text-sm text-black">{user.name}</span>
                  <span className="block truncate text-sm font-medium text-gray-600">
                    user@example.com
                  </span>
                </Dropdown.Header>
                <Dropdown.Item className="hover:text-black" onClick={() => alert("Go to profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item className="hover:text-black" onClick={() => alert("Go to settings")}>
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="hover:text-black" onClick={() => setLoggedIn(false)}>
                  Sign out
                </Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item className="hover:text-black" onClick={() => setLoggedIn(true)}>
                  Sign in
                </Dropdown.Item>
                <Dropdown.Item className="hover:text-black" onClick={() => alert("Go to Register")}>
                  Register
                </Dropdown.Item>
              </>
            )}
          </Dropdown>

          {/* Cart */}
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
    </header>
  );
}

export default Header;
