import React, { useEffect, useRef, useState } from "react";
import * as THREE from "../../../../public/libs/three-js/build/three.module.js";
import { STLLoader } from "../../../../public/libs/three-js/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "../../../../public/libs/three-js/examples/jsm/controls/OrbitControls.js";
import { DragControls } from "../../../../public/libs/three-js/examples/jsm/controls/DragControls.js";
import { FiUpload, FiDownload } from "react-icons/fi";

export default function Viewer() {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const meshRef = useRef(null);
  const [error, setError] = useState(null);
  const [size, setSize] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerWidth * 0.8,
  });

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
    scene.background = new THREE.Color("#111");

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

    const gridXY = new THREE.GridHelper(256, 64, 0x888888, 0x444444);
    gridXY.rotation.x = Math.PI / 2;
    scene.add(gridXY);

    const bedPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(256, 256),
      new THREE.MeshStandardMaterial({ color: 0x222222, side: THREE.DoubleSide, transparent: true, opacity: 0.4 })
    );
    bedPlate.rotation.x = -Math.PI / 2;
    scene.add(bedPlate);

    const gridYZ = new THREE.GridHelper(256, 64, 0x333333, 0x222222);
    gridYZ.rotation.z = Math.PI / 2;
    gridYZ.position.x = -128;
    gridYZ.material.opacity = 0.2;
    gridYZ.material.transparent = true;
    scene.add(gridYZ);

    const gridXZ = new THREE.GridHelper(256, 64, 0x333333, 0x222222);
    gridXZ.position.z = 128;
    gridXZ.material.opacity = 0.2;
    gridXZ.material.transparent = true;
    scene.add(gridXZ);

    const origin = new THREE.Vector3(0, 0, 0);
    scene.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), origin, 50, 0xff0000));
    scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, 50, 0x00ff00));
    scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), origin, 50, 0x0000ff));

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    mountRef.current.scene = scene;
    mountRef.current.camera = camera;
    mountRef.current.renderer = renderer;

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
        dragControls.addEventListener('dragstart', () => {
          controlsRef.current.enabled = false;
        });
        dragControls.addEventListener('dragend', () => {
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

    // Inside your existing useEffect where you setup the scene, after creating the bedPlate mesh:

// Helper function to create text sprites with canvas texture
function createTextSprite(message, parameters = {}) {
  const fontface = parameters.fontface || "Arial";
  const fontsize = parameters.fontsize || 24;
  const borderThickness = parameters.borderThickness || 4;
  const borderColor = parameters.borderColor || { r:0, g:0, b:0, a:1.0 };
  const backgroundColor = parameters.backgroundColor || { r:255, g:255, b:255, a:1.0 };

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = fontsize + "px " + fontface;

  const metrics = context.measureText(message);
  const textWidth = metrics.width;

  // Background rectangle
  context.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
  context.strokeStyle = `rgba(${borderColor.r},${borderColor.g},${borderColor.b},${borderColor.a})`;
  context.lineWidth = borderThickness;
  context.fillRect(borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness);
  context.strokeRect(borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness);

  // Text color
  context.fillStyle = "rgba(50,50,50,1.0)";
  context.fillText(message, borderThickness, fontsize + borderThickness);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(textWidth / 4, fontsize / 4, 1);
  return sprite;
}

// Create and position dimension labels:
const label256 = createTextSprite("256 mm");
label256.position.set(0, 0.1, 128 + 10);  // slightly above front edge
scene.add(label256);

const label156 = createTextSprite("156 mm");
label156.position.set(128 + 20, 0.1, 0);  // right edge, slightly above bed
label156.rotation.y = -Math.PI / 2;
scene.add(label156);

  }

  

  function handleFileChange(event) {
    if (event.target.files.length > 0) {
      loadSTLFromFile(event.target.files[0]);
    }
  }

  return (
    <div className="relative bg-gray-900 text-gray-400">
      <div className="absolute top-4 left-4 z-10 flex gap-2 items-center">
        <label className="p-2 bg-gray-800 border border-gray-600 rounded text-sm cursor-pointer flex items-center gap-2">
          <FiUpload size={16} />
          <span>Upload STL</span>
          <input
            type="file"
            accept=".stl"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
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
        <div className="absolute bottom-4 left-4 text-red-500 bg-red-900 px-3 py-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
