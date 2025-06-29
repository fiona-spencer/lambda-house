import React from 'react';

export default function Equipment() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-black rounded shadow">
      <h1 className="text-4xl font-bold mb-6">Equipment</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Bambu Lab Printing PS1 with AMS</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800 mb-4">
          <li>Hardened steel nozzle: 0.4 mm</li>
          <li>4 color print heads plus 1 external extruder</li>
          <li>Print bed size: 256 x 256 mm</li>
          <li>Maximum print volume: 256 x 256 x 256 mm</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Additional Features</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          <li>Works right out of the box, set up in 15 minutes</li>
          <li>Well-polished hardware and software</li>
          <li>Enclosed body for high-temperature filament printing</li>
          <li>Up to 16-color printing with AMS</li>
          <li>Up to 20000 mm/s² acceleration, prints a benchy in 18 minutes</li>
          <li>Built-in camera for remote monitoring and timelapse</li>
          <li>The AMS 2 Pro is compatible with X1/P1 series printers for multi-material printing</li>
        </ul>
      </section>
    </div>
  );
}
