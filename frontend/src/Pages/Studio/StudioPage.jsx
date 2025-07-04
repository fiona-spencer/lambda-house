import React, { useState } from "react";
import Viewer from "./Upload/Viewer"; // adjust path if needed

export default function StudioPage() {
  const [viewerSize, setViewerSize] = useState(400); // size in px

  return (
    <div className="min-h-screen bg-white text-black flex p-8 space-x-8">
      {/* Single Column: Text + Viewer */}
      <div className="flex flex-col space-y-6 max-w-sm">
        <h1 className="text-3xl font-bold mb-4">Upload STL File</h1>
        <p className="text-gray-400">
          Select an STL file to upload and view it in the 3D viewer below.
        </p>

        {/* Viewer below text */}
        <div
          className=""
          style={{ width: viewerSize, height: viewerSize }}
        >
          <Viewer />
        </div>
      </div>
    </div>
  );
}
