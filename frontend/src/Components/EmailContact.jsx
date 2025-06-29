import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function EmailContact() {
  return (
    <div className="max-w-full mx-auto p-6 bg-white text-black">
      <form className="space-y-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block mb-1 font-semibold text-black">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full border-b border-black bg-transparent py-2 px-1 focus:outline-none focus:border-pink-500"
            placeholder="First Name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block mb-1 font-semibold text-black">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full border-b border-black bg-transparent py-2 px-1 focus:outline-none focus:border-pink-500"
            placeholder="Last Name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border-b border-black bg-transparent py-2 px-1 focus:outline-none focus:border-pink-500"
            placeholder="Email"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block mb-1 font-semibold text-black">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="w-full border-b border-black bg-transparent py-2 px-1 focus:outline-none focus:border-pink-500"
            placeholder="Subject"
          />
        </div>

        {/* Phone (optional) */}
        <div>
          <label htmlFor="phone" className="block mb-1 font-semibold text-black">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full border-b border-black bg-transparent py-2 px-1 focus:outline-none focus:border-pink-500"
            placeholder="Phone Number"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block mb-1 font-semibold text-black">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full border-b border-black bg-transparent py-2 px-1 resize-none focus:outline-none focus:border-pink-500"
            placeholder="Your message..."
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-pink-500 text-white font-semibold py-2 px-6 rounded-none hover:bg-pink-600 transition flex items-center justify-center gap-2"
        >
          Send <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}
