import React from "react";
import { FaYoutube, FaGithub, FaEnvelope, FaCube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-glitch-bg relative py-12 text-center text-gray-100 shadow-inner mt-20 animate-fadeIn">
      {/* Logo */}
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

      <style jsx>{`
        .footer-glitch-bg {
          position: relative;
          background: black;
          overflow: hidden;
          z-index: 0;
        }
        .footer-glitch-bg::before,
        .footer-glitch-bg::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .footer-glitch-bg::before {
          background: 
            repeating-linear-gradient(
              90deg,
              #222 0,
              #222 2px,
              #111 2px,
              #111 4px
            ),
            repeating-linear-gradient(
              0deg,
              #222 0,
              #222 2px,
              #111 2px,
              #111 4px
            );
          opacity: 0.15;
          animation: static-glitch 0.2s infinite linear;
        }
        .footer-glitch-bg::after {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          animation: flicker 3s infinite;
        }
        .footer-glitch-bg > * {
          position: relative;
          z-index: 10;
        }
        @keyframes static-glitch {
          0% {
            transform: translateX(0);
            opacity: 0.15;
          }
          50% {
            transform: translateX(5%);
            opacity: 0.3;
          }
          100% {
            transform: translateX(0);
            opacity: 0.15;
          }
        }
        @keyframes flicker {
          0%,
          100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
