"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  label,
}: AnimatedCounterProps) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => setVisible(true),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!visible || !valueRef.current) return;

    if (prefersReduced) {
      valueRef.current.textContent = String(end);
      return;
    }

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: end,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = Math.round(obj.val).toString();
        }
      },
    });

    return () => { tween.kill(); };
  }, [visible, end, duration, prefersReduced]);

  return (
    <div ref={containerRef} style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "var(--color-text)",
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        {prefix}
        <span ref={valueRef}>{prefersReduced ? end : 0}</span>
        {suffix}
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          color: "var(--color-muted)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
    </div>
  );
}
