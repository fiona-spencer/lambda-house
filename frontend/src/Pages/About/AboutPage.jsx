import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold mb-6 text-[#FFF01F] drop-shadow-[0_0_8px_#FFF01F]">
        About Lambda House
      </h1>
      <p className="max-w-3xl text-lg leading-relaxed text-gray-300">
        Welcome to Lambda House — your go-to place for innovative 3D designs, creative projects, and community collaboration.  
        We’re passionate about pushing boundaries in technology and art, bringing together enthusiasts from all walks of life.  
        Whether you’re a creator, coder, or collector, you’ll find inspiration and tools to help you succeed here.
      </p>
      <p className="max-w-3xl text-lg leading-relaxed text-gray-300 mt-4">
        Our mission is to foster creativity and innovation by providing a platform that’s both accessible and cutting-edge.  
        Join us as we build the future of digital craftsmanship, one pixel at a time.
      </p>
    </main>
  );
}
