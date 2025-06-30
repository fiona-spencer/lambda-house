import React, { useEffect, useRef, useState } from "react";
import * as THREE from "../../../../public/libs/three-js/build/three.module.js";
import { STLLoader } from "../../../../public/libs/three-js/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "../../../../public/libs/three-js/examples/jsm/controls/OrbitControls.js";
import { DragControls } from "../../../../public/libs/three-js/examples/jsm/controls/DragControls.js";
import { FiUpload, FiDownload, FiHome } from "react-icons/fi";

// ABS images
import absAzure from "../../../assets/Filament/abs/abs-azure.jpg";
import absBlack from "../../../assets/Filament/abs/abs-black.png";
import absOrange from "../../../assets/Filament/abs/abs-orange.png";
import absWhite from "../../../assets/Filament/abs/abs-white.png";
import absYellow from "../../../assets/Filament/abs/abs-yellow.jpg";

// PETG images
import petgBlack from "../../../assets/Filament/petg/petg-black.jpg";
import petgOrange from "../../../assets/Filament/petg/petg-orange.jpg";
import petgTranslucent from "../../../assets/Filament/petg/petg-translucent.png";
import petgWhite from "../../../assets/Filament/petg/petg-white.jpg";
import petgYellow from "../../../assets/Filament/petg/petg-yellow.jpg";

// PLA images
import plaBrightYellow from "../../../assets/Filament/pla/pla--brightyellow.jpg";
import plaBlack from "../../../assets/Filament/pla/pla-black.png";
import plaBlue from "../../../assets/Filament/pla/pla-blue.jpg";
import plaCocoaBrown from "../../../assets/Filament/pla/pla-cocoabrown.jpg";
import plaGreen from "../../../assets/Filament/pla/pla-green.jpg";
import plaLightGrey from "../../../assets/Filament/pla/pla-lightgrey.jpg";
import plaOrange from "../../../assets/Filament/pla/pla-orange.jpg";
import plaTurquoise from "../../../assets/Filament/pla/pla-turquoise.jpg";
import plaWhite from "../../../assets/Filament/pla/pla-white.jpg";
import plaYellow from "../../../assets/Filament/pla/pla-yellow.jpg";

// TPU images
import tpuBlack from "../../../assets/Filament/tpu/tpu-black.png";

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

function FilamentSelector({ model, onChange }) {
  return (
    <div className="filament-selector p-2 border rounded my-2 bg-white text-black max-w-xl mx-auto">
      <h3 className="font-semibold mb-1">{model.fileName}</h3>
      {filamentData.map((type) => (
        <div key={type.type} className="my-1">
          <div className="font-bold">{type.type}</div>
          <div className="flex flex-wrap gap-2 mt-1">
            {type.filaments.map((f) => (
              <button
                key={f.name}
                disabled={!f.available}
                className={`p-1 rounded border text-xs ${
                  model.selectedFilament === f.name
                    ? "border-yellow-400"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: f.available ? f.name.toLowerCase() : "#555", cursor: f.available ? "pointer" : "not-allowed" }}
                title={f.description}
                onClick={() => f.available && onChange(f)}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Viewer() {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const meshesRef = useRef([]); // Store {mesh, fileName, selectedFilament}
  const [error, setError] = useState(null);
  const [size, setSize] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerWidth * 0.8,
  });

  const cameraRef = useRef(null);
  const sceneRef = useRef(null);

  const [selectedModelIndex, setSelectedModelIndex] = useState(null);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth * 0.8;
      setSize({ width, height: width });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Clear previous scene and canvas
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFF");

    const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
    camera.position.set(0, 100, 300);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(size.width, size.height);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    const bedPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(256, 256),
      new THREE.MeshStandardMaterial({
        color: 0x222222,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      })
    );
    bedPlate.rotation.x = -Math.PI / 2;
    scene.add(bedPlate);

    // Coordinate arrows at bottom-left corner
    const cornerPos = new THREE.Vector3(-128, 0, -128);
    scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), cornerPos, 50, 0xff0000)); // Y - red
    scene.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), cornerPos, 50, 0x0000ff)); // X - blue
    scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), cornerPos, 50, 0x00ff00)); // Z - green

    cameraRef.current = camera;
    sceneRef.current = scene;

    function resetCamera() {
      camera.position.set(0, 200, 300);
      controls.target.set(0, 0, 0);
      controls.update();
    }
    resetCamera();

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Clear meshes on scene reset
    meshesRef.current = [];

    mountRef.current.scene = scene;
    mountRef.current.camera = camera;
    mountRef.current.renderer = renderer;
    mountRef.current.resetCamera = resetCamera;

    return () => {
      controls.dispose();
      renderer.dispose();
    };
  }, [size]);

  function loadSTLFromFile(file) {
    setError(null);
    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        const contents = event.target.result;
        const loader = new STLLoader();
        const geometry = loader.parse(contents);

        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({ color: 0xFC6C85 }); // default pinkish color
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;

        mountRef.current.scene.add(mesh);

        meshesRef.current.push({
          mesh,
          fileName: file.name,
          selectedFilament: null,
        });

        if (mountRef.current.dragControls) {
          mountRef.current.dragControls.dispose();
        }

        const dragControls = new DragControls(
          meshesRef.current.map((m) => m.mesh),
          mountRef.current.camera,
          mountRef.current.renderer.domElement
        );

        dragControls.addEventListener("dragstart", () => {
          controlsRef.current.enabled = false;
          mountRef.current.style.cursor = "grabbing";
        });
        dragControls.addEventListener("dragend", () => {
          controlsRef.current.enabled = true;
          mountRef.current.style.cursor = "default";
        });

        mountRef.current.dragControls = dragControls;

        setSelectedModelIndex(meshesRef.current.length - 1); // auto-select last added model

      } catch (e) {
        setError("Failed to load STL file.");
      }
    };

    reader.readAsArrayBuffer(file);
  }

  // Mapping filament name to color hex values
  const filamentColors = {
    "Bright Yellow": 0xFAD02E,
    Black: 0x232323,
    Blue: 0x3657E8,
    "Cocoa Brown": 0x4B2E05,
    Green: 0x2AA650,
    "Light Grey": 0xD3D3D3,
    Orange: 0xF68644,
    Turquoise: 0x56B5B1,
    White: 0xE2E2E2,
    Yellow: 0xFADA5E,
    Azure: 0x4189F7,
    Orange: 0xF68644,
    Translucent: 0xb9c8d5,
    Black: 0x232323,
  };

  return (
    <>
      <div className="flex items-center gap-4 text-white p-3 bg-zinc-900">
        <label
          htmlFor="upload-file"
          className="cursor-pointer rounded bg-zinc-700 px-3 py-1 hover:bg-zinc-600"
          title="Upload STL File"
        >
          <FiUpload />
        </label>
        <input
          id="upload-file"
          type="file"
          accept=".stl"
          className="hidden"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              loadSTLFromFile(e.target.files[0]);
            }
          }}
        />

        <button
          onClick={() => {
            if (mountRef.current && mountRef.current.resetCamera) {
              mountRef.current.resetCamera();
            }
          }}
          className="rounded bg-zinc-700 px-3 py-1 hover:bg-zinc-600"
          title="Reset Camera"
        >
          <FiHome />
        </button>

        {error && (
          <div className="text-red-400 ml-4 font-semibold">{error}</div>
        )}
      </div>

      <div className="flex max-w-6xl mx-auto mt-4 gap-4">
        {/* Sidebar listing loaded files */}
        <div className="w-48 bg-gray-100 p-2 rounded border overflow-auto max-h-[500px]">
          <h2 className="font-bold mb-2">Loaded Models</h2>
          {meshesRef.current.length === 0 && <p>No models loaded</p>}
          {meshesRef.current.map((model, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedModelIndex(idx)}
              className={`block w-full text-left p-2 rounded mb-1 ${
                selectedModelIndex === idx
                  ? "bg-yellow-300 font-semibold"
                  : "hover:bg-yellow-100"
              }`}
            >
              {model.fileName}
            </button>
          ))}
        </div>

        {/* Viewer and filament selector */}
        <div>
          <div
            ref={mountRef}
            style={{ width: size.width, height: size.height, marginBottom: "1rem" }}
          />
          {selectedModelIndex !== null && meshesRef.current[selectedModelIndex] ? (
            <FilamentSelector
              model={meshesRef.current[selectedModelIndex]}
              onChange={(filament) => {
                const model = meshesRef.current[selectedModelIndex];
                model.selectedFilament = filament.name;
                if (model.mesh.material) {
                  const color = filamentColors[filament.name] ?? 0xfc6c85;
                  model.mesh.material.color.setHex(color);
                  model.mesh.material.needsUpdate = true;
                }
              }}
            />
          ) : meshesRef.current.length > 0 ? (
            <p className="text-gray-600">
              Select a model on the left to change its filament color.
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
