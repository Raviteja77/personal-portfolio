"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { personal, experience, education } from "@/content";
import { GradientText } from "@/components/ui/GradientText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { end: 4, suffix: "+", label: "Years Experience" },
  { end: 3, suffix: "", label: "Fortune 500 Clients" },
  { end: 4, suffix: "+", label: "Projects Shipped" },
  { end: 3.81, suffix: "", prefix: "", label: "MS CS GPA" },
] as const;

const TIMELINE_ITEMS = [
  ...experience.map((e) => ({
    type: "work" as const,
    title: e.role,
    org: e.client ? `${e.company} → ${e.client}` : e.company,
    period: `${e.start} – ${e.end}`,
    location: e.location,
    bullets: e.bullets.slice(0, 2),
  })),
  ...education.map((e) => ({
    type: "edu" as const,
    title: e.degree,
    org: e.school,
    period: `${e.start} – ${e.end}`,
    location: `${e.location} · GPA ${e.gpa}`,
    bullets: [] as string[],
  })),
].slice(0, 5);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      // Bio blur reveal
      if (bioRef.current) {
        gsap.fromTo(
          bioRef.current,
          { filter: "blur(10px)", opacity: 0, y: 24 },
          {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Timeline stagger
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelectorAll(".timeline-item"),
          { opacity: 0, x: -32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const initials = personal.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "7rem 1.5rem",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: "4rem" }}
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
          About
        </p>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.03em",
            color: "var(--color-text)",
            lineHeight: 1.1,
          }}
        >
          Building with{" "}
          <GradientText as="span">purpose & precision</GradientText>
        </h2>
      </motion.div>

      {/* Two-column layout */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4rem",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT: Bio + Stats + Timeline */}
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
          <p
            ref={bioRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "var(--color-muted)",
              lineHeight: 1.75,
              maxWidth: "42rem",
              marginBottom: "3rem",
              opacity: prefersReduced ? 1 : 0,
            }}
          >
            {personal.bio}
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "1.5rem",
              marginBottom: "3.5rem",
              padding: "2rem",
              borderRadius: "1rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {STATS.map((s) => (
              <AnimatedCounter
                key={s.label}
                end={s.end}
                suffix={s.suffix}
                prefix={"prefix" in s ? s.prefix : ""}
                label={s.label}
              />
            ))}
          </div>

          {/* Timeline */}
          <div ref={timelineRef} style={{ position: "relative" }}>
            {/* Vertical line */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: "7px",
                top: "6px",
                bottom: 0,
                width: 2,
                background:
                  "linear-gradient(to bottom, var(--color-accent), transparent)",
                borderRadius: 1,
              }}
            />

            {TIMELINE_ITEMS.map((item, i) => (
              <div
                key={i}
                className="timeline-item"
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  marginBottom: "2rem",
                  paddingLeft: "0.25rem",
                  opacity: prefersReduced ? 1 : 0,
                }}
              >
                {/* Dot */}
                <div
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    marginTop: "3px",
                    background:
                      item.type === "work"
                        ? "var(--color-accent)"
                        : "#7C3AED",
                    boxShadow:
                      item.type === "work"
                        ? "0 0 10px rgba(37,99,235,0.5)"
                        : "0 0 10px rgba(124,58,237,0.5)",
                    border: "2px solid #09090B",
                    position: "relative",
                    zIndex: 1,
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      gap: "0.5rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        color: "var(--color-text)",
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                        color: "var(--color-accent)",
                        background: "rgba(37,99,235,0.12)",
                        padding: "0.125rem 0.5rem",
                        borderRadius: "999px",
                        border: "1px solid rgba(37,99,235,0.25)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.type === "work" ? "Work" : "Education"}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--color-muted)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {item.org}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "rgba(161,161,170,0.6)",
                      marginBottom: item.bullets.length ? "0.5rem" : 0,
                    }}
                  >
                    {item.period} · {item.location}
                  </p>
                  {item.bullets.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {item.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.8125rem",
                            color: "rgba(161,161,170,0.75)",
                            lineHeight: 1.6,
                            paddingLeft: "0.875rem",
                            position: "relative",
                          }}
                        >
                          <span
                            aria-hidden
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "0.55em",
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: "var(--color-accent)",
                              opacity: 0.6,
                            }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Identity card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ flex: "0 1 320px" }}
          className="hidden lg:block"
        >
          <div
            style={{
              borderRadius: "1.25rem",
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              padding: "2rem",
              position: "sticky",
              top: "6rem",
            }}
          >
            {/* Avatar placeholder with initials */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--color-accent), #7C3AED)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
                boxShadow: "0 0 32px rgba(37,99,235,0.3)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                {initials}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "1.25rem",
                letterSpacing: "-0.02em",
                color: "var(--color-text)",
                marginBottom: "0.25rem",
              }}
            >
              {personal.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--color-accent)",
                marginBottom: "1.5rem",
              }}
            >
              Software Engineer · Fidelity Investments
            </p>

            {/* Info rows */}
            {[
              { icon: "📍", label: personal.location },
              { icon: "✉️", label: personal.email },
              { icon: "🔗", label: "github.com/Raviteja77" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ fontSize: "0.875rem", flexShrink: 0 }}>
                  {icon}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--color-muted)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}

            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.07)",
                margin: "1.5rem 0",
              }}
            />

            {/* Availability */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.375rem 0.875rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                marginBottom: "1.5rem",
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
                }}
              >
                Currently @ Fidelity Investments
              </span>
            </div>

            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.875rem",
                color: "#fff",
                background: "var(--color-accent)",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#1D4ED8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--color-accent)")
              }
            >
              View LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
