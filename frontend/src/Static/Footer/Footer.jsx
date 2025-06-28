import React from 'react';
import { FaYoutube, FaGithub, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-100 py-8 text-center text-gray-700 shadow-inner mt-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-6 text-2xl">
          <a
            href="https://www.youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-red-600"
          >
            <FaYoutube />
          </a>
          <a
            href="mailto:contact@lambdahouse.com"
            aria-label="Email"
            className="hover:text-gray-900"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/lambdahouse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-900"
          >
            <FaGithub />
          </a>
        </div>

        {/* Policy Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <a href="/terms-and-conditions" className="hover:underline">
            Terms and Conditions
          </a>
          <a href="/shipping-policy" className="hover:underline">
            Shipping Policy
          </a>
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:underline">
            Terms of Service
          </a>
          <a href="/refund-policy" className="hover:underline">
            Refund Policy
          </a>
          <a href="/return-exchange-warranty" className="hover:underline">
            Return, Exchange & Warranty
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Lambda House — All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
