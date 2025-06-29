import React from "react";
import { FaYoutube, FaGithub, FaEnvelope, FaCube } from "react-icons/fa";
import lgTransparent from '../../assets/lh-transparent.svg'

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-opacity-30 py-16 text-center text-white shadow-lg mt-20">
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Logo */}
        <div className="flex justify-center items-center mb-12 select-none">
              <img src={lgTransparent}
          alt="Lambda House Logo" 
          className="h-40 w-auto object-contain"/>
        </div>
        <div className="flex justify-center gap-14 mb-14 text-6xl bg-[#081c31d7]">
          <a
            href="https://www.youtube.com/@LambdaHouse416"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-blue-400 hover:text-blue-300 transition duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
          >
            <FaYoutube />
          </a>
          <a
            href="mailto:lambdahouse416@gmail.com"
            aria-label="Email"
            className="text-blue-400 hover:text-blue-300 transition duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/lambdahouse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-blue-400 hover:text-blue-300 transition duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
          >
            <FaGithub />
          </a>
          <a
            href="https://makerworld.com/en/u/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MakerWorld"
            className="text-blue-400 hover:text-blue-300 transition duration-300 transform hover:rotate-12 hover:scale-125 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
          >
            <FaCube />
          </a>
        </div>

        {/* Policy Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm text-blue-200 font-light">
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

        {/* Copyright */}
        <div className="text-xs text-blue-300 font-mono tracking-wide select-none">
          &copy; {new Date().getFullYear()} Lambda House — All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
