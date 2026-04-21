"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface Props {
  strings: readonly string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  style?: React.CSSProperties;
}

export function TypewriterCycle({
  strings,
  typeSpeed = 65,
  deleteSpeed = 32,
  pauseMs = 2200,
  style,
}: Props) {
  const prefersReduced = useReducedMotion();
  const [text, setText] = useState(prefersReduced ? strings[0] : "");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [idx, setIdx] = useState(0);
  const [cursor, setCursor] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setCursor((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const target = strings[idx % strings.length];

    if (phase === "typing") {
      if (text === target) {
        timerRef.current = setTimeout(() => setPhase("pausing"), pauseMs);
        return;
      }
      timerRef.current = setTimeout(() => {
        setText(target.slice(0, text.length + 1));
      }, typeSpeed);
    } else if (phase === "pausing") {
      timerRef.current = setTimeout(() => setPhase("deleting"), 100);
    } else {
      if (text === "") {
        setIdx((i) => i + 1);
        setPhase("typing");
        return;
      }
      timerRef.current = setTimeout(() => {
        setText(text.slice(0, -1));
      }, deleteSpeed);
    }

    return () => clearTimeout(timerRef.current);
  }, [text, phase, idx, strings, typeSpeed, deleteSpeed, pauseMs, prefersReduced]);

  return (
    <span style={style}>
      {text}
      <span
        style={{
          opacity: cursor ? 1 : 0,
          color: "var(--color-accent)",
          fontWeight: 300,
          marginLeft: "1px",
        }}
      >
        |
      </span>
    </span>
  );
}
