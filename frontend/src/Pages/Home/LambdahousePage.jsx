import React from 'react';
import Hero from './Hero';
import HeroText from './HeroText';
import Equipment from './Equipment';
import Filament from './Filament';
import Sections from './Sections';
import EmailContact from '../../Components/EmailContact';
import House from './House';

const sections = [
  {
    title: "",
    component: Hero,
  },
  {
    title: "TORONTO 3D PRINTING",
    component: HeroText,
  },
  {
    title: "OUR SERVICES",
    component: Sections,
  },
  {
    title: "EQUIPMENT",
    component: Equipment,
  },
  {
    title: "FILAMENT",
    component: Filament,
  },
  {
    title: "CONTACT",
    component: EmailContact,
  },
];

export default function LambdahousePage() {
  return (
    <div className="space-y-12 lg:px-64 lg:pt-10">
      {sections.map(({ title, component: Component }, idx) => (
        <div key={idx}>
          <div className="text-4xl font-bold text-black mb-6 ml-10">{title}</div>
          <Component />
        </div>
      ))}
      {/* Responsive layout for House components */}
    <div className="flex flex-col sm:flex-row justify-center sm:gap-6 items-center space-y-6 sm:space-y-0">
  <House/>
</div>

    </div>    
  );
}
