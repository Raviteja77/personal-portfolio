"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function CursorFollower() {
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 60 });
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 60 });

  const ringX = useSpring(mouseX, { stiffness: 140, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 140, damping: 20 });

  const ringScale = useMotionValue(1);
  const ringScaleSpring = useSpring(ringScale, { stiffness: 300, damping: 26 });
  const ringOpacity = useMotionValue(0);
  const ringOpacitySpring = useSpring(ringOpacity, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (prefersReduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringOpacity.set(1);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, select, label")) {
        ringScale.set(1.9);
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = e.relatedTarget as HTMLElement | null;
      if (!t?.closest("a, button, [role='button'], input, textarea, select, label")) {
        ringScale.set(1);
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [prefersReduced, mouseX, mouseY, ringScale, ringOpacity]);

  if (prefersReduced) return null;

  return (
    <>
      {/* Lagging outer ring */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: -20,
          left: -20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(37,99,235,0.55)",
          x: ringX,
          y: ringY,
          scale: ringScaleSpring,
          opacity: ringOpacitySpring,
          zIndex: 99999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      {/* Sharp inner dot */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--color-accent)",
          x: dotX,
          y: dotY,
          opacity: ringOpacitySpring,
          zIndex: 99999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </>
  );
}
