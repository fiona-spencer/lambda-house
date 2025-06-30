import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "../../../../public/libs/three-js/build/three.module.js";
import { STLLoader } from "../../../../public/libs/three-js/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "../../../../public/libs/three-js/examples/jsm/controls/OrbitControls.js";
import { useDropzone } from "react-dropzone";

export default function Viewer() {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const meshRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#222");

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
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
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const loadSTLFromFile = useCallback(
    (file) => {
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
          const size = box.getSize(new THREE.Vector3()).length();
          const center = box.getCenter(new THREE.Vector3());

          mountRef.current.camera.position.set(center.x, center.y, size * 1.5);
          mountRef.current.camera.lookAt(center);
          controlsRef.current.target.copy(center);
          controlsRef.current.update();
        } catch (err) {
          setError("Failed to parse STL file: " + err.message);
        }
      };

      reader.onerror = () => setError("Failed to read file");

      reader.readAsArrayBuffer(file);
    },
    []
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) loadSTLFromFile(acceptedFiles[0]);
    },
    [loadSTLFromFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".stl",
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      ref={mountRef}
      className="w-screen h-screen border-4 border-dashed border-gray-600 flex justify-center items-center cursor-pointer select-none relative bg-gray-900 text-gray-400"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-xl">Drop your STL file here...</p>
      ) : (
        <p className="text-xl">Drag & drop an STL file here, or click to select</p>
      )}
      {error && (
        <div className="absolute bottom-4 text-red-500 bg-red-900 px-3 py-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
