import React, { useState } from "react";
import Viewer from "./Upload/Viewer"; // adjust path if needed

export default function StudioPage() {
  const [viewerSize, setViewerSize] = useState(400); // size in px

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex p-8 space-x-8">
      {/* Left controls */}
      <div className="flex flex-col space-y-6 max-w-sm">
        <h1 className="text-3xl font-bold mb-4">Upload STL File</h1>
        <p className="text-gray-400">
          Select an STL file to upload and view it in the 3D viewer on the right.
        </p>

        <label htmlFor="sizeRange" className="font-semibold">
          Viewer Size: {viewerSize}px
        </label>
        <input
          id="sizeRange"
          type="range"
          min="200"
          max="800"
          value={viewerSize}
          onChange={(e) => setViewerSize(parseInt(e.target.value))}
          className="w-full cursor-pointer accent-pink-500"
        />
      </div>

      {/* Right Viewer */}
      <div
        className="flex-grow border-2 border-pink-500 rounded-lg shadow-lg"
        style={{ width: viewerSize, height: viewerSize }}
      >
        <Viewer />
      </div>
    </div>
  );
}
