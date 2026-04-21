"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { personal } from "@/content";

const NAV_LINKS = ["Work", "About", "Skills", "Contact"] as const;

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    setHidden(current > prevY.current && current > 80);
    setScrolled(current > 20);
    prevY.current = current;
  });

  const initials = personal.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
    >
      <div
        style={{
          background: scrolled ? "rgba(9,9,11,0.78)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          transition:
            "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Monogram */}
          <a
            href="/"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "1.125rem",
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              textDecoration: "none",
            }}
          >
            {initials}
          </a>

          {/* Links + CTA */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {NAV_LINKS.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--color-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-text)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-muted)")
                }
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-text)",
                textDecoration: "none",
                padding: "0.5rem 1.125rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                transition: "background 0.2s ease, border-color 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              Hire me
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
