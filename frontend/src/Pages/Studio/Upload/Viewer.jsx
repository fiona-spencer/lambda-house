import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';

function Model({ file, color, scale, position }) {
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e.target.result;
      let loader;

      if (file.name.endsWith('.stl')) {
        loader = new STLLoader();
        const geom = loader.parse(contents);
        setGeometry(geom);
      } else if (file.name.endsWith('.3mf')) {
        loader = new ThreeMFLoader();
        loader.parse(contents, (object) => {
          // 3MF loads as Object3D, convert to geometry
          // Or you can set the whole object in scene
          // For simplicity we’ll just set the object here
          setGeometry(object);
        });
      }
    };

    if (file.name.endsWith('.stl')) {
      reader.readAsArrayBuffer(file);
    } else if (file.name.endsWith('.3mf')) {
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  if (!geometry) return null;

  // STL returns BufferGeometry, 3MF returns Object3D
  if (geometry.isBufferGeometry) {
    return (
      <mesh geometry={geometry} scale={scale} position={position}>
        <meshStandardMaterial color={color} />
      </mesh>
    );
  } else {
    // 3MF: object3D
    return <primitive object={geometry} scale={scale} position={position} />;
  }
}

export default function Viewer() {
  const [file, setFile] = useState(null);
  const [color, setColor] = useState('#156289');
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState([0, 0, 0]);

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (f) setFile(f);
  }

  return (
    <div>
      <h2>Upload STL or 3MF File</h2>
      <input type="file" accept=".stl,.3mf" onChange={handleFileChange} />

      <div style={{ margin: '1rem 0' }}>
        <label>
          Color: <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        </label>
        <label style={{ marginLeft: 20 }}>
          Scale: 
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={scale}
            onChange={e => setScale(parseFloat(e.target.value))}
          />
          {scale}
        </label>
        <label style={{ marginLeft: 20 }}>
          Move X:
          <input
            type="number"
            value={position[0]}
            onChange={e => setPosition([parseFloat(e.target.value), position[1], position[2]])}
          />
        </label>
        <label style={{ marginLeft: 10 }}>
          Move Y:
          <input
            type="number"
            value={position[1]}
            onChange={e => setPosition([position[0], parseFloat(e.target.value), position[2]])}
          />
        </label>
        <label style={{ marginLeft: 10 }}>
          Move Z:
          <input
            type="number"
            value={position[2]}
            onChange={e => setPosition([position[0], position[1], parseFloat(e.target.value)])}
          />
        </label>
      </div>

      <div style={{ width: '100%', height: 600 }}>
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Model file={file} color={color} scale={scale} position={position} />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}
