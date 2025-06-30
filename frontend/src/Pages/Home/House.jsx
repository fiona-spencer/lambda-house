import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

export default function House() {
  const mountRef = useRef(null);
  const requestIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 50, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Load STL
    const loader = new STLLoader();

    let mesh;
    loader.load(
      "/house.stl", // Put your STL file in public folder or adjust path
      (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // brown
        mesh = new THREE.Mesh(geometry, material);

        // Center and scale the mesh (optional, adjust based on your STL)
        geometry.center();
        mesh.scale.set(0.5, 0.5, 0.5);

        scene.add(mesh);
      },
      undefined,
      (error) => {
        console.error("Error loading STL:", error);
      }
    );

    // Animate rotation
    const animate = () => {
      requestIdRef.current = requestAnimationFrame(animate);

      if (mesh) {
        mesh.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(requestIdRef.current);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "600px", height: "400px", margin: "auto" }}
    />
  );
}
