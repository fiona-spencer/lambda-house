import React from 'react';
import floatingLambda from '../../assets/floating.mp4';
import LambdaLogo from '../../assets/lh-small-logo.png'

export default function Hero() {
  const handleVideoClick = () => {
    window.scrollBy({ top: 1200, behavior: 'smooth' });
  };

  return (
    <div className="flex w-full h-[calc(100vh-40px)] overflow-hidden">
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
  className="absolute top-0 left-0 w-full h-full object-cover filter brightness-125"
style={{ cursor: `url(${LambdaLogo}) 16 16, auto` }}>

        <source src={floatingLambda} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Centered Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
      </div>
    </div>
  );
}
