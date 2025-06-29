import React from 'react';

const filamentData = [
  { name: "PLA", available: true, description: "Easy-to-print, biodegradable, and versatile." },
  { name: "ABS", available: true, description: "Strong and heat-resistant, ideal for functional parts." },
  { name: "TPU", available: false, description: "Flexible and durable, good for elastic parts." },
  { name: "PETG", available: true, description: "Tough, with good chemical resistance." },
  { name: "Nylon", available: false, description: "Very strong and wear-resistant filament." },
  { name: "Wood Fill", available: true, description: "PLA infused with wood fibers for a natural look." },
];

export default function Filament() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded shadow">
      <h1 className="text-4xl font-bold mb-6">Filament Types</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filamentData.map((filament, idx) => (
          <div
            key={idx}
            className={`p-4 rounded border ${
              filament.available ? "border-pink-500 bg-pink-50" : "border-gray-300 bg-gray-100"
            }`}
          >
            <h2 className="text-xl font-semibold mb-1">{filament.name}</h2>
            <p className="text-gray-700 mb-2">{filament.description}</p>
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                filament.available ? "bg-pink-500 text-white" : "bg-gray-400 text-gray-800"
              }`}
            >
              {filament.available ? "Available" : "Unavailable"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
