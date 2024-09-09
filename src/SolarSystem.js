import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Starfield from "./Starfield";
import Planet from "./Planet";
import Sun from "./Sun";
import Stars from "./Stars";

const SolarSystem = () => {
  const planets = [
    {
      name: "Mercury",
      size: 1,
      distance: 10,
      orbitSpeed: 0.7,
      texture: "/textures/mercury-map.jpg",
      hasMoon:false,
      moonCount:0
    },

    {
      name: "Venus",
      size: 1.5,
      distance: 20,
      orbitSpeed: 0.6,
      texture: "/textures/venus-map.jpg",
      hasMoon:false,
      moonCount:0
    },
    {
        name: "Earth",
        size: 2.5,
        distance: 30,
        orbitSpeed: 0.5,
        texture: "/textures/earth-map-1.jpg",
        hasMoon:true,
        moonCount:1
       
        
      },
      {
        name: "Mars",
        size: 1.5,
        distance: 40,
        orbitSpeed: 0.4,
        texture: "/textures/mars-map.jpg",
        hasMoon:false,
      moonCount:0
       
        
      },
      {
        name: "Jupiter",
        size: 3.5,
        distance: 50,
        orbitSpeed: 0.3,
        texture: "/textures/jupiter-map.jpg",
        hasMoon:false,
      moonCount:0
       
        
      },
      
      {
        name: "Saturn",
        size: 2.7,
        distance: 60,
        orbitSpeed: 0.2,
        texture: "/textures/saturn-map.jpg",
        ring: {
            innerRadius: 3.7,
            outerRadius: 5.0,
            
            color: "rgba(255, 255, 255, 0.6)",
          },
          hasMoon:false,
          moonCount:0
      },
      {
        name: "Uranus",
        size: 2.1,
        distance: 70,
        orbitSpeed: 0.2,
        texture: "/textures/uranus-map.jpg",
       
          hasMoon:false,
          moonCount:0
      },
      {
        name: "Neptune",
        size: 2.1,
        distance: 80,
        orbitSpeed: 0.1,
        texture: "/textures/neptune-map.jpg",
        hasMoon:false,
      moonCount:0
       
        
      },
    // Add other planets similarly...
  ];

  const numStars = 100; // Number of stars
  const stars = [];

  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * 100 - 50;
    const y = Math.random() * 100 - 50;
    const z = Math.random() * 100 - 50;
    const speed = {
      x: (Math.random() - 0.5) * 0.1,
      y: (Math.random() - 0.5) * 0.1,
      z: (Math.random() - 0.5) * 0.1,
    };
    stars.push({ position: { x, y, z }, speed, texture: "/textures/circle.png" });
  }


 
  return (
    <Canvas camera={{ position: [0, 50, 100], fov: 60 }}>
      <ambientLight intensity={0.5}  />
      <pointLight position={[0, 0, 0]} intensity={2} />    
       <Starfield numStars={1000} />
      <Sun/>
      {planets.map((planet, idx) => (
        <Planet key={idx} {...planet} />
      ))}
      <OrbitControls />
    </Canvas>
  );
};

export default SolarSystem;
