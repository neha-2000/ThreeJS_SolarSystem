import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Planet = ({ size, texture, distance, orbitSpeed, ring ,hasMoon,moonCount}) => {
  const planetRef = useRef();
  const moonRef = useRef();


  useFrame(() => {
    if (planetRef.current) {
      // Rotate the planet itself around its Y-axis
      planetRef.current.rotation.y += 0.005;
      // Update the planet's position to make it orbit around a central point      
      planetRef.current.position.x =
        Math.cos(Date.now() * 0.001 * orbitSpeed) * distance;      
      planetRef.current.position.z =
        Math.sin(Date.now() * 0.001 * orbitSpeed) * distance;
    }

    // Update moon's orbit around the planet
    if (moonRef.current && planetRef.current) {
      const moonDistance = size * 2; // Distance of moon from the planet
      const moonOrbitSpeed = orbitSpeed * 2; // Moon's orbit speed

      // Update the moon's position to make it orbit around the planet
      moonRef.current.position.x =
        planetRef.current.position.x +
        Math.cos(Date.now() * 0.001 * moonOrbitSpeed) * moonDistance;
      moonRef.current.position.z =
        planetRef.current.position.z +
        Math.sin(Date.now() * 0.001 * moonOrbitSpeed) * moonDistance;
    }
  });

  return (
    <>
        {/* Orbit Ring */}
        <mesh rotation-x={Math.PI / 2}>
        <ringGeometry args={[
          // inner radius
          distance - 0.1, 
          // outer radius
          distance + 0.1,
          // segments that make up the ring
          // smooth circular shape.
          80]} />
        <meshBasicMaterial
          color={ring?.color || "white"}
          side={THREE.DoubleSide}
          opacity={0.3}
          transparent={true}
        />
      </mesh>
    <mesh ref={planetRef} >
      <sphereGeometry args={[size, 32, 32]} />      
      <meshStandardMaterial map={new THREE.TextureLoader().load(texture)} />
      {ring && (
        <mesh rotation-x={Math.PI / 2}>
          <ringGeometry args={[ring.innerRadius, ring.outerRadius, 32]} />
          <meshBasicMaterial
            color={ring.color}
            side={THREE.DoubleSide}
            opacity={0.5}
            transparent={true}
          />
        </mesh>
      )}
    </mesh>
      {/* Moon */}
      {
hasMoon && <>
 <mesh ref={moonRef}>
        <sphereGeometry args={[size * 0.3, 30, 30]} />
        <meshStandardMaterial  map={new THREE.TextureLoader().load("/textures/earthMoon.png")} />
      </mesh>

</>
      }
     

    </>
  );
};

export default Planet;
