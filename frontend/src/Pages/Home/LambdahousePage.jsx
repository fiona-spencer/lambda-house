import React from 'react';
import Sections from './Sections';
import EmailContact from '../../Components/EmailContact';

const sections = [
  {
    title: "OUR SERVICES",
    component: Sections,
  },
  {
    title: "CONTACT",
    component: EmailContact,
  },
];

export default function LambdahousePage() {
  return (
    <div className="space-y-12 px-6">
      {sections.map(({ title, component: Component }, idx) => (
        <div key={idx}>
          <div className="text-4xl font-bold text-black mb-6">{title}</div>
          <Component />
        </div>
      ))}
    </div>
  );
}
