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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
      {sectionData.map((item, index) => (
        <div
          key={index}
      className="border border-black border-t-0 border-l-0 first:border-t first:sm:border-t first:md:border-t sm:first:border-l md:first:border-l p-6"
        >
          <div>
            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
            <h4 className="text-md font-medium text-gray-600 mb-2">{item.subtitle}</h4>
            <p className="text-sm text-gray-800 mb-4">{item.description}</p>
          </div>
<Link to={item.link} className="mt-auto flex justify-center group">
  <span className="px-10 py-2 rounded-full transition duration-300 group-hover:bg-pink-500/50">
    <FaArrowRight className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
  </span>
</Link>


        </div>
      ))}
    </div>
  );
}
