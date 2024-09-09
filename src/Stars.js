import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Stars = ({ position, texture, speed }) => {
  const starRef = useRef();
  const textureLoader = new THREE.TextureLoader();

  useEffect(() => {
    if (starRef.current) {
      starRef.current.position.set(position.x, position.y, position.z);
    }
  }, [position]);

  useFrame(() => {
    if (starRef.current) {
      starRef.current.position.x += speed.x;
      starRef.current.position.y += speed.y;
      starRef.current.position.z += speed.z;
    }
  });

  return (
    <mesh ref={starRef}>
      <planeGeometry args={[0.4, 0.4]} /> {/* Increased size for visibility */}
      <meshBasicMaterial map={textureLoader.load(texture)} />
    </mesh>
  );
};

export default Stars;
