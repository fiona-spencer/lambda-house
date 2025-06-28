import React from 'react';
import { FaYoutube, FaGithub, FaEnvelope, FaCube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white py-10 text-center text-gray-700 shadow-inner mt-20 animate-fadeIn">
      {/* Logo */}
      <div className="text-center font-extrabold text-[9.25rem] text-[#f7ff5e] bg-black leading-none mb-4 drop-shadow-sm tracking-tight">
        λ house
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Social Icons */}
        <div className="flex justify-center gap-8 mb-8 text-3xl">
          <a
            href="https://www.youtube.com/@LambdaHouse416"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-gray-600 hover:text-red-600 transition duration-300 transform hover:scale-125"
          >
            <FaYoutube />
          </a>
          <a
            href="mailto:lambdahouse416@gmail.com"
            aria-label="Email"
            className="text-gray-600 hover:text-gray-900 transition duration-300 transform hover:scale-125"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/lambdahouse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-600 hover:text-gray-900 transition duration-300 transform hover:scale-125"
          >
            <FaGithub />
          </a>
          <a
            href="https://makerworld.com/en/u/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MakerWorld"
            className="text-gray-600 hover:text-blue-500 transition duration-300 transform hover:rotate-12 hover:scale-125"
          >
            <FaCube />
          </a>
        </div>

        {/* Policy Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 text-sm text-gray-500">
          {[
            ['Terms and Conditions', '/terms-and-conditions'],
            ['Shipping Policy', '/shipping-policy'],
            ['Privacy Policy', '/privacy-policy'],
            ['Terms of Service', '/terms-of-service'],
            ['Refund Policy', '/refund-policy'],
            ['Return, Exchange & Warranty', '/return-exchange-warranty'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="hover:text-blue-600 transition duration-200 underline-offset-2 hover:underline"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Lambda House — All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
