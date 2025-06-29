import React from 'react';
import Equipemt from './Equipment';
import Filament from './Filament';
import Sections from './Sections';
import EmailContact from '../../Components/EmailContact';

const sections = [
  {
    title: "EQUIPMENT",
    component: Equipment,
  },
  {
    title: "FILAMENT TYPES",
    component: Filament,
  },
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
    <div className="space-y-12">
      {sections.map(({ title, component: Component }, idx) => (
        <div key={idx}>
          <div className="text-4xl font-bold text-black mb-6 ml-10">{title}</div>
          <Component />
        </div>
      ))}
    </div>
  );
}
