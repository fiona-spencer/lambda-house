import React from "react";
import { FaYoutube, FaGithub, FaEnvelope, FaCube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black py-12 text-center text-gray-100 shadow-inner mt-20 animate-fadeIn">
      {/* Glitch background layers */}
      <div className="absolute inset-0 bg-tv-glitch pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-tv-flicker pointer-events-none z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="font-extrabold text-[9.25rem] text-[#FFF01F] leading-none mb-8 tracking-tight">
          λ house
        </div>

        <div className="max-w-6xl mx-auto px-6">
          {/* Social Icons */}
          <div className="flex justify-center gap-12 mb-10 text-5xl">
            <a
              href="https://www.youtube.com/@LambdaHouse416"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-[#FF00FF] hover:text-[#FF00FF] transition duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_15px_#FF00FF]"
            >
              <FaYoutube />
            </a>
            <a
              href="mailto:lambdahouse416@gmail.com"
              aria-label="Email"
              className="text-[#00FFFF] hover:text-[#00FFFF] transition duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_15px_#00FFFF]"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://github.com/lambdahouse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#FFF01F] hover:text-[#FFF01F] transition duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_15px_#FFF01F]"
            >
              <FaGithub />
            </a>
            <a
              href="https://makerworld.com/en/u/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MakerWorld"
              className="text-[#00ff40] hover:text-[#00ff4c] transition duration-300 transform hover:rotate-12 hover:scale-125 hover:drop-shadow-[0_0_15px_#00FFFF]"
            >
              <FaCube />
            </a>
          </div>

          {/* Policy Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-400">
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
                className="hover:text-[#FFF01F] transition duration-200 underline-offset-2 hover:underline"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Lambda House — All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
