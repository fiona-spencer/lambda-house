import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownItem } from "flowbite-react";

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
    <nav className="bg-pink-500 p-4 flex justify-center space-x-8 shadow-md">
      {navItems.map(({ page, link, subpages }) => (
        <Dropdown
          key={page}
          label={
            <Link
              to={link}
              className="font-semibold text-gray-800 hover:text-pink-500 cursor-pointer"
            >
              {page}
            </Link>
          }
          inline
          dismissOnClick={false}
          className="bg-pink-500 text-black px-4 py-2 rounded hover:bg-pink-600 focus:ring-2 focus:ring-pink-400"
          renderTrigger={(triggerProps) => (
            <span {...triggerProps} className="cursor-pointer" />
          )}
        >
          {subpages.map(({ title, link: subLink }) => (
            <DropdownItem key={title} className="hover:text-pink-500">
              <Link to={subLink}>{title}</Link>
            </DropdownItem>
          ))}
        </Dropdown>
      ))}
    </nav>
  );
}
