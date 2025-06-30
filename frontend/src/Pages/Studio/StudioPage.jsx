import React from "react";
import Viewer from "./Upload/Viewer"; // adjust path if needed

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex p-8 space-x-8">
      {/* Viewer on the Left */}
      <div className="border-2 border-pink-500 rounded-lg shadow-lg w-[400px] h-[400px]">
        <Viewer />
      </div>

      {/* Instructions on the Right */}
      <div className="flex flex-col space-y-6 max-w-sm">
        <h1 className="text-3xl font-bold mb-4">Upload STL File</h1>
        <p className="text-gray-400">
          Select an STL file to upload and view it in the 3D viewer on the left.
        </p>
      </div>
    </div>
  );
}
