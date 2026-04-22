"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Mouse tracker (normalised -1..1) ──────────────────────────────────────────
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return mouse;
}

// ── Particles ─────────────────────────────────────────────────────────────────
function Particles({ count = 260, reduced }: { count?: number; reduced: boolean }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#2563EB"),
      new THREE.Color("#7C3AED"),
      new THREE.Color("#0EA5E9"),
      new THREE.Color("#FAFAFA"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.04;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.15;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ── Inner glow sphere ─────────────────────────────────────────────────────────
function GlowSphere({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.07;
    mesh.current.rotation.z = clock.getElapsedTime() * 0.04;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.72, 1]} />
      <meshStandardMaterial
        color="#2563EB"
        emissive="#1D4ED8"
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.7}
        wireframe={false}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// ── Outer wireframe ───────────────────────────────────────────────────────────
function WireFrame({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.12;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.06;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.05, 1]} />
      <meshBasicMaterial color="#60A5FA" wireframe transparent opacity={0.22} />
    </mesh>
  );
}

// ── Outer slow ring ───────────────────────────────────────────────────────────
function OuterRing({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y = -clock.getElapsedTime() * 0.05;
    mesh.current.rotation.x =  clock.getElapsedTime() * 0.03;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.38, 0]} />
      <meshBasicMaterial color="#7C3AED" wireframe transparent opacity={0.09} />
    </mesh>
  );
}

// ── Scene root (mouse-driven group tilt) ──────────────────────────────────────
function SceneGroup({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useMouse();
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!group.current) return;
    if (reduced) return;
    targetRot.current.x += (mouse.current.y * 0.25 - targetRot.current.x) * 0.05;
    targetRot.current.y += (mouse.current.x * 0.35 - targetRot.current.y) * 0.05;
    group.current.rotation.x = targetRot.current.x;
    group.current.rotation.y = targetRot.current.y;
  });

  return (
    <group ref={group}>
      <GlowSphere reduced={reduced} />
      <WireFrame  reduced={reduced} />
      <OuterRing  reduced={reduced} />
      <Particles  reduced={reduced} />
    </group>
  );
}

// ── Public component ──────────────────────────────────────────────────────────
export function HeroScene() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#2563EB" />
      <pointLight position={[-3, -2, -3]} intensity={0.6} color="#7C3AED" />
      <SceneGroup reduced={reduced} />
    </Canvas>
  );
}
