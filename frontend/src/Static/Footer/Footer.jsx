import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto">
        &copy; {new Date().getFullYear()} Lambda House — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
