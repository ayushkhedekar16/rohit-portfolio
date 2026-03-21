import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Text, Trail } from "@react-three/drei";
import * as THREE from "three";

// Creative Prism Core - Represents the "eye" and lens
function PrismCore() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} scale={1.2}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#30d5c8"
          transmission={1}
          thickness={1}
          roughness={0.1}
          ior={1.5}
          reflectivity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

// Floating Shards - Representing screens/frames
function Shards() {
  const count = 8;
  const shards = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <group>
      {shards.map((props, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={2} floatIntensity={2}>
          <mesh position={props.position} rotation={props.rotation} scale={props.scale}>
            <planeGeometry args={[1, 0.6]} /> {/* 16:9 Aspect Ratio aspect */}
            <meshPhysicalMaterial
              color={i % 2 === 0 ? "#30d5c8" : "#d4a028"}
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
              roughness={0}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Digital Flow - Structured particles
function DigitalFlow() {
  const count = 300;
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 4;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 10;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#30d5c8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

const Scene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <fog attach="fog" args={['#050505', 5, 20]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#30d5c8" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#d4a028" />

        <group position={[0, 0, 0]}>
          <PrismCore />
          <Shards />
          <DigitalFlow />
        </group>
      </Canvas>
    </div>
  );
};

export default Scene3D;
