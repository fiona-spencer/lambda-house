import React from 'react';
import floatingLambda from '../../assets/floating.mp4';

export default function Hero() {
  return (
    <div className="relative w-full h-screen -h-4 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover filter brightness-125"
      >
        <source src={floatingLambda} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-40">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to My Site</h1>
        <p className="text-lg md:text-2xl max-w-xl">Experience the best of video background</p>
      </div>
    </div>
  );
}
