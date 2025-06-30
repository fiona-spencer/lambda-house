import React from "react";
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
  return (
    <nav className="bg-pink-500 p-4 flex justify-center space-x-8 shadow-md relative">
      {navItems.map(({ page, link, subpages }) => (
        <div key={page} className="relative group">
          <Link
            to={link}
            className="text-gray-800 font-semibold hover:text-gray-600"
          >
            {page}
          </Link>

          {/* Dropdown menu */}
          {subpages && subpages.length > 0 && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
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
      ))}
    </nav>
  );
}
