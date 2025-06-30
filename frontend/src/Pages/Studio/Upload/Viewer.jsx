import React, { useEffect, useRef, useState } from "react";
import * as THREE from "../../../../public/libs/three-js/build/three.module.js";
import { STLLoader } from "../../../../public/libs/three-js/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "../../../../public/libs/three-js/examples/jsm/controls/OrbitControls.js";

export default function Viewer() {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const meshRef = useRef(null);
  const [error, setError] = useState(null);
  const [objectSize, setObjectSize] = useState(null);
  const [size, setSize] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerWidth * 0.8, // square viewport
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
    scene.background = new THREE.Color("#222");

    const camera = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000
    );
    camera.position.set(0, 200, 300);

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
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 3D printer bed plate
    const gridHelper = new THREE.GridHelper(256, 64, 0x888888, 0x444444);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

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

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    mountRef.current.scene = scene;
    mountRef.current.camera = camera;
    mountRef.current.renderer = renderer;

    function handleKeyDown(e) {
      if (!meshRef.current) return;
      const moveStep = 5;
      switch (e.key) {
        case "ArrowUp":
          meshRef.current.position.y += moveStep;
          break;
        case "ArrowDown":
          meshRef.current.position.y -= moveStep;
          break;
        case "ArrowLeft":
          meshRef.current.position.x -= moveStep;
          break;
        case "ArrowRight":
          meshRef.current.position.x += moveStep;
          break;
        default:
          return;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      controls.dispose();
      renderer.dispose();
      window.removeEventListener("keydown", handleKeyDown);
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

        const box = new THREE.Box3().setFromObject(mesh);
        const sizeVec = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        setObjectSize({
          width: sizeVec.x.toFixed(2),
          height: sizeVec.y.toFixed(2),
          depth: sizeVec.z.toFixed(2),
        });

        // Center on bed
        mesh.position.x = -center.x;
        mesh.position.y = -center.y;
        mesh.position.z = -center.z + sizeVec.z / 2;

        // Update camera to frame model
        const sizeBox = box.getSize(new THREE.Vector3()).length();
        mountRef.current.camera.position.set(center.x, center.y + sizeBox * 1.2, sizeBox * 1.2);
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

  return (
    <div className="relative bg-gray-900 text-gray-400">
      <input
        type="file"
        accept=".stl"
        onChange={handleFileChange}
        className="absolute top-4 left-4 z-10 p-2 bg-gray-800 border border-gray-600 rounded text-sm cursor-pointer"
      />
      <div
        ref={mountRef}
        style={{ width: size.width / 2, height: size.height }}
        className="mx-auto"
      />
      {objectSize && (
        <div className="mt-3 text-sm text-center">
          <p>STL Dimensions (mm):</p>
          <p>
            X: {objectSize.width} &nbsp; Y: {objectSize.depth} &nbsp; Z: {objectSize.height}
          </p>
          <p className="mt-1 text-xs text-gray-500">Use arrow keys to move object on plate</p>
        </div>
      )}
      {error && (
        <div className="absolute bottom-4 left-4 text-red-500 bg-red-900 px-3 py-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
