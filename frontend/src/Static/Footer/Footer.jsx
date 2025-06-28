import React from "react";
import { FaYoutube, FaGithub, FaEnvelope, FaCube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-glitch-bg relative py-12 text-center text-gray-100 shadow-inner mt-20 animate-fadeIn">
      {/* Logo */}
      <div className="font-extrabold text-[9.25rem] text-[#FFF01F] leading-none mb-8 tracking-tight relative z-10">
        λ house
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Social Icons */}
        <div className="flex justify-center gap-12 mb-10 text-5xl">
          {[
            {
              href: "https://www.youtube.com/@LambdaHouse416",
              label: "YouTube",
              Icon: FaYoutube,
            },
            {
              href: "mailto:lambdahouse416@gmail.com",
              label: "Email",
              Icon: FaEnvelope,
            },
            {
              href: "https://github.com/lambdahouse",
              label: "GitHub",
              Icon: FaGithub,
            },
            {
              href: "https://makerworld.com/en/u/YOUR_USERNAME",
              label: "MakerWorld",
              Icon: FaCube,
            },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glitch-icon relative inline-block cursor-pointer transition duration-300 transform hover:scale-125"
            >
              <Icon />
              <span aria-hidden="true" className="glitch-layer glitch-red">
                <Icon />
              </span>
              <span aria-hidden="true" className="glitch-layer glitch-green">
                <Icon />
              </span>
              <span aria-hidden="true" className="glitch-layer glitch-blue">
                <Icon />
              </span>
            </a>
          ))}
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
        <div className="text-xs text-gray-500 relative z-10">
          &copy; {new Date().getFullYear()} Lambda House — All rights reserved.
        </div>
      </div>

      {/* Glitch styles */}
      <style jsx>{`
        /* Glitchy background effect */
        .footer-glitch-bg {
          background: black;
          position: relative;
          overflow: hidden;
        }

        .footer-glitch-bg::before {
          content: "";
          position: absolute;
          top: 0;
          left: -50%;
          width: 200%;
          height: 100%;
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
          pointer-events: none;
          z-index: 0;
        }

        /* subtle flicker overlay */
        .footer-glitch-bg::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          animation: flicker 3s infinite;
          pointer-events: none;
          z-index: 1;
        }

        /* Glitchy horizontal scanlines move */
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

        /* Slow flicker effect */
        @keyframes flicker {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }

        /* Icon glitch layers (same as before) */
        .glitch-icon {
          position: relative;
          color: #ccc;
          filter: drop-shadow(0 0 2px #000);
        }
        .glitch-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.7;
          clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%);
          animation: glitch 2s infinite;
          pointer-events: none;
        }
        .glitch-red {
          color: #ff0000;
          animation-delay: 0s;
          clip-path: polygon(0 0, 100% 0, 100% 20%, 0 20%);
          transform: translate(1px, -1px);
        }
        .glitch-green {
          color: #00ff00;
          animation-delay: 0.3s;
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
          transform: translate(-1px, 1px);
        }
        .glitch-blue {
          color: #0000ff;
          animation-delay: 0.6s;
          clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%);
          transform: translate(1px, 1px);
        }
        @keyframes glitch {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 20%, 0 20%);
            transform: translate(0);
          }
          20% {
            clip-path: polygon(0 5%, 100% 0, 100% 25%, 0 25%);
            transform: translate(-2px, 2px);
          }
          40% {
            clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%);
            transform: translate(2px, -2px);
          }
          60% {
            clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%);
            transform: translate(-2px, -2px);
          }
          80% {
            clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
            transform: translate(2px, 2px);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 20%, 0 20%);
            transform: translate(0);
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
