import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold mb-6 text-[#FFF01F] drop-shadow-[0_0_8px_#FFF01F]">
        About Lambda House
      </h1>

      <p className="max-w-3xl text-lg leading-relaxed text-gray-300 mb-6">
        Lambda House is a Toronto-based 3D printing and design studio offering custom modelling, printing with various filament types (PLA, ABS, TPU, and more), post-processing, and electronics integration. We help makers, artists, and businesses bring ideas to life — whether it's a prototype, art piece, or smart device. Our services include circuit design, functional prints, and personalized support from concept to creation.
      </p>

      <p className="max-w-3xl text-lg leading-relaxed text-gray-300 mb-10">
        Through our blog, we share tips, tutorials, and behind-the-scenes project insights to inspire and educate the local creative community.
      </p>

      <section className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-white mb-4">Main Services</h2>
        <ul className="list-none text-gray-300 mb-10 space-y-2">
          <li>
            <strong>Custom 3D Print Service:</strong> Tailored 3D printing solutions using diverse filament types with expert post-processing and electronics integration.
          </li>
          <li>
            <strong>STL / 3D Downloads:</strong> Access to a growing library of ready-to-print 3D models for creators who want high-quality digital files.
          </li>
        </ul>

        <h2 className="text-3xl font-bold text-white mb-4">Other Offerings</h2>
        <ul className="list-none text-gray-300 space-y-2">
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
    </main>
  );
}
