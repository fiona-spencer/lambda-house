import React from 'react';
import plaImg from '../../assets/pla.png';
import absImg from '../../assets/abs.png';
import tpuImg from '../../assets/tpu.png';
import petgImg from '../../assets/petg.png';
import nylonImg from '../../assets/nylon.png';
import woodFillImg from '../../assets/woodfill.png';

const filamentData = [
  { name: "PLA", image: plaImg, available: true, description: "Easy-to-print, biodegradable, and versatile." },
  { name: "ABS", image: absImg, available: true, description: "Strong and heat-resistant, ideal for functional parts." },
  { name: "TPU", image: tpuImg, available: false, description: "Flexible and durable, good for elastic parts." },
  { name: "PETG", image: petgImg, available: true, description: "Tough, with good chemical resistance." },
  { name: "Nylon", image: nylonImg, available: false, description: "Very strong and wear-resistant filament." },
  { name: "Wood Fill", image: woodFillImg, available: true, description: "PLA infused with wood fibers for a natural look." },
];

export default function Filament() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filamentData.map((filament, idx) => (
          <div
            key={idx}
            className={`p-4 rounded border flex flex-col items-center text-center ${
              filament.available ? "border-pink-500 bg-pink-50" : "border-gray-300 bg-gray-100"
            }`}
          >
            <img
              src={filament.image}
              alt={filament.name}
              className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-white shadow"
            />
            <h2 className="text-xl font-semibold mb-1">{filament.name}</h2>
            <p className="text-gray-700 mb-2 text-sm">{filament.description}</p>
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
