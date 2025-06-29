import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-center p-8 space-y-12">
      
      {/* Intro Section */}
      <section className="max-w-4xl w-full bg-[#33373bd2] rounded-lg p-8">
        <h1 className="text-5xl font-extrabold mb-6 text-white">About Lambda House</h1>
        <p className="text-lg leading-relaxed text-white/80 mb-6">
          Lambda House is a Toronto-based 3D printing and design studio offering custom modelling, printing with various filament types (PLA, ABS, TPU, and more), post-processing, and electronics integration. We help makers, artists, and businesses bring ideas to life — whether it's a prototype, art piece, or smart device. Our services include circuit design, functional prints, and personalized support from concept to creation.
        </p>
        <p className="text-lg leading-relaxed text-white/80">
          Through our blog, we share tips, tutorials, and behind-the-scenes project insights to inspire and educate the local creative community.
        </p>
      </section>

      {/* Main Services Section */}
      <section className="max-w-4xl w-full bg-[#22252b] rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-4">Main Services</h2>
        <ul className="list-disc list-inside text-white/80 space-y-3">
          <li>
            <strong>Custom 3D Print Service:</strong> Tailored 3D printing solutions using diverse filament types with expert post-processing and electronics integration.
          </li>
          <li>
            <strong>STL / 3D Downloads:</strong> Access to a growing library of ready-to-print 3D models for creators who want high-quality digital files.
          </li>
        </ul>
      </section>

      {/* Other Offerings Section */}
      <section className="max-w-4xl w-full bg-[#33373bd2] rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-4">Other Offerings</h2>
        <ul className="list-disc list-inside text-white/80 space-y-3">
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
