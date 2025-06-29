import React, { useRef } from 'react';
import floatingLambda from '../../assets/floating.mp4';

export default function Hero() {
  const nextSectionRef = useRef(null);

  const handleVideoClick = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="flex w-full h-screen overflow-hidden">
        {/* Top Small Text */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 text-white text-sm tracking-widest uppercase">
          Welcome to Lambda House
        </div>

        {/* Background Video with onClick scroll */}
        <video
          onClick={handleVideoClick}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover filter brightness-125 cursor-pointer"
        >
          <source src={floatingLambda} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Centered Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to My Site</h1>
          <p className="text-lg md:text-2xl max-w-xl">
            Experience the best of video background
          </p>
        </div>
      </div>

      {/* Next Section (scroll target) */}
      <div ref={nextSectionRef} className="h-screen bg-white flex items-center justify-center">
        <h2 className="text-3xl font-semibold">You’ve scrolled to the next section!</h2>
      </div>
    </>
  );
}
