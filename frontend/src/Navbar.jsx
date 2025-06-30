import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Dropdown } from "flowbite-react";

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
    <Navbar fluid rounded className="bg-pink-500 px-6 py-3 shadow-md justify-center">
      <div className="flex space-x-6">
        {navItems.map(({ page, link, subpages }) => (
          <Dropdown
            key={page}
            inline
            label={
              <Link
                to={link}
                className="text-gray-800 font-semibold hover:text-gray-600"
              >
                {page}
              </Link>
            }
            dismissOnClick={false}
            placement="bottom"
            arrowIcon={false}
            onOpenChange={(open) => {
              // Optional: control open state if needed
            }}
            className="group"
            >
            {subpages.map(({ title, link: subLink }) => (
              <Dropdown.Item key={title} as="a" href={subLink}>
                {title}
              </Dropdown.Item>
            ))}
          </Dropdown>
        ))}
      </div>
    </Navbar>
  );
}
