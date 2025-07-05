import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  {
    page: "Products",
    link: "/products",
    subpages: [
      { title: "3D Prints", link: "/products/prints" },
      { title: "Files", link: "/products/files" },
      { title: "Custom Merch", link: "/products/merch" },
    ],
  },
  {
    page: "Projects",
    link: "/projects",
    subpages: [
      { title: "Prototypes", link: "/projects/prototypes" },
      { title: "Electronics", link: "/projects/electronics" },
    ],
  },
  {
    page: "Logs",
    link: "/logs",
    subpages: [
      { title: "Experiments", link: "/logs/experiments" },
      { title: "Ideas", link: "/logs/ideas" },
    ],
  },
  {
    page: "About",
    link: "/about",
    subpages: [
      { title: "Company Info", link: "/about/company" },
      { title: "Contact", link: "/about/contact" },
    ],
  },
];

export default function NavBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = (page) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(page);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <nav className="bg-pink-500 p-4 flex justify-center space-x-8 lg:space-x-36 shadow-md relative">
      {navItems.map(({ page, link, subpages }) => {
        const isOpen = openDropdown === page;

        return (
          <div
            key={page}
            className="relative nav-item"
            onMouseEnter={() => handleMouseEnter(page)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => navigate(link)}
              className="text-gray-800 font-semibold hover:text-white focus:outline-none"
              type="button"
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              {page}
            </button>

            {/* Dropdown */}
            {subpages && subpages.length > 0 && isOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border-4 border-black z-50 shadow-lg">
                <ul>
                  {subpages.map(({ title, link: subLink }) => (
                    <li key={title}>
                      <Link
                        to={subLink}
                        className="block px-4 py-2 text-gray-700 hover:bg-pink-500 hover:text-white"
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
