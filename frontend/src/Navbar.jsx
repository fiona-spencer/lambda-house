import React, { useState, useRef } from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import { Link } from "react-router-dom";

const navItems = [
  {
    label: "STUDIO",
    link: "/studio",
    subpages: [
      { label: "Upload Files", link: "/studio/upload" },
      { label: "Settings", link: "/studio/settings" },
      { label: "Filaments", link: "/studio/filaments" },
    ],
  },
  {
    label: "PRODUCTS",
    link: "/products",
    subpages: [
      { label: "Shop Prints", link: "/products/prints" },
      { label: "Download Files", link: "/products/files" },
      { label: "Custom Gear", link: "/products/gear" },
    ],
  },
  {
    label: "PROJECTS",
    link: "/projects",
    subpages: [
      { label: "Prototypes", link: "/projects/prototypes" },
      { label: "Electronics", link: "/projects/electronics" },
    ],
  },
  {
    label: "LOGS",
    link: "/logs",
    subpages: [
      { label: "Process", link: "/logs/process" },
      { label: "Experiments", link: "/logs/experiments" },
      { label: "Ideas", link: "/logs/ideas" },
    ],
  },
  {
    label: "ABOUT",
    link: "/about",
    subpages: [
      { label: "Company", link: "/about/company" },
      { label: "Contact", link: "/about/contact" },
      { label: "Quotes", link: "/about/quotes" },
    ],
  },
];

export default function NavBar() {
  // Track open dropdown by index, or null if none open
  const [openIndex, setOpenIndex] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setOpenIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenIndex(null);
    }, 150);
  };

  return (
    <nav className="bg-pink-500 p-4 flex justify-center space-x-6 shadow-md">
      {navItems.map((item, index) => (
        <Dropdown
          key={index}
          label={
            <Link
              to={item.link}
              className={`font-semibold ${
                openIndex === index ? "text-pink-500" : "text-gray-800"
              } hover:text-pink-500 cursor-pointer`}
            >
              {item.label}
            </Link>
          }
          show={openIndex === index}
          dismissOnClick={false}
          onClick={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
          renderTrigger={(triggerProps) => (
            <span
              {...triggerProps}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer"
            />
          )}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {item.subpages.map((sub, subIndex) => (
            <DropdownItem key={subIndex}>
              <Link
                to={sub.link}
                className="hover:text-pink-500"
              >
                {sub.label}
              </Link>
            </DropdownItem>
          ))}
        </Dropdown>
      ))}
    </nav>
  );
}
