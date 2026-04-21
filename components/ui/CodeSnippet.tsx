"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Token = { text: string; color: string };
type Line  = Token[];

const C = {
  comment:   "#5C6370",
  keyword:   "#C678DD",
  className: "#61AFEF",
  prop:      "#E06C75",
  string:    "#98C379",
  bool:      "#E5C07B",
  punct:     "#ABB2BF",
  dim:       "rgba(171,178,191,0.45)",
};

const LINES: Line[] = [
  [{ text: "// The only constant is change", color: C.comment }],
  [
    { text: "export ", color: C.keyword },
    { text: "class ", color: C.keyword },
    { text: "RaviTejaComponent", color: C.className },
    { text: " {", color: C.punct },
  ],
  [
    { text: "  firstName ", color: C.prop },
    { text: "= ", color: C.punct },
    { text: "'Ravi Teja'", color: C.string },
    { text: ";", color: C.punct },
  ],
  [
    { text: "  lastName  ", color: C.prop },
    { text: "= ", color: C.punct },
    { text: "'Geddada'", color: C.string },
    { text: ";", color: C.punct },
  ],
  [
    { text: "  location  ", color: C.prop },
    { text: "= ", color: C.punct },
    { text: "'Roanoke, TX'", color: C.string },
    { text: ";", color: C.punct },
  ],
  [
    { text: "  role      ", color: C.prop },
    { text: "= ", color: C.punct },
    { text: "'Software Engineer'", color: C.string },
    { text: ";", color: C.punct },
  ],
  [
    { text: "  degree    ", color: C.prop },
    { text: "= ", color: C.punct },
    { text: "'MS Computer Science'", color: C.string },
    { text: ";", color: C.punct },
  ],
  [
    { text: "  stack     ", color: C.prop },
    { text: "= [", color: C.punct },
    { text: "'Angular'", color: C.string },
    { text: ", ", color: C.punct },
    { text: "'React'", color: C.string },
    { text: ",", color: C.punct },
  ],
  [
    { text: "             ", color: C.punct },
    { text: "'TypeScript'", color: C.string },
    { text: ", ", color: C.punct },
    { text: "'Lit'", color: C.string },
    { text: "];", color: C.punct },
  ],
  [
    { text: "  passionate", color: C.prop },
    { text: " = ", color: C.punct },
    { text: "true", color: C.bool },
    { text: ";", color: C.punct },
  ],
  [{ text: "}", color: C.punct }],
];

export function CodeSnippet() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(prefersReduced ? LINES.length : 0);
  const [cursorLine, setCursorLine] = useState(0);
  const [blink, setBlink] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Reveal lines one-by-one
  useEffect(() => {
    if (prefersReduced) { setVisible(LINES.length); return; }

    let n = 0;
    const next = () => {
      if (n >= LINES.length) return;
      n++;
      setVisible(n);
      setCursorLine(n - 1);
      timerRef.current = setTimeout(next, 100 + Math.random() * 90);
    };
    timerRef.current = setTimeout(next, 700);
    return () => clearTimeout(timerRef.current);
  }, [prefersReduced]);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setBlink((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 48, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      style={{
        background: "rgba(12,12,16,0.9)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "0.875rem",
        overflow: "hidden",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        fontFamily:
          "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
        fontSize: "0.8125rem",
        lineHeight: 1.75,
        width: "100%",
        maxWidth: "420px",
        boxShadow:
          "0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
        <span
          style={{
            marginLeft: "0.625rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          raviteja.ts
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-body)",
            fontSize: "0.6875rem",
            color: "rgba(255,255,255,0.15)",
          }}
        >
          TypeScript
        </span>
      </div>

      {/* Code body */}
      <div style={{ padding: "1.125rem 0.5rem 1.25rem" }}>
        {LINES.slice(0, visible).map((line, li) => (
          <div
            key={li}
            style={{ display: "flex", alignItems: "center", minHeight: "1.75em" }}
          >
            {/* Line number */}
            <span
              style={{
                minWidth: "2.5rem",
                textAlign: "right",
                paddingRight: "1rem",
                color: "rgba(255,255,255,0.12)",
                userSelect: "none",
                fontSize: "0.6875rem",
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', monospace",
              }}
            >
              {li + 1}
            </span>

            {/* Tokens */}
            {line.map((tok, ti) => (
              <span key={ti} style={{ color: tok.color }}>
                {tok.text}
              </span>
            ))}

            {/* Typing cursor */}
            {li === cursorLine && visible < LINES.length && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1.1em",
                  background: "var(--color-accent)",
                  marginLeft: 1,
                  opacity: blink ? 1 : 0,
                  transition: "opacity 0.08s",
                  verticalAlign: "middle",
                  borderRadius: 1,
                }}
              />
            )}
          </div>
        ))}

        {/* Block cursor after done */}
        {visible === LINES.length && (
          <div style={{ display: "flex", alignItems: "center", minHeight: "1.75em" }}>
            <span style={{ minWidth: "2.5rem", paddingRight: "1rem" }} />
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: "1.1em",
                background: "var(--color-accent)",
                opacity: blink ? 0.85 : 0,
                transition: "opacity 0.08s",
                borderRadius: 2,
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
