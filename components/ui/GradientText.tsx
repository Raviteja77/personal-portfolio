"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GradientTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  className?: string;
}

export function GradientText({ children, as: Tag = "span", className }: GradientTextProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { backgroundSize: "0% 100%" },
        {
          backgroundSize: "100% 100%",
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  const baseStyle: React.CSSProperties = {
    backgroundImage: "linear-gradient(90deg, var(--color-accent) 0%, #7C3AED 50%, #0EA5E9 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundRepeat: "no-repeat",
    backgroundSize: prefersReduced ? "100% 100%" : "0% 100%",
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} style={baseStyle} className={className}>
      {children}
    </Tag>
  );
}
