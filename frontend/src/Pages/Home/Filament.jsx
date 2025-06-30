import React, { useState } from "react";

// ABS images
import absAzure from "../../assets/Filament/abs/abs-azure.jpg";
import absBlack from "../../assets/Filament/abs/abs-black.png";
import absOrange from "../../assets/Filament/abs/abs-orange.png";
import absWhite from "../../assets/Filament/abs/abs-white.png";
import absYellow from "../../assets/Filament/abs/abs-yellow.jpg";

// PETG images
import petgBlack from "../../assets/Filament/petg/petg-black.jpg";
import petgOrange from "../../assets/Filament/petg/petg-orange.jpg";
import petgTranslucent from "../../assets/Filament/petg/petg-translucent.png";
import petgWhite from "../../assets/Filament/petg/petg-white.jpg";
import petgYellow from "../../assets/Filament/petg/petg-yellow.jpg";

// PLA images
import plaBrightYellow from "../../assets/Filament/pla/pla--brightyellow.jpg";
import plaBlack from "../../assets/Filament/pla/pla-black.png";
import plaBlue from "../../assets/Filament/pla/pla-blue.jpg";
import plaCocoaBrown from "../../assets/Filament/pla/pla-cocoabrown.jpg";
import plaGreen from "../../assets/Filament/pla/pla-green.jpg";
import plaLightGrey from "../../assets/Filament/pla/pla-lightgrey.jpg";
import plaOrange from "../../assets/Filament/pla/pla-orange.jpg";
import plaTurquoise from "../../assets/Filament/pla/pla-turquoise.jpg";
import plaWhite from "../../assets/Filament/pla/pla-white.jpg";
import plaYellow from "../../assets/Filament/pla/pla-yellow.jpg";

// TPU images
import tpuBlack from "../../assets/Filament/tpu/tpu-black.png";

const filamentData = [
  {
    type: "PLA",
    filaments: [
      { name: "Bright Yellow", available: true, description: "Bright yellow, easy to print.", image: plaBrightYellow },
      { name: "Black", available: true, description: "Classic black.", image: plaBlack },
      { name: "Blue", available: false, description: "Cool blue.", image: plaBlue },
      { name: "Cocoa Brown", available: true, description: "Warm brown tone.", image: plaCocoaBrown },
      { name: "Green", available: true, description: "Natural green.", image: plaGreen },
      { name: "Light Grey", available: true, description: "Subtle light grey.", image: plaLightGrey },
      { name: "Orange", available: true, description: "Bright orange.", image: plaOrange },
      { name: "Turquoise", available: false, description: "Refreshing turquoise.", image: plaTurquoise },
      { name: "White", available: true, description: "Clean white.", image: plaWhite },
      { name: "Yellow", available: true, description: "Sunshine yellow.", image: plaYellow },
    ],
  },
  {
    type: "ABS",
    filaments: [
      { name: "Azure", available: true, description: "Bright azure.", image: absAzure },
      { name: "Black", available: true, description: "Strong black.", image: absBlack },
      { name: "Orange", available: true, description: "Vibrant orange.", image: absOrange },
      { name: "White", available: true, description: "Clean white.", image: absWhite },
      { name: "Yellow", available: false, description: "Sun yellow.", image: absYellow },
    ],
  },
  {
    type: "PETG",
    filaments: [
      { name: "Black", available: true, description: "Deep black.", image: petgBlack },
      { name: "Orange", available: true, description: "Bright orange.", image: petgOrange },
      { name: "Translucent", available: true, description: "Semi-transparent.", image: petgTranslucent },
      { name: "White", available: true, description: "Clean white.", image: petgWhite },
      { name: "Yellow", available: true, description: "Sunny yellow.", image: petgYellow },
    ],
  },
  {
    type: "TPU",
    filaments: [
      { name: "Black", available: true, description: "Flexible black filament.", image: tpuBlack },
    ],
  },
  {
    type: "Other",
    filaments: [],
  },
];

export default function FilamentGallery() {
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const selectedType = filamentData[selectedTypeIndex];
  const selectedFilament = selectedType.filaments[selectedColorIndex];

  const handleTypeChange = (index) => {
    setSelectedTypeIndex(index);
    setSelectedColorIndex(0);
  };

  return (
    <div className="md:max-w-6xl max-w-5xl flex mx-auto p-6 bg-white rounded shadow">
      {/* Type Tabs */}
      <div className="flex space-x-6 mb-8 justify-center">
        {filamentData.map(({ type }, i) => (
          <button
            key={type}
            className={`px-4 py-2 font-semibold rounded-full ${
              i === selectedTypeIndex
                ? "bg-pink-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-pink-100"
            }`}
            onClick={() => handleTypeChange(i)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Large Image */}
      {selectedFilament ? (
        <>
          <div className="flex justify-center mb-6">
            <img
              src={selectedFilament.image}
              alt={`${selectedType.type} - ${selectedFilament.name}`}
              className="w-96 h-96 object-contain rounded-lg shadow-md border border-gray-300"
            />
          </div>

          {/* Description */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">{selectedFilament.name}</h3>
            <p className="text-gray-700 mb-1">{selectedFilament.description}</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                selectedFilament.available ? "bg-pink-500 text-white" : "bg-red-600 text-white"
              }`}
            >
              {selectedFilament.available ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Color Circles */}
          <div className="flex justify-center space-x-4 flex-wrap">
            {selectedType.filaments.map(({ name, image, available }, idx) => (
              <button
                key={name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-12 h-12 rounded-full border-4 ${
                  idx === selectedColorIndex ? "border-pink-500" : "border-transparent"
                } focus:outline-none`}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: available ? "none" : "grayscale(70%)",
                  cursor: "pointer",
                }}
                aria-label={name}
                title={name}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No filaments available for this category.</p>
      )}
    </div>
  );
}
