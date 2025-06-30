import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function RotatingCube() {
  const meshRef = useRef();

  // Rotate the cube on every frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function Viewer() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RotatingCube />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
