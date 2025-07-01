import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function EmailContact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          phone: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white text-black sm:max-w-xl border-black">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Input fields (unchanged) */}
        {['firstName', 'lastName', 'email', 'subject', 'phone'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block mb-1 font-semibold text-black capitalize">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={field !== 'phone'}
              className="w-full border-b border-black bg-transparent py-2 px-1 focus:outline-none focus:border-pink-500 focus:text-pink-500 focus:font-bold"
              placeholder={field.replace(/([A-Z])/g, ' $1')}
            />
          </div>
        ))}

        {/* Message */}
        <div>
          <label htmlFor="message" className="block mb-1 font-semibold text-black">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border-b border-black bg-transparent py-2 px-1 resize-none focus:outline-none focus:border-pink-500"
            placeholder="Your message..."
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-pink-500 text-white font-semibold py-2 px-20 rounded-none hover:bg-pink-600 hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 mx-auto"
        >
          {status === 'sending' ? 'Sending...' : 'Send'} <FaPaperPlane />
        </button>

        {/* Status Message */}
        {status === 'success' && (
          <p className="text-green-600 text-center mt-2">Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-center mt-2">Something went wrong. Try again later.</p>
        )}
      </form>
    </div>
  );
}
