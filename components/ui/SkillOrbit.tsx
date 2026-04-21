"use client";

import { useReducedMotion } from "motion/react";

const rings = [
  {
    nodes: [
      { label: "Angular", color: "#DD0031" },
      { label: "React", color: "#61DAFB" },
      { label: "TypeScript", color: "#3178C6" },
    ],
    radius: 96,
    duration: 14,
    reverse: false,
  },
  {
    nodes: [
      { label: "NgRx", color: "#BA2BD2" },
      { label: "GraphQL", color: "#E535AB" },
      { label: "Spring Boot", color: "#6DB33F" },
      { label: "Docker", color: "#2496ED" },
    ],
    radius: 163,
    duration: 26,
    reverse: false,
  },
  {
    nodes: [
      { label: "RxJS", color: "#B7178C" },
      { label: "Python", color: "#FFD43B" },
      { label: "Lit", color: "#325CFF" },
      { label: "Storybook", color: "#FF4785" },
    ],
    radius: 232,
    duration: 42,
    reverse: true,
  },
] as const;

const SIZE = 500;

export function SkillOrbit() {
  const prefersReduced = useReducedMotion();

  return (
    <div style={{ position: "relative", width: SIZE, height: SIZE, flexShrink: 0 }}>
      {/* Orbit path rings + glow */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        fill="none"
      >
        <defs>
          <radialGradient id="orbitCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(37,99,235,0.28)" />
            <stop offset="100%" stopColor="rgba(37,99,235,0)" />
          </radialGradient>
          <radialGradient id="orbitMidGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(37,99,235,0.06)" />
            <stop offset="100%" stopColor="rgba(37,99,235,0)" />
          </radialGradient>
        </defs>
        {/* Soft glow layers */}
        <circle cx={SIZE / 2} cy={SIZE / 2} r="76" fill="url(#orbitCenterGlow)" />
        <circle cx={SIZE / 2} cy={SIZE / 2} r="250" fill="url(#orbitMidGlow)" />
        {/* Orbit track circles */}
        {rings.map((ring, i) => (
          <circle
            key={i}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={ring.radius}
            stroke="rgba(255,255,255,0.055)"
            strokeWidth="1"
            strokeDasharray="4 9"
          />
        ))}
      </svg>

      {/* Center hub */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(37,99,235,0.4) 0%, rgba(124,58,237,0.3) 100%)",
          border: "1px solid rgba(37,99,235,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 0 0 8px rgba(37,99,235,0.06), 0 0 32px rgba(37,99,235,0.4), 0 0 80px rgba(37,99,235,0.15)",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.78rem",
            color: "#fff",
            fontWeight: 700,
            letterSpacing: "0.04em",
            userSelect: "none",
          }}
        >
          {"</>"}
        </span>
      </div>

      {/* Orbiting badges */}
      {rings.map((ring, ri) =>
        ring.nodes.map((node, ni) => {
          const delay = prefersReduced
            ? 0
            : -((ring.duration / ring.nodes.length) * ni);
          return (
            <div
              key={`${ri}-${ni}`}
              style={
                {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 0,
                  height: 0,
                  "--orbit-r": `${ring.radius}px`,
                  animation: prefersReduced
                    ? "none"
                    : `${ring.reverse ? "orbit-reverse" : "orbit"} ${ring.duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                  zIndex: 5,
                } as React.CSSProperties
              }
            >
              <div
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  padding: "0.3rem 0.72rem",
                  borderRadius: "9999px",
                  background: "rgba(15,15,18,0.92)",
                  border: `1px solid ${node.color}35`,
                  backdropFilter: "blur(14px)",
                  boxShadow: `0 0 14px ${node.color}20, inset 0 1px 0 rgba(255,255,255,0.06)`,
                  whiteSpace: "nowrap",
                  cursor: "default",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: node.color,
                    letterSpacing: "0.04em",
                  }}
                >
                  {node.label}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
