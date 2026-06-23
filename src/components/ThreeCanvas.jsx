import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 3D Star component (Moroccan Pentagram)
const MoroccanStar3D = () => {
  const starRef = useRef();

  // Create star shape
  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const points = 5;
    const outerRadius = 0.8;
    const innerRadius = 0.3;

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    return shape;
  }, []);

  const extrudeSettings = {
    depth: 0.15,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  };

  useFrame((state) => {
    if (starRef.current) {
      starRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
      starRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <mesh ref={starRef} castShadow receiveShadow>
      <extrudeGeometry args={[starShape, extrudeSettings]} />
      <meshStandardMaterial
        color="#D4AF37"
        metalness={0.9}
        roughness={0.15}
        emissive="#5c450c"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Stylized 3D Moroccan Star (Green Pentagram outline over Red glassmorphic backing star)
const MoroccanStarInteractive = ({ scrollY, mousePos, position, scale }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate based on time + scroll position
      const scrollRotation = scrollY.current * 0.0025;
      const timeRotation = state.clock.getElapsedTime() * 0.35;
      
      groupRef.current.rotation.y = timeRotation + scrollRotation;
      
      // Tilt star based on mouse position (inertia/lerp)
      const targetX = mousePos.current.y * 0.3;
      const targetY = mousePos.current.x * 0.3;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.06 // Lerp speed
      );
      
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -targetY * 0.2,
        0.06
      );
      
      // Floating animation relative to its base position
      const floatOffset = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
      groupRef.current.position.x = position[0];
      groupRef.current.position.y = position[1] + floatOffset;
      groupRef.current.position.z = position[2];
    }
  });

  // Generate red base star shape
  const redStarShape = useMemo(() => {
    const shape = new THREE.Shape();
    const points = 5;
    const outerRadius = 1.25;
    const innerRadius = 0.48;

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    return shape;
  }, []);

  // Generate green pentagram curve points (crossing lines of the Moroccan star)
  const pentagramCurve = useMemo(() => {
    const r = 1.15; // Align inside the red bevels
    const curvePoints = [];
    for (let i = 0; i < 6; i++) {
      const idx = (i * 2) % 5;
      const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
      curvePoints.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0));
    }
    return new THREE.CatmullRomCurve3(curvePoints);
  }, []);

  const extrudeSettingsRed = {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  };

  return (
    <group ref={groupRef} scale={scale}>
      {/* 1. Red base star - Translucent / Glassmorphic (so text behind/on top remains highly readable) */}
      <mesh castShadow receiveShadow position={[0, 0, -0.06]}>
        <extrudeGeometry args={[redStarShape, extrudeSettingsRed]} />
        <meshStandardMaterial
          color="#C1272D" // Moroccan Red
          metalness={0.4}
          roughness={0.2}
          transparent={true}
          opacity={0.35} // Highly transparent to avoid hiding text
          emissive="#2a0406"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* 2. Green Pentagram outline - Solid 3D Tube following crossing lines */}
      <mesh castShadow position={[0, 0, 0.04]}>
        <tubeGeometry args={[pentagramCurve, 64, 0.07, 12, false]} />
        <meshStandardMaterial
          color="#006233" // Moroccan Emerald Green
          metalness={0.9}
          roughness={0.1}
          emissive="#00331a"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 3. Golden glowing outline points around the star */}
      <points position={[0, 0, -0.04]}>
        <extrudeGeometry args={[redStarShape, extrudeSettingsRed]} />
        <pointsMaterial
          color="#D4AF37" // Moroccan Gold
          size={0.1}
          sizeAttenuation={true}
          transparent
          opacity={0.7}
        />
      </points>
    </group>
  );
};

// Particles (Star dust) in background
const SandParticles = ({ mousePos }) => {
  const pointsRef = useRef();
  const count = 120;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 2;

      spd[i] = 0.2 + Math.random() * 0.8;
    }
    return [pos, spd];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      const posArray = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 1] -= speeds[i] * 0.005;
        if (posArray[i * 3 + 1] < -6) {
          posArray[i * 3 + 1] = 6;
        }
        posArray[i * 3] += Math.sin(time + i) * 0.002;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;

      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        mousePos.current.y * 0.15,
        0.05
      );
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        mousePos.current.x * 0.15,
        0.05
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4AF37"
        size={0.06}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

const ThreeCanvas = () => {
  const scrollY = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [starPosition, setStarPosition] = useState([1.8, 0.3, 0]);
  const [starScale, setStarScale] = useState(1.15);

  // Check for WebGL and prefers-reduced-motion, handle resize
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGlSupported(support);
    } catch (e) {
      setWebGlSupported(false);
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setStarPosition([0, 1.1, 0]); // Centered & higher on mobile
        setStarScale(0.75);
      } else if (window.innerWidth < 1024) {
        setStarPosition([0, 1.2, 0]); // Centered & higher on tablet
        setStarScale(0.9);
      } else {
        setStarPosition([1.8, 0.25, 0]); // Off-center right on desktop
        setStarScale(1.15);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Static Fallback Design in case WebGL is unsupported or reduced motion is active
  if (!webGlSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-64 h-64 rounded-full border-4 border-dashed border-morocco-gold/30 flex items-center justify-center animate-spin-slow">
          <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-morocco-red to-morocco-green opacity-20 absolute blur-xl"></div>
          <svg className="w-24 h-24 text-morocco-green drop-shadow-[0_0_15px_rgba(193,39,45,0.7)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full absolute inset-0 -z-1 pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // Transparent background
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, -5, -3]} intensity={0.6} color="#006233" />
        <pointLight position={[5, -5, 3]} intensity={0.8} color="#C1272D" />

        {!reducedMotion && <SandParticles mousePos={mousePos} />}
        <MoroccanStarInteractive
          scrollY={reducedMotion ? { current: 0 } : scrollY}
          mousePos={reducedMotion ? { current: { x: 0, y: 0 } } : mousePos}
          position={starPosition}
          scale={starScale}
        />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
