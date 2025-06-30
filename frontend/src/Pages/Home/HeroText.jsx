import React from 'react';

export default function HeroText() {
  const text = "We specialize in high-quality 3D printing services, custom model design, and advanced engineering solutions, including electronics integration. Whether you're an artist, maker, or business, we bring your ideas to life with precision and innovation.";

  return (
    <p className="text-xl leading-relaxed py-4 text-pink-500 flex flex-wrap max-w-3xl">
      {text.split('').map((char, i) => (
        <span key={i} className="relative group cursor-default">
          {char}
          <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
        </span>
      ))}
    </p>
  );
}
