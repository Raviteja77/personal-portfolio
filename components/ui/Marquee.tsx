"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const duration = prefersReduced ? 0 : speed;
  const dir = reverse ? "reverse" : "normal";

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      {/* Left fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background:
            "linear-gradient(to right, var(--color-bg) 0%, transparent 100%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
      {/* Right fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background:
            "linear-gradient(to left, var(--color-bg) 0%, transparent 100%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: "max-content",
          animation: prefersReduced
            ? "none"
            : `marquee ${duration}s linear infinite ${dir}`,
          ...(pauseOnHover ? {} : {}),
        }}
        className={pauseOnHover ? "marquee-track" : undefined}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
