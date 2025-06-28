import React, { useState } from 'react';
import { Avatar, Dropdown } from 'flowbite-react';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  // Add this - cart count variable
  const cartCount = 3; // replace with real count from your state/store

  const user = {
    name: "Fiona Spencer",
    avatarUrl: "https://i.pravatar.cc/40",
  };

  return (
    <header className="bg-white shadow-md py-4 mb-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-600">Lambda House</h1>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl mx-6">
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="flex items-center space-x-6">
          <Dropdown
            inline
            label={
              loggedIn ? (
                <Avatar alt="User avatar" img={user.avatarUrl} rounded />
              ) : (
                <FaUserCircle className="text-gray-600 text-3xl cursor-pointer" />
              )
            }
          >
            {loggedIn ? (
              <>
                <Dropdown.Header>
                  <span className="block text-sm">{user.name}</span>
                  <span className="block truncate text-sm font-medium">
                    user@example.com
                  </span>
                </Dropdown.Header>
                <Dropdown.Item onClick={() => alert("Go to profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => alert("Go to settings")}>
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setLoggedIn(false)}>
                  Sign out
                </Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item onClick={() => setLoggedIn(true)}>
                  Sign in
                </Dropdown.Item>
                <Dropdown.Item onClick={() => alert("Go to Register")}>
                  Register
                </Dropdown.Item>
              </>
            )}
          </Dropdown>

          <button
            aria-label="Shopping Cart"
            className="relative text-gray-600 hover:text-gray-900"
            onClick={() => alert('Go to cart')}
          >
            <FaShoppingCart className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
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
