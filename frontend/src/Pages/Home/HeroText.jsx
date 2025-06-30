import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function HeroText() {
  return (
    <div className="text-2xl leading-relaxed font-thin">
      {/* Hero text section */}
      <div className="py-4 bg-pink-500 text-white px-8">
        We are a Toronto-based 3D printing studio offering high-quality prints,
        custom model design, and integrated electronics solutions for makers,
        artists, and businesses.
      </div>

      {/* Sign In button */}
      <div className="px-8 py-6">
        <button className="mx-auto group w-full py-3 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 flex items-center gap-2">
          Sign In
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
