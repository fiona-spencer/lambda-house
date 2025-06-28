import React from 'react'
import Viewer from './Upload/Viewer'  // adjust path if needed
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function StudioPage() {
  return (
    <div>
      <h1>StudioPage</h1>
      <Viewer />
    </div>
  )
}
