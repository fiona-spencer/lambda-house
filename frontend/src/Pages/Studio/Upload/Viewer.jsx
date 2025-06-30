import React, { useEffect, useRef, useState } from "react";
import * as THREE from "../../../../public/libs/three-js/build/three.module.js";
import { STLLoader } from "../../../../public/libs/three-js/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "../../../../public/libs/three-js/examples/jsm/controls/OrbitControls.js";
import { DragControls } from "../../../../public/libs/three-js/examples/jsm/controls/DragControls.js";
import { FiUpload, FiDownload, FiHome } from "react-icons/fi";

export default function Viewer() {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const meshesRef = useRef([]);  // Store all loaded meshes here
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
        opacity: 0.4,
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
        const material = new THREE.MeshStandardMaterial({ color: 0xff6600 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;

        mountRef.current.scene.add(mesh);
        meshesRef.current.push(mesh);

        // Dispose old drag controls if exist
        if (mountRef.current.dragControls) {
          mountRef.current.dragControls.dispose();
        }

        // Setup drag controls on all meshes
        const dragControls = new DragControls(
          meshesRef.current,
          mountRef.current.camera,
          mountRef.current.renderer.domElement
        );

        dragControls.addEventListener("dragstart", () => {
          controlsRef.current.enabled = false;
          // Change cursor to grabbing on drag start
          mountRef.current.style.cursor = "grabbing";
        });
        dragControls.addEventListener("dragend", () => {
          controlsRef.current.enabled = true;
          mountRef.current.style.cursor = "default";
        });

        mountRef.current.dragControls = dragControls;

        // Adjust camera to fit all meshes
        const box = new THREE.Box3();
        meshesRef.current.forEach((m) => box.expandByObject(m));
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

  return (
    <div className="relative bg-gray-900 text-gray-400">
      <div className="absolute top-4 left-4 z-10 flex gap-2 items-center">
        <label className="p-2 bg-gray-800 border border-gray-600 rounded text-sm cursor-pointer flex items-center gap-2">
          <FiUpload size={16} />
          <span>Upload STL</span>
          {/* Allow multiple STL files to be selected */}
          <input
            type="file"
            accept=".stl"
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
        </label>

        <button
          onClick={handleHomeClick}
          className="p-2 bg-gray-800 border border-gray-600 rounded text-sm flex items-center gap-2 hover:bg-gray-700"
          title="Reset View"
        >
          <FiHome size={16} /> Home
        </button>

        <button
          onClick={() => {
            // You can implement Drop to Bed functionality here
          }}
          className="p-2 bg-gray-800 border border-gray-600 rounded text-sm flex items-center gap-2 hover:bg-gray-700"
        >
          <FiDownload size={16} /> Drop to Bed
        </button>
      </div>

      <div
        ref={mountRef}
        style={{ width: size.width / 2, height: size.height }}
        className="mx-auto"
      />

      {error && (
        <div className="absolute bottom-4 left-4 text-red-500 bg-red-900 px-3 py-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
