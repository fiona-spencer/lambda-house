import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const sectionData = [
  {
    title: "STUDIO",
    subtitle: "Customize Your Prints",
    description: 
    "In-house CAD enables you to upload files, choose slicer settings & filament types, from small batches to large-scale, ensuring high-quality prints.",
    link: "/studio",
  },
  {
    title: "PRODUCTS",
    subtitle: "Download/Shop & Go",
  description: "Shop finished 3D prints, browse STL/3MF files from our curated design collection, and custom gear.",
    link: "/products",
  },
  {
    title: "PROJECTS",
    subtitle: "Innovation in action",
    description: 
    "Explore our electronics-integrated prototypes and devices.",
    link: "/projects",
  },
  {
    title: "LOGS",
    subtitle: "Behind the scenes",
    description: "See our process, experiments, and ideas in progress.",
    link: "/logs",
  },
  {
    title: "ABOUT",
    subtitle: "For makers & tinkerers",
  description: "Who we are — a Toronto-based 3D printing service. Get a quote or ask us anything.",
    link: "/about",
  },
];

export default function Sections() {
  return (
  <div className="-mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
  {sectionData.map((item, index) => (
    <div
      key={index}
      className="relative border border-black border-t-0 border-l-0 first:border-t first:sm:border-t first:md:border-t sm:first:border-l md:first:border-l p-6 flex flex-col"
    >
      <div>
        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
        <h4 className="text-md font-medium text-gray-600 mb-2">{item.subtitle}</h4>
        <p className="text-sm text-gray-800 mb-14">{item.description}</p>
      </div>

      <Link
        to={item.link}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center group"
      >
        <span className="px-10 py-2 rounded-full transition duration-300 group-hover:bg-pink-500/50">
          <FaArrowRight className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  ))}
</div>

  );
}
