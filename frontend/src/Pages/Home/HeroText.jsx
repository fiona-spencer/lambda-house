import React from 'react';

export default function HeroText() {
  return (
    <div className="text-2xl leading-relaxed font-thin">
      {/* Hero text section */}
      <div className="py-4 bg-pink-500 text-white px-8">
        We are a Toronto-based 3D printing studio offering high-quality prints,
        custom model design, and integrated electronics solutions for makers,
        artists, and businesses.
      </div>

      {/* Sign up button */}
      <div className="px-8 py-6">
        <button className="px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300">
          Sign Up
        </button>
      </div>
    </div>
  );
}
