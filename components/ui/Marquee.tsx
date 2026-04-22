"use client";

import { useState } from "react";
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
  const [paused, setPaused] = useState(false);

  const dir = reverse ? "reverse" : "normal";
  const playState = paused ? "paused" : "running";

  return (
    <div
      className={className}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      style={{ overflow: "hidden", position: "relative", width: "100%" }}
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
          background: "linear-gradient(to right, var(--color-bg) 0%, transparent 100%)",
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
          background: "linear-gradient(to left, var(--color-bg) 0%, transparent 100%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: prefersReduced
            ? "none"
            : `marquee ${speed}s linear infinite ${dir}`,
          animationPlayState: playState,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
