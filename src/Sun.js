import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Sun = () => {
  const sunRef = useRef();
  const glowRef = useRef();

  // Texture loader for sun texture
  const textureLoader = new THREE.TextureLoader();
  const sunTexture = textureLoader.load("/textures/sun3.png");

  // Sun Material
  const sunMaterial = new THREE.MeshStandardMaterial({
    map: sunTexture,
    emissive: 0xffff00, // Emissive color for glowing effect
    emissiveIntensity: 2, // Intensity of the emissive glow
  });

  // Glow Material
 // Glow Material
 const glowMaterial = new THREE.ShaderMaterial({
  uniforms: {
    glowColor: { value: new THREE.Color(0xffff00) },
    coefficient: { value: 0.8 },
    power: { value: 2.0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    uniform float coefficient;
    uniform float power;
    varying vec3 vNormal;
    void main() {
      float intensity = pow(coefficient + dot(vNormal, vec3(0.0, 0.0, 1.0)), power);
      gl_FragColor = vec4(glowColor, intensity);
    }
  `,
  side: THREE.FrontSide, // Render on the front side to cover the entire sun
  blending: THREE.AdditiveBlending,
  transparent: true,
});


  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.008; // Adjust the rotation speed as needed
    }
  });

  return (
    <>
      {/* Sun Mesh */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial {...sunMaterial} />
      </mesh>

      {/* Glow Mesh */}
      <mesh ref={glowRef} >
        <sphereGeometry args={[4.4, 32, 32]} /> {/* Slightly larger than the sun */}
         <shaderMaterial attach="material" {...glowMaterial} />
      </mesh>
    </>
  );
};

export default Sun;

