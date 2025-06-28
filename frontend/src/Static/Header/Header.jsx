import React, { useState } from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  const cartCount = 0; // replace with your actual cart count

  const user = {
    name: "Fiona Spencer",
    avatarUrl: "https://i.pravatar.cc/40",
  };

  return (
    <header className="bg-[#0d335cd7] shadow-inner py-4 mb-6">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
      
   <Link 
            to="/" 
            className="text-3xl font-extrabold text-white hover:font-bold"
          >Lambda House</Link>
        {/* Search Bar */}
        <div className="flex-grow max-w-xl mx-6">
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-white bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70"
          />
        </div>

        <div className="flex items-center space-x-8">
          <Dropdown
            inline
            label={
              loggedIn ? (
                <Avatar
                  alt="User avatar"
                  img={user.avatarUrl}
                  rounded
                  className="ring-2 ring-white"
                />
              ) : (
                <FaUserCircle className="text-white text-4xl cursor-pointer transition duration-300" />
              )
            }
          >
            {loggedIn ? (
              <>
                <Dropdown.Header>
                  <span className="block text-sm text-white">{user.name}</span>
                  <span className="block truncate text-sm font-medium text-white/70">
                    user@example.com
                  </span>
                </Dropdown.Header>
                <Dropdown.Item
                  onClick={() => alert("Go to profile")}
                  className="hover:text-white"
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => alert("Go to settings")}
                  className="hover:text-white"
                >
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => setLoggedIn(false)}
                  className="hover:text-white"
                >
                  Sign out
                </Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item
                  onClick={() => setLoggedIn(true)}
                  className="hover:text-white"
                >
                  Sign in
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => alert("Go to Register")}
                  className="hover:text-white"
                >
                  Register
                </Dropdown.Item>
              </>
            )}
          </Dropdown>

          <button
            aria-label="Shopping Cart"
            className="relative text-white transition duration-300"
            onClick={() => alert("Go to cart")}
          >
            <FaShoppingCart className="text-4xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-3 bg-white text-[#0d335cd7] rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold shadow-lg">
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
