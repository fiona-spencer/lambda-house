import React, { useState } from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  const cartCount = 3; // replace with your actual cart count

  const user = {
    name: "Fiona Spencer",
    avatarUrl: "https://i.pravatar.cc/40",
  };

  return (
    <header className="bg-black shadow-inner py-4 mb-6">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#FFF01F] drop-shadow-[0_0_8px_#FFF01F]">
          Lambda House
        </h1>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl mx-6">
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-700 bg-black text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFF01F] placeholder-gray-500"
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
                  className="ring-2 ring-[#FFF01F]"
                />
              ) : (
                <FaUserCircle className="text-[#00FFFF] text-4xl cursor-pointer drop-shadow-[0_0_10px_#00FFFF] hover:drop-shadow-[0_0_20px_#00FFFF] transition duration-300" />
              )
            }
          >
            {loggedIn ? (
              <>
                <Dropdown.Header>
                  <span className="block text-sm text-gray-200">{user.name}</span>
                  <span className="block truncate text-sm font-medium text-gray-400">
                    user@example.com
                  </span>
                </Dropdown.Header>
                <Dropdown.Item
                  onClick={() => alert("Go to profile")}
                  className="hover:text-[#FFF01F]"
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => alert("Go to settings")}
                  className="hover:text-[#FFF01F]"
                >
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => setLoggedIn(false)}
                  className="hover:text-[#FFF01F]"
                >
                  Sign out
                </Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item
                  onClick={() => setLoggedIn(true)}
                  className="hover:text-[#FFF01F]"
                >
                  Sign in
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => alert("Go to Register")}
                  className="hover:text-[#FFF01F]"
                >
                  Register
                </Dropdown.Item>
              </>
            )}
          </Dropdown>

          <button
            aria-label="Shopping Cart"
            className="relative text-[#FF00FF] hover:text-[#FF00FF] drop-shadow-[0_0_10px_#FF00FF] hover:drop-shadow-[0_0_20px_#FF00FF] transition duration-300"
            onClick={() => alert("Go to cart")}
          >
            <FaShoppingCart className="text-4xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-3 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow-lg">
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
