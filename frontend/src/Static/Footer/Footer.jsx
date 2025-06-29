import React from "react";
import { FaYoutube, FaGithub, FaEnvelope, FaCube } from "react-icons/fa";
import lgTransparent from '../../assets/lh-transparent.svg'

function Footer() {
  return (
    <footer className="relative overflow-hidden   text-center text-white shadow-lg mt-10">
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto">
<div
  className="flex justify-center items-center mb-10 bg-red-500 select-none py-3 
             bg-[url('../../assets/tv-bars.svg')] 
             bg-center bg-cover bg-no-repeat"
>
  <img
    src={lgTransparent}
    alt="Lambda House Logo"
    className="h-32 w-auto object-contain"
  />
</div>

        <div className="flex justify-center gap-14 mb-10 text-3xl bg-[#636060]">
          <a
            href="https://www.youtube.com/@LambdaHouse416"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-125"
          >
            <FaYoutube />
          </a>
          <a
            href="mailto:lambdahouse416@gmail.com"
            aria-label="Email"
className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-125"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/lambdahouse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-125"
          >
            <FaGithub />
          </a>
          <a
            href="https://makerworld.com/en/u/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MakerWorld"
className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-125"
          >
            <FaCube />
          </a>
        </div>

        {/* Policy Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm text-white">
          {[
            ["Terms and Conditions", "/terms-and-conditions"],
            ["Shipping Policy", "/shipping-policy"],
            ["Privacy Policy", "/privacy-policy"],
            ["Terms of Service", "/terms-of-service"],
            ["Refund Policy", "/refund-policy"],
            ["Return, Exchange & Warranty", "/return-exchange-warranty"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="hover:text-white transition duration-200 underline-offset-2 hover:underline"
            >
              {label}
            </a>
          ))}
        </div>

      </div>
        {/* Copyright */}
        <div className="text-xs text-white-300 font-mono tracking-wide select-none py-2 bg-pink-700">
          &copy; {new Date().getFullYear()} Lambda House — All rights reserved.
        </div>
    </footer>
  );
}

export default Footer;
