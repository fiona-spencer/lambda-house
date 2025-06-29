import React from "react";

// Import your images here
import plaRedImg from "../../assets/pla-red.png";
import plaBlueImg from "../../assets/pla-blue.png";
import absBlackImg from "../../assets/abs-black.png";
import absWhiteImg from "../../assets/abs-white.png";
import petgClearImg from "../../assets/petg-clear.png";
import tpuGreenImg from "../../assets/tpu-green.png";
import woodFillImg from "../../assets/woodfill.png";

const filamentData = [
  {
    type: "PLA",
    filaments: [
      { name: "Red", available: true, description: "Bright red, easy to print.", image: plaRedImg },
      { name: "Blue", available: false, description: "Cool blue, temporarily out of stock.", image: plaBlueImg },
    ],
  },
  {
    type: "ABS",
    filaments: [
      { name: "Black", available: true, description: "Strong black for functional parts.", image: absBlackImg },
      { name: "White", available: true, description: "Clean white finish.", image: absWhiteImg },
    ],
  },
  {
    type: "PETG",
    filaments: [
      { name: "Clear", available: true, description: "Transparent and glossy.", image: petgClearImg },
    ],
  },
  {
    type: "TPU",
    filaments: [
      { name: "Green", available: false, description: "Flexible green filament.", image: tpuGreenImg },
    ],
  },
  {
    type: "Other",
    filaments: [
      { name: "Wood Fill", available: true, description: "PLA infused with wood fibers.", image: woodFillImg },
    ],
  },
];

export default function Filament() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white text-black rounded shadow space-y-10">
      {filamentData.map(({ type, filaments }) => (
        <div key={type}>
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">{type}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filaments.map(({ name, available, description, image }) => (
              <div
                key={name}
                className={`p-4 rounded border flex flex-col items-center text-center ${
                  available ? "border-pink-500 bg-pink-50" : "border-gray-300 bg-gray-100"
                }`}
              >
                <img
                  src={image}
                  alt={`${type} - ${name}`}
                  className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-white shadow"
                />
                <h3 className="text-xl font-semibold mb-1">{name}</h3>
                <p className="text-gray-700 mb-2 text-sm">{description}</p>
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    available ? "bg-pink-500 text-white" : "bg-gray-400 text-gray-800"
                  }`}
                >
                  {available ? "Available" : "Unavailable"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
