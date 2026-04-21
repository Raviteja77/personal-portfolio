"use client";

import { useState, useEffect } from "react";

export function useMouseParallax(intensity = 0.05) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2 * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * 2 * intensity;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [intensity]);

  return position;
}
