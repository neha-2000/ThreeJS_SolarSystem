// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";

// const Starfield = ({ numStars = 1000 }) => {
//   const starfieldRef = useRef();
//   const textureLoader = new THREE.TextureLoader();
//   const texture = textureLoader.load("/textures/circle.png");

//   useEffect(() => {
//     const geometry = new THREE.BufferGeometry();
//     const positions = [];
//     const colors = [];
//     const color = new THREE.Color();

//     for (let i = 0; i < numStars; i++) {
//       positions.push(
//         (Math.random() - 0.5) * 200,
//         (Math.random() - 0.5) * 200,
//         (Math.random() - 0.5) * 200
//       );
//       color.setHSL(Math.random(), 1.0, 0.5); // random color
//       colors.push(color.r, color.g, color.b);
//     }

//     geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
//     geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

//     const material = new THREE.PointsMaterial({
//       size: 0.5,
//       vertexColors: true,
//       map: texture,
//       transparent: true,
//       blending: THREE.AdditiveBlending,
//     });

//     const points = new THREE.Points(geometry, material);
//     starfieldRef.current.add(points);

//     return () => {
//       starfieldRef.current.remove(points);
//     };
//   }, [numStars, textureLoader]);

//   return <group ref={starfieldRef}  rotation={Math.PI / 2}/>;
// };

// export default Starfield;

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Starfield = ({ numStars = 1000 }) => {
  const starfieldRef = useRef();
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("/textures/circle.png");

  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < numStars; i++) {
      positions.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      );
      color.setHSL(Math.random(), 1.0, 0.5); // random color
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    starfieldRef.current.add(points);

    return () => {
      starfieldRef.current.remove(points);
    };
  }, [numStars, textureLoader]);

  useFrame(({ camera,clock,controls }) => {
    if (starfieldRef.current) {
      const elapsedTime = clock.getElapsedTime();
      starfieldRef.current.rotation.y = elapsedTime * 0.01; // Adjust rotation speed here
      starfieldRef.current.rotation.x = Math.PI / 4; // Adjust rotation angle as needed
    }
  });

  return <group ref={starfieldRef} />;
};

export default Starfield;
