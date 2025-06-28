import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-md py-6 mb-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">Lambda House</h1>
        <p className="text-sm text-gray-500">Creative & Technical Studio</p>
      </div>
    </header>
  );
}

export default Header;
