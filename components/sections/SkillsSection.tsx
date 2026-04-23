"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { skills } from "@/content";
import { GradientText } from "@/components/ui/GradientText";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { SkillOrbit } from "@/components/ui/SkillOrbit";

gsap.registerPlugin(ScrollTrigger);

interface CategoryConfig {
  key: keyof typeof skills;
  label: string;
  accent: string;
}

const CATEGORIES: CategoryConfig[] = [
  { key: "languages", label: "Languages", accent: "#F59E0B" },
  { key: "frontend",  label: "Frontend",  accent: "#61DAFB" },
  { key: "backend",   label: "Backend",   accent: "#6DB33F" },
  { key: "database",  label: "Database",  accent: "#F87171" },
  { key: "devops",    label: "DevOps & Tools", accent: "#A78BFA" },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const groupsRef  = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !groupsRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger each category group
      gsap.fromTo(
        groupsRef.current!.querySelectorAll(".skill-group"),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: groupsRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      // Stagger the chips themselves for a pop-in cascade
      gsap.fromTo(
        groupsRef.current!.querySelectorAll(".skill-chip"),
        { opacity: 0, scale: 0.84, y: 6 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.032,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: groupsRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "7rem 1.5rem",
        maxWidth: "1280px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* Decorative ambient glow — right side */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-10%",
          top: "15%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.065) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Decorative ambient glow — left side */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-12%",
          bottom: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: "4.5rem" }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "0.75rem",
          }}
        >
          Expertise
        </p>
        <SplitReveal
          text="Tools of"
          suffix={<GradientText as="span">the trade</GradientText>}
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.03em",
            color: "var(--color-text)",
            lineHeight: 1.1,
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "var(--color-muted)",
            maxWidth: "36rem",
            lineHeight: 1.65,
            marginTop: "1rem",
          }}
        >
          A full-stack toolkit spanning frontend frameworks, backend services, and
          developer tooling — refined across 4+ years of production engineering.
        </p>
      </motion.div>

      {/* Body: two-col on desktop, stacked on mobile */}
      <div
        style={{
          display: "grid",
          gap: "4rem",
          alignItems: "center",
        }}
        className="skills-layout"
      >
        {/* Orbit visualization — desktop only */}
        <motion.div
          className="orbit-col"
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <SkillOrbit />
        </motion.div>

        {/* Categorised skill chips */}
        <div
          ref={groupsRef}
          style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
        >
          {CATEGORIES.map(({ key, label, accent }) => (
            <div
              key={key}
              className="skill-group"
              style={{ opacity: prefersReduced ? 1 : 0 }}
            >
              {/* Category header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "0.8rem",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: accent,
                    boxShadow: `0 0 8px ${accent}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: accent,
                    fontWeight: 700,
                  }}
                >
                  {label}
                </span>
                {/* Decorative rule */}
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: `linear-gradient(to right, ${accent}28, transparent)`,
                    marginLeft: "0.25rem",
                  }}
                />
              </div>

              {/* Chip row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {skills[key].map((skill) => (
                  <SkillChip
                    key={skill}
                    label={skill}
                    accent={accent}
                    prefersReduced={!!prefersReduced}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive style overrides */}
      <style>{`
        .skills-layout {
          grid-template-columns: 1fr;
        }
        .orbit-col {
          display: none;
        }
        @media (min-width: 1024px) {
          .skills-layout {
            grid-template-columns: 500px 1fr;
          }
          .orbit-col {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}

function SkillChip({
  label,
  accent,
  prefersReduced,
}: {
  label: string;
  accent: string;
  prefersReduced: boolean;
}) {
  return (
    <motion.div
      className="skill-chip"
      style={{
        opacity: prefersReduced ? 1 : 0,
        padding: "0.32rem 0.82rem",
        borderRadius: "9999px",
        background: "rgba(255,255,255,0.038)",
        border: "1px solid rgba(255,255,255,0.08)",
        cursor: "default",
        backdropFilter: "blur(4px)",
      }}
      whileHover={
        prefersReduced
          ? {}
          : {
              scale: 1.07,
              background: `${accent}14`,
              borderColor: `${accent}45`,
              boxShadow: `0 0 14px ${accent}28`,
            }
      }
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "var(--color-text)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}
