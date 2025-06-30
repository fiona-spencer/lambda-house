import React, { useEffect, useRef } from "react";
import * as THREE from "../../../public/libs/three-js/build/three.module.js";
import { STLLoader } from "../../../public/libs/three-js/examples/jsm/loaders/STLLoader.js";
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
    camera.position.set(0, 40, 100);

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

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Load STL
    const loader = new STLLoader();
    let mesh;
    let clickAnimation = false;
    let animationStartTime = 0;

    loader.load(
      lambdaHouse,
      (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
        mesh = new THREE.Mesh(geometry, material);

        geometry.center();
        mesh.scale.set(1, 1, 1);
        mesh.rotation.x = -Math.PI / 2;

        scene.add(mesh);
      },
      undefined,
      (error) => {
        console.error("STL Load Error:", error);
      }
    );

    // Handle click
    const onClick = (event) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.find(i => i.object === mesh)) {
        clickAnimation = true;
        animationStartTime = performance.now();
      }
    };
    renderer.domElement.addEventListener("click", onClick);

    // Animate
    const animate = (time) => {
      requestIdRef.current = requestAnimationFrame(animate);

      if (mesh) {
        // Regular rotation
        mesh.rotation.z += 0.01;

        // Fun animation on click
        if (clickAnimation) {
          const elapsed = time - animationStartTime;

          // Bounce for 500ms
          if (elapsed < 500) {
            mesh.scale.setScalar(1 + 0.2 * Math.sin((elapsed / 500) * Math.PI));
          } else {
            mesh.scale.set(1, 1, 1);
            clickAnimation = false;
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(requestIdRef.current);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
      renderer.domElement.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "600px", height: "400px", margin: "auto" }}
    />
  );
}
