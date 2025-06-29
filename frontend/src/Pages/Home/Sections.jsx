import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const sectionData = [
  {
    title: "Custom 3D Prints",
    subtitle: "Made for you",
    description: "Get tailor-made prints using PLA, TPU, ABS, and more.",
    link: "/studio",
  },
  {
    title: "Ready-to-Print Models",
    subtitle: "Download & Go",
    description: "Browse STL files from our curated design collection.",
    link: "/products",
  },
  {
    title: "Projects & Builds",
    subtitle: "Innovation in action",
    description: "Explore our electronics-integrated prototypes and devices.",
    link: "/projects",
  },
  {
    title: "Logs & Insights",
    subtitle: "Behind the scenes",
    description: "See our process, experiments, and ideas in progress.",
    link: "/logs",
  },
  {
    title: "Learning Resources",
    subtitle: "For makers & tinkerers",
    description: "Tutorials, tips, and educational content to grow your skills.",
    link: "/about",
  },
];

export default function Sections() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-0">
      {sectionData.map((item, index) => (
        <div
          key={index}
          className="bg-white text-black p-6 border border-black flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
            <h4 className="text-md font-medium text-gray-600 mb-2">{item.subtitle}</h4>
            <p className="text-sm text-gray-800 mb-4">{item.description}</p>
          </div>
          <Link to={item.link} className="flex items-center text-blue-600 hover:underline mt-auto">
            Learn More <FaArrowRight className="ml-2" />
          </Link>
        </div>
      ))}
    </div>
  );
}
