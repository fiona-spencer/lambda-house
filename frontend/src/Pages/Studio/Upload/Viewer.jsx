import React, { useEffect, useRef, useState } from "react";
import * as THREE from "../../../../public/libs/three-js/build/three.module.js";
import { STLLoader } from "../../../../public/libs/three-js/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "../../../../public/libs/three-js/examples/jsm/controls/OrbitControls.js";
import { DragControls } from "../../../../public/libs/three-js/examples/jsm/controls/DragControls.js";
import { FiUpload, FiDownload, FiHome } from "react-icons/fi";

export default function Viewer() {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const meshRef = useRef(null);
  const [error, setError] = useState(null);
  const [size, setSize] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerWidth * 0.8,
  });

  // Store references to key objects for resetting view
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

    // Only X-Y grid
    const gridXY = new THREE.GridHelper(256, 64, 0x888888, 0x444444);
    gridXY.rotation.x = Math.PI / 2;
    scene.add(gridXY);

    // Bed plate on X-Y plane (256 x 256 mm)
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

    // Position coordinate arrows at bottom-left corner of bed
    const cornerPos = new THREE.Vector3(-128, 0, -128);

 // Y axis arrow (red), pointing along +Y
const yArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), cornerPos, 50, 0xff0000);
scene.add(yArrow);

// X axis arrow (blue), pointing along +X
const xArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), cornerPos, 50, 0x0000ff);
scene.add(xArrow);

// Z axis arrow (green), pointing along +Z
const zArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), cornerPos, 50, 0x00ff00);
scene.add(zArrow);


    // Store refs for reset function
    cameraRef.current = camera;
    sceneRef.current = scene;

    // Define function to reset camera to "home" view
    function resetCamera() {
      // Center of bed plate is at (0,0,0)
      // We'll position the camera so the bed is centered
      // and coordinate arrows at bottom-left corner are visible.
      // Let's move camera back and up, looking at center.

      camera.position.set(0, 200, 300); // Elevated and pulled back
      controls.target.set(0, 0, 0); // Look at bed plate center
      controls.update();
    }

    // Call it once on init so camera starts here
    resetCamera();

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    mountRef.current.scene = scene;
    mountRef.current.camera = camera;
    mountRef.current.renderer = renderer;

    // Expose resetCamera to ref so we can call it from button
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

        if (meshRef.current) {
          mountRef.current.scene.remove(meshRef.current);
          meshRef.current.geometry.dispose();
          meshRef.current.material.dispose();
        }

        const material = new THREE.MeshStandardMaterial({ color: 0xff6600 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        geometry.computeVertexNormals();

        meshRef.current = mesh;
        mountRef.current.scene.add(mesh);

        const dragControls = new DragControls([mesh], mountRef.current.camera, mountRef.current.renderer.domElement);
        dragControls.addEventListener("dragstart", () => {
          controlsRef.current.enabled = false;
        });
        dragControls.addEventListener("dragend", () => {
          controlsRef.current.enabled = true;
        });

        const box = new THREE.Box3().setFromObject(mesh);
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
    if (event.target.files.length > 0) {
      loadSTLFromFile(event.target.files[0]);
    }
  }

  // Home button handler to reset camera
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
          <input type="file" accept=".stl" onChange={handleFileChange} className="hidden" />
        </label>

        <button
          onClick={handleHomeClick}
          className="p-2 bg-gray-800 border border-gray-600 rounded text-sm flex items-center gap-2 hover:bg-gray-700"
          title="Reset View"
        >
          <FiHome size={16} /> Home
        </button>

        <button
          onClick={() => {}}
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
        <div className="absolute bottom-4 left-4 text-red-500 bg-red-900 px-3 py-1 rounded">{error}</div>
      )}
    </div>
  );
}
