// src/components/Earth.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Planet } from './Planet'; // Assuming you have a Planet class

const Earth = () => {
  const earthRef = useRef();

  useEffect(() => {
    const scene = earthRef.current;
    const loader = new THREE.TextureLoader();
    const planetGroup = new THREE.Group();
    const planetGeometry = new THREE.SphereGeometry(1, 32, 32);

    // Create Planet Lights
    const planetLightsMaterial = new THREE.MeshBasicMaterial({
      map: loader.load('/solar-system-threejs/assets/earth-map-2.jpg'),
      blending: THREE.AdditiveBlending,
    });
    const planetLightsMesh = new THREE.Mesh(planetGeometry, planetLightsMaterial);
    planetGroup.add(planetLightsMesh);

    // Create Planet Clouds
    const planetCloudsMaterial = new THREE.MeshStandardMaterial({
      map: loader.load('/solar-system-threejs/assets/earth-map-3.jpg'),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      alphaMap: loader.load('/solar-system-threejs/assets/earth-map-4.jpg'),
    });
    const planetCloudsMesh = new THREE.Mesh(planetGeometry, planetCloudsMaterial);
    planetCloudsMesh.scale.setScalar(1.003);
    planetGroup.add(planetCloudsMesh);

    scene.add(planetGroup);
  }, []);

  return <group ref={earthRef}></group>;
};

export default Earth;
