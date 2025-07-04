import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const navItems = [
  {
    page: "Studio",
    link: "/studio",
    subpages: [
      { title: "Custom Prints", link: "/studio/custom-prints" },
      { title: "Upload Files", link: "/studio/upload" },
      { title: "Settings", link: "/studio/settings" },
    ],
  },
  // ... same navItems as before ...
];

export default function NavBar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (page) => {
    setOpenDropdown((current) => (current === page ? null : page));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".nav-item")) {
        setOpenDropdown(null);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-pink-500 p-4 flex justify-center space-x-8 shadow-md relative">
      {navItems.map(({ page, link, subpages }) => {
        const isOpen = openDropdown === page;

        return (
          <div key={page} className="relative nav-item">
            <div className="flex items-center space-x-1">
              <Link
                to={link}
                className="text-gray-800 font-semibold hover:text-gray-600"
                onClick={() => setOpenDropdown(null)} // close dropdown when clicking top link
              >
                {page}
              </Link>
              {subpages && subpages.length > 0 && (
                <button
                  onClick={() => toggleDropdown(page)}
                  className="text-gray-800 font-semibold hover:text-gray-600 focus:outline-none"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  ▼
                </button>
              )}
            </div>

            {subpages && subpages.length > 0 && isOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border-4 border-black z-50">
                <ul>
                  {subpages.map(({ title, link: subLink }) => (
                    <li key={title}>
                      <Link
                        to={subLink}
                        className="block px-4 py-2 text-gray-700 hover:bg-pink-500 hover:text-white"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
