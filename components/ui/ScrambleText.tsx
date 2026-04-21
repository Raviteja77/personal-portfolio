"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%<>/\\[]{}=;";

interface Props {
  text: string;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export function ScrambleText({ text, delay = 0, duration = 1400, style }: Props) {
  const [displayed, setDisplayed] = useState(text);
  const prefersReduced = useReducedMotion();
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayed(text);
      return;
    }

    // Immediately show scrambled on mount
    setDisplayed(
      text
        .split("")
        .map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("")
    );

    timeoutRef.current = setTimeout(() => {
      startRef.current = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startRef.current) / duration, 1);
        const resolved = Math.floor(progress * text.replace(/ /g, "").length);
        let ri = 0;

        setDisplayed(
          text
            .split("")
            .map((char) => {
              if (char === " ") return " ";
              const isResolved = ri++ < resolved;
              return isResolved
                ? char
                : CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayed(text);
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, duration, prefersReduced]);

  return <span style={style}>{displayed}</span>;
}
