"use client";

import { useRef } from "react";
import { useScroll as useFramerScroll, useTransform, type MotionValue } from "motion/react";

export function useScrollProgress() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useFramerScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return { ref, scrollYProgress };
}

export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
