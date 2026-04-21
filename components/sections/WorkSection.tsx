"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { projects } from "@/content";
import { GradientText } from "@/components/ui/GradientText";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import type { ProjectCardData } from "@/components/ui/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [activeProject, setActiveProject] = useState<ProjectCardData | null>(null);

  useEffect(() => {
    if (prefersReduced || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.querySelectorAll(".project-card"),
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <section
        id="work"
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
          style={{ marginBottom: "3.5rem" }}
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
            Selected Work
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
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
              Things I&apos;ve{" "}
              <GradientText as="span">built & shipped</GradientText>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--color-muted)",
                maxWidth: "28rem",
                lineHeight: 1.65,
              }}
            >
              A selection of projects spanning full-stack applications, developer
              tooling, and platform integrations.
            </p>
          </div>
        </motion.div>

        {/* Project grid */}
        <div ref={gridRef}>
          {/* Featured: 2-column equal grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "1.25rem",
              marginBottom: "1.25rem",
            }}
          >
            {featured.map((project) => (
              <div
                key={project.id}
                className="project-card"
                style={{ opacity: prefersReduced ? 1 : 0 }}
              >
                <ProjectCard
                  project={project as ProjectCardData}
                  onOpen={setActiveProject}
                  featured
                />
              </div>
            ))}
          </div>

          {/* Others: 3-column grid or 2 on mid, 1 on mobile */}
          {others.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                gap: "1.25rem",
              }}
            >
              {others.map((project) => (
                <div
                  key={project.id}
                  className="project-card"
                  style={{ opacity: prefersReduced ? 1 : 0 }}
                >
                  <ProjectCard
                    project={project as ProjectCardData}
                    onOpen={setActiveProject}
                  />
                </div>
              ))}

              {/* "More on GitHub" card */}
              <motion.a
                href="https://github.com/Raviteja77"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="project-card"
                style={{
                  opacity: prefersReduced ? 1 : 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  borderRadius: "1rem",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.02)",
                  padding: "2rem",
                  textDecoration: "none",
                  minHeight: 160,
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(37,99,235,0.4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                }
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--color-muted)" }}
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--color-muted)",
                    textAlign: "center",
                  }}
                >
                  More on GitHub
                </span>
              </motion.a>
            </div>
          )}
        </div>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
