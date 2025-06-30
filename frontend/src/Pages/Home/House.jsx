import React, { useEffect, useRef } from "react";
import * as THREE from "../../../public/libs/three-js/build/three.module.js";
import { STLLoader } from "../../../public/libs/three-js/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "../../../public/libs/three-js/examples/jsm/controls/OrbitControls.js";
import lambdaHouse from '../../../public/models/lambda-logo.stl';

export default function House() {
  const mountRef = useRef(null);
  const requestIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 100);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 30, 10);
    scene.add(dirLight);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Load STL
    const loader = new STLLoader();
    let mesh;

    loader.load(
      lambdaHouse,
      (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
        mesh = new THREE.Mesh(geometry, material);

        geometry.center();
        mesh.scale.set(1, 1, 1);

        // Rotate model upright (90° around X-axis)
        mesh.rotation.x = -Math.PI / 2;

        scene.add(mesh);
      },
      undefined,
      (error) => {
        console.error("STL Load Error:", error);
      }
    );

    // Animate
    const animate = () => {
      requestIdRef.current = requestAnimationFrame(animate);

      if (mesh) {
        mesh.rotation.y += 0.01; // 👉 Spin right (clockwise Y-axis)
      }

      controls.update();
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
