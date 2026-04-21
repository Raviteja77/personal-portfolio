"use client";

import { motion, useReducedMotion } from "motion/react";

const BADGES = [
  { label: "Angular",      color: "#DD0031", x: "6%",  y: "14%" },
  { label: "React",        color: "#61DAFB", x: "87%", y: "11%" },
  { label: "TypeScript",   color: "#3178C6", x: "4%",  y: "42%" },
  { label: "NgRx",         color: "#BA2BD2", x: "89%", y: "38%" },
  { label: "GraphQL",      color: "#E535AB", x: "3%",  y: "68%" },
  { label: "Spring Boot",  color: "#6DB33F", x: "88%", y: "65%" },
  { label: "Lit Elements", color: "#324FFF", x: "9%",  y: "84%" },
  { label: "Docker",       color: "#2496ED", x: "83%", y: "82%" },
  { label: "RxJS",         color: "#B7178C", x: "17%", y: "91%" },
  { label: "Storybook",    color: "#FF4785", x: "73%", y: "92%" },
];

const FLOATS = [
  { dur: 4.2, delay: 0,   dy: 9  },
  { dur: 5.1, delay: 0.6, dy: 11 },
  { dur: 3.7, delay: 1.1, dy: 8  },
  { dur: 6.0, delay: 0.3, dy: 10 },
  { dur: 4.6, delay: 1.6, dy: 9  },
  { dur: 5.4, delay: 0.9, dy: 12 },
  { dur: 3.9, delay: 0.2, dy: 7  },
  { dur: 4.9, delay: 1.3, dy: 10 },
  { dur: 5.3, delay: 0.7, dy: 8  },
  { dur: 4.4, delay: 1.9, dy: 11 },
];

export function FloatingBadges() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      {BADGES.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.4 + i * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            position: "absolute",
            left: badge.x,
            top: badge.y,
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <motion.div
            animate={prefersReduced ? {} : { y: [0, -FLOATS[i].dy, 0] }}
            transition={{
              duration: FLOATS[i].dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: FLOATS[i].delay,
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.3rem 0.7rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: badge.color,
                boxShadow: `0 0 6px ${badge.color}80`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                color: "var(--color-muted)",
                letterSpacing: "0.02em",
              }}
            >
              {badge.label}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
