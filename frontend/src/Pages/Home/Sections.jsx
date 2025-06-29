import React from 'react';

export default function Sections() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <div className="bg-gray-800 text-white p-6 rounded shadow">Item 1</div>
      <div className="bg-gray-800 text-white p-6 rounded shadow">Item 2</div>
      <div className="bg-gray-800 text-white p-6 rounded shadow">Item 3</div>
      <div className="bg-gray-800 text-white p-6 rounded shadow">Item 4</div>
      <div className="bg-gray-800 text-white p-6 rounded shadow">Item 5</div>
      <div className="bg-gray-800 text-white p-6 rounded shadow">Item 6</div>
    </div>
  );
}
