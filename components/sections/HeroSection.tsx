"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { personal } from "@/content";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { TypewriterCycle } from "@/components/ui/TypewriterCycle";
import { MatrixRain } from "@/components/ui/MatrixRain";
import { FloatingBadges } from "@/components/ui/FloatingBadges";
import { CodeSnippet } from "@/components/ui/CodeSnippet";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const BLOBS = [
  { x: "15%",  y: "22%",  size: 520, color: "#2563EB", dur: 22, delay: 0  },
  { x: "80%",  y: "55%",  size: 420, color: "#7C3AED", dur: 28, delay: 6  },
  { x: "50%",  y: "88%",  size: 360, color: "#0EA5E9", dur: 20, delay: 12 },
] as const;

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const mouse = useMouseParallax(0.025);
  const primaryMag  = useMagneticHover(0.42);
  const secondaryMag = useMagneticHover(0.35);

  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* ── Background layers ── */}
      <MatrixRain />

      {/* Grid texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 90% 85% at 50% 50%, black 25%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 85% at 50% 50%, black 25%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Ambient blobs */}
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden
          animate={prefersReduced ? {} : { x: [0, 26, -16, 12, 0], y: [0, -20, 16, -8, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
          style={{
            position: "absolute",
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: b.color,
            opacity: 0.07,
            filter: `blur(${b.size * 0.22}px)`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      {/* Floating tech badges */}
      <FloatingBadges />

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "6rem 1.5rem 4rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        {/* Left column — identity */}
        <motion.div
          animate={prefersReduced ? {} : { x: mouse.x * 18, y: mouse.y * 12 }}
          transition={{ type: "spring", stiffness: 70, damping: 22 }}
          style={{ flex: "1 1 340px", minWidth: 0 }}
        >
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 0.875rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              marginBottom: "1.75rem",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22C55E",
                boxShadow: "0 0 8px #22C55E",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "var(--color-muted)",
                letterSpacing: "0.02em",
              }}
            >
              Currently @ Fidelity Investments
            </span>
          </motion.div>

          {/* Name — scramble reveal */}
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(2.75rem, 6.5vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
              marginBottom: "0.75rem",
            }}
          >
            <ScrambleText
              text={personal.name}
              delay={200}
              duration={1300}
            />
          </h1>

          {/* Typewriter roles */}
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
              fontWeight: 400,
              color: "var(--color-accent)",
              letterSpacing: "0.01em",
              marginBottom: "1.5rem",
              height: "1.8em",
            }}
          >
            <TypewriterCycle strings={personal.roles} />
          </div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9375rem, 1.8vw, 1.0625rem)",
              color: "var(--color-muted)",
              lineHeight: 1.7,
              maxWidth: "32rem",
              marginBottom: "2.25rem",
            }}
          >
            {personal.tagline}
          </motion.p>

          {/* CTAs with magnetic hover */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}
          >
            {/* Primary CTA */}
            <motion.a
              ref={primaryMag.ref}
              href="#work"
              animate={{ x: primaryMag.xy.x, y: primaryMag.xy.y }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              onMouseMove={primaryMag.onMove}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                color: "#fff",
                background: "var(--color-accent)",
                textDecoration: "none",
                padding: "0.8125rem 2rem",
                borderRadius: "0.5rem",
                display: "inline-block",
                transition: "background 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
                boxShadow: "0 0 0 0 rgba(37,99,235,0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1D4ED8";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.35)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = "var(--color-accent)";
                e.currentTarget.style.boxShadow = "0 0 0 0 rgba(37,99,235,0)";
                primaryMag.onLeave();
              }}
            >
              View Work
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              ref={secondaryMag.ref}
              href="#contact"
              animate={{ x: secondaryMag.xy.x, y: secondaryMag.xy.y }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              onMouseMove={secondaryMag.onMove}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                color: "var(--color-text)",
                background: "transparent",
                textDecoration: "none",
                padding: "0.8125rem 2rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(255,255,255,0.14)",
                display: "inline-block",
                transition: "border-color 0.2s ease, background 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                e.currentTarget.style.background = "transparent";
                secondaryMag.onLeave();
              }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right column — code snippet (desktop only) */}
        <motion.div
          animate={
            prefersReduced
              ? {}
              : { x: -mouse.x * 10, y: -mouse.y * 8 }
          }
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{
            flex: "0 1 440px",
            display: "flex",
            justifyContent: "center",
          }}
          className="hidden lg:flex"
        >
          <CodeSnippet />
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <motion.div
          style={{
            opacity: indicatorOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              color: "var(--color-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <motion.div
            animate={prefersReduced ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, var(--color-muted), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
