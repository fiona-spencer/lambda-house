import React from "react";
import smallLogo from '../../assets/lh-small-logo.png'

export default function AboutPage() {
  return (
    <main className="min-h-screen text-gray-900 flex flex-col items-center justify-center p-8 space-y-12 bg-white relative">
      
      {/* Top-left image */}
<img
  src={smallLogo}
  alt="Lambda House Logo"
  className="w-40 h-40 mx-auto rainbow object-contain mb-8"
/>

      {/* Intro Section */}
      <section className="max-w-4xl w-full bg-gray-200 p-8">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900">About Lambda House</h1>
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          Lambda House is a Toronto-based 3D printing and design studio offering custom modelling, printing with various filament types (PLA, ABS, TPU, and more), post-processing, and electronics integration. We help makers, artists, and businesses bring ideas to life — whether it's a prototype, art piece, or smart device. Our services include circuit design, functional prints, and personalized support from concept to creation.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          Through our blog, we share tips, tutorials, and behind-the-scenes project insights to inspire and educate the local creative community.
        </p>
      </section>

      {/* Main Services Section */}
      <section className="max-w-4xl w-full bg-white p-8 border border-pink-500">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">Main Services</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3">
          <li>
            <strong>Custom 3D Print Service:</strong> Tailored 3D printing solutions using diverse filament types with expert post-processing and electronics integration.
          </li>
          <li>
            <strong>STL / 3D Downloads:</strong> Access to a growing library of ready-to-print 3D models for creators who want high-quality digital files.
          </li>
        </ul>
      </section>

      {/* Other Offerings Section */}
      <section className="max-w-4xl w-full bg-pink-100 p-8 border border-pink-500">
        <h2 className="text-3xl font-bold text-pink-700 mb-4">Other Offerings</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3">
          <li>
            <strong>Projects:</strong> Innovative projects combining computer science, 3D printing, and electronics to push creative boundaries.
          </li>
          <li>
            <strong>Blogs:</strong> Educational articles, tips, and tutorials to help the creative community learn and grow.
          </li>
          <li>
            <strong>Education:</strong> Resources and support to help beginners and experts alike deepen their skills and knowledge.
          </li>
        </ul>
      </section>

      {/* Follow Us Section */}
      <section className="max-w-4xl w-full bg-white p-8 border border-pink-500">
        <h2 className="text-3xl font-bold text-pink-600 mb-6">Follow Us</h2>
        
        <p className="mb-4 text-gray-700 text-lg">
          Subscribe to our <a href="https://www.youtube.com/@LambdaHouse416" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">YouTube channel</a> for timelapse videos, free filament or 3D printing equipment giveaways, and tutorials.
        </p>

        <p className="mb-4 text-gray-700 text-lg">
          Check out designs on <a href="https://makerworld.com/en/@lambdahouse" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">MakerWorld</a>, follow us on <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">GitHub</a> and <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Twitter</a>.
        </p>

        <p className="text-gray-700 text-lg">
          Contact us anytime at:{" "}
          <a href="mailto:lambdahouse416@gmail.com" className="text-pink-600 hover:underline">
            lambdahouse416@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
