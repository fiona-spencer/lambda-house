import React from 'react';
import printer from '../../assets/printer.png';
import hotend from '../../assets/hotend.jpg'; // <-- Add another image if you have one

export default function Equipment() {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white text-black rounded shadow-md">
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <img
          src={printer}
          alt="Bambu Lab Printing PS1 with AMS"
          className="w-full h-auto object-contain rounded"
        />
        <img
          src={hotend}
          alt="Alternate Printer Angle"
          className="w-full h-auto object-contain rounded"
        />
      </div>

      {/* Equipment Title */}
      <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">
        Bambu Lab PS1 with AMS
      </h2>

      {/* Specs Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700 mb-8">
        <li><strong>Nozzle:</strong> Hardened steel 0.4 mm</li>
        <li><strong>Extruders:</strong> 4 colour + 1 external</li>
        <li><strong>Bed Size:</strong> 256 × 256 mm</li>
        <li><strong>Max Volume:</strong> 256 × 256 × 256 mm</li>
      </ul>

      {/* Key Features */}
      <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
        Key Features
      </h3>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Quick setup—ready to print in 15 minutes</li>
        <li>Polished hardware and intuitive software</li>
        <li>Enclosed design supports high-temp filaments</li>
        <li>Up to 16-color printing via AMS system</li>
        <li>High acceleration: 20,000 mm/s²; Benchy prints in 18 minutes</li>
        <li>Built-in camera for remote monitoring & timelapse</li>
        <li>AMS 2 Pro compatible with X1/P1 series for multi-material printing</li>
      </ul>
    </div>
  );
}
