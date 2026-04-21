"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const CODE_CHARS = "01{}()<>=;:/\\[]!@#$%^&*+-_ABCDEFabcdef.,?|~";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    const fontSize = 13;
    let cols = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -80);

    let frameId: number;
    let lastTime = 0;
    const interval = 60; // ms between frames — throttle for subtlety

    const draw = (time: number) => {
      frameId = requestAnimationFrame(draw);
      if (time - lastTime < interval) return;
      lastTime = time;

      ctx.fillStyle = "rgba(9,9,11,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * fontSize;
        if (y < 0) { drops[i] += 0.5; continue; }

        // Bright leading char
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.fillText(CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)], i * fontSize, y);

        // Dim trailing chars — painted by fade, not individually
        if (y > canvas.height && Math.random() > 0.972) {
          drops[i] = 0;
        }
        drops[i] += 0.35;
      }
    };

    frameId = requestAnimationFrame(draw);

    const onResize = () => {
      setSize();
      cols = Math.floor(canvas.width / fontSize);
      drops.length = cols;
      for (let i = 0; i < cols; i++) {
        if (drops[i] === undefined) drops[i] = Math.random() * -80;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.55,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
