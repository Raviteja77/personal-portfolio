"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface SplitRevealProps {
  text: string;
  suffix?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  style?: React.CSSProperties;
  delay?: number;
}

export function SplitReveal({ text, suffix, as: Tag = "h2", style, delay = 0 }: SplitRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const words = text.split(" ");

  if (prefersReduced) {
    return (
      <Tag ref={ref} style={style}>
        {text}{suffix ? <> {suffix}</> : null}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "105%" }}
            animate={inView ? { y: 0 } : { y: "105%" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.08 }}
          >
            {word}
          </motion.span>
          {"\u00a0"}
        </span>
      ))}
      {suffix && (
        <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "105%" }}
            animate={inView ? { y: 0 } : { y: "105%" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: delay + words.length * 0.08 }}
          >
            {suffix}
          </motion.span>
        </span>
      )}
    </Tag>
  );
}
