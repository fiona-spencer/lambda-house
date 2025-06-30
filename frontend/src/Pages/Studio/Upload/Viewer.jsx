import React, { useEffect, useRef, useState } from "react";
import * as THREE from "../../../../public/libs/three-js/build/three.module.js";
import { STLLoader } from "../../../../public/libs/three-js/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "../../../../public/libs/three-js/examples/jsm/controls/OrbitControls.js";
import { DragControls } from "../../../../public/libs/three-js/examples/jsm/controls/DragControls.js";
import { FiUpload, FiDownload, FiHome } from "react-icons/fi";

// Example filament images imports here if you want to use (optional)
// import plaBrightYellow from '...';

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
    <div className="filament-selector p-2 border rounded my-2 bg-gray-800 text-white">
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

        // Adjust camera to fit all meshes
        const box = new THREE.Box3();
        meshesRef.current.forEach((m) => box.expandByObject(m.mesh));
        const sizeBox = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        mountRef.current.camera.position.set(center.x, center.y + sizeBox * 0.8, center.z + sizeBox * 1.5);
        mountRef.current.camera.lookAt(center);
        controlsRef.current.target.copy(center);
        controlsRef.current.update();
      } catch (err) {
        setError("Failed to parse STL file: " + err.message);
      }
    };

    reader.onerror = () => setError("Failed to read file");

    reader.readAsArrayBuffer(file);
  }

  function handleFileChange(event) {
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        loadSTLFromFile(files[i]);
      }
    }
  }

  function handleHomeClick() {
    if (mountRef.current?.resetCamera) {
      mountRef.current.resetCamera();
    }
  }

  function handleArrangeClick() {
    if (!meshesRef.current.length) return;

    const padding = 10; // space between meshes in mm
    const bedSize = 256; // size of bed plate

    // Compute bounding boxes for all meshes
    const boxes = meshesRef.current.map(({ mesh }) => new THREE.Box3().setFromObject(mesh));
    const sizes = boxes.map((box) => box.getSize(new THREE.Vector3()));

    const count = meshesRef.current.length;
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);

    // Max width and depth including padding
    const maxWidth = Math.max(...sizes.map((s) => s.x)) + padding;
    const maxDepth = Math.max(...sizes.map((s) => s.z)) + padding;

    let x = -((cols - 1) * maxWidth) / 2;
    let z = -((rows - 1) * maxDepth) / 2;

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const { mesh, selectedFilament } = meshesRef.current[i];

      mesh.position.set(
        x + col * maxWidth,
        0,
        z + row * maxDepth
      );
      mesh.rotation.x = -Math.PI / 2;
    }
  }

  const filamentColors = {
    "Bright Yellow": 0xffff00,
    Black: 0x000000,
    Blue: 0x0000ff,
    "Cocoa Brown": 0xa0522d,
    Green: 0x008000,
    "Light Grey": 0xd3d3d3,
    Orange: 0xffa500,
    Turquoise: 0x40e0d0,
    White: 0xffffff,
    Yellow: 0xffff00,
    Azure: 0x007fff,
  };

  return (
    <>
      <div className="flex items-center gap-4 text-white p-3 bg-zinc-900">
        <label
          htmlFor="uploadInput"
          className="flex cursor-pointer items-center gap-1 rounded border border-gray-300 bg-zinc-800 p-2 hover:bg-zinc-700"
          title="Load STL file(s)"
        >
          <FiUpload />
          Upload
          <input
            type="file"
            multiple
            accept=".stl"
            id="uploadInput"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <button
          onClick={handleArrangeClick}
          className="rounded border border-gray-300 bg-zinc-800 p-2 hover:bg-zinc-700"
          title="Arrange models on bed"
        >
          Arrange
        </button>

        <button
          onClick={handleHomeClick}
          className="rounded border border-gray-300 bg-zinc-800 p-2 hover:bg-zinc-700"
          title="Reset camera"
        >
          <FiHome />
          Home
        </button>
      </div>

      {error && (
        <div className="my-2 rounded border border-red-600 bg-red-200 p-2 text-red-700 max-w-4xl mx-auto">
          Error: {error}
        </div>
      )}

      <div
        ref={mountRef}
        style={{ width: size.width, height: size.height, margin: "1rem auto" }}
      />

      {/* Filament selectors per mesh */}
      <div className="max-w-4xl mx-auto px-4">
        {meshesRef.current.length === 0 && (
          <p className="text-center text-gray-600 mt-8">Upload STL files to see models here.</p>
        )}
        {meshesRef.current.map((model, idx) => (
          <FilamentSelector
            key={idx}
            model={model}
            onChange={(filament) => {
              model.selectedFilament = filament.name;
              if (model.mesh.material) {
                const color = filamentColors[filament.name] ?? 0xfc6c85;
                model.mesh.material.color.setHex(color);
                model.mesh.material.needsUpdate = true;
              }
              // No need to trigger React state update, since we don't display filament state here
            }}
          />
        ))}
      </div>
    </>
  );
}
