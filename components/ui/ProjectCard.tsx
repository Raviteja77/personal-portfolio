"use client";

import { useState } from "react";
import { motion } from "motion/react";

// Per-project gradient thumbnails keyed by project id
const GRADIENTS: Record<string, string> = {
  "rove-around":
    "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(66,133,244,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 70%, rgba(109,179,63,0.25) 0%, transparent 60%), #0f1117",
  acronet:
    "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(36,150,237,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 75% 30%, rgba(9,46,32,0.5) 0%, transparent 60%), #0f1117",
  "find-jobs":
    "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37,99,235,0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(124,58,237,0.2) 0%, transparent 60%), #0f1117",
  "inventory-angular":
    "radial-gradient(ellipse 70% 60% at 25% 45%, rgba(221,0,49,0.22) 0%, transparent 55%), radial-gradient(ellipse 60% 70% at 75% 55%, rgba(109,179,63,0.22) 0%, transparent 60%), #0f1117",
};

export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: readonly string[];
  role: string;
  year: string;
  status: "live" | "wip" | "archived";
  links: { live: string; github: string; caseStudy: string };
  featured: boolean;
}

interface ProjectCardProps {
  project: ProjectCardData;
  onOpen: (project: ProjectCardData) => void;
  featured?: boolean;
}

export function ProjectCard({ project, onOpen, featured = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const gradient = GRADIENTS[project.id] ?? GRADIENTS["find-jobs"];

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
      aria-label={`View ${project.title} case study`}
      style={{
        position: "relative",
        borderRadius: "1rem",
        border: hovered
          ? "1px solid rgba(37,99,235,0.4)"
          : "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.3s ease",
        boxShadow: hovered
          ? "0 0 40px rgba(37,99,235,0.12), 0 20px 60px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.25)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Gradient thumbnail */}
      <div
        style={{
          height: featured ? 200 : 160,
          background: gradient,
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Grid overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Hover overlay — "View Case Study" */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(9,9,11,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "0.875rem",
              color: "#fff",
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(37,99,235,0.8)",
              letterSpacing: "0.01em",
            }}
          >
            View Case Study →
          </span>
        </motion.div>

        {/* Status + year badge */}
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            display: "flex",
            gap: "0.375rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              color: "var(--color-muted)",
              background: "rgba(9,9,11,0.7)",
              backdropFilter: "blur(8px)",
              padding: "0.2rem 0.5rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {project.year}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "1.25rem 1.5rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: featured ? "1.25rem" : "1.0625rem",
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
          {project.featured && (
            <span
              style={{
                flexShrink: 0,
                fontFamily: "var(--font-body)",
                fontSize: "0.625rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                background: "rgba(37,99,235,0.12)",
                border: "1px solid rgba(37,99,235,0.25)",
                padding: "0.2rem 0.5rem",
                borderRadius: "999px",
              }}
            >
              Featured
            </span>
          )}
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--color-muted)",
            lineHeight: 1.65,
            marginBottom: "1rem",
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                color: "rgba(161,161,170,0.8)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "0.2rem 0.5rem",
                borderRadius: "0.25rem",
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                color: "rgba(161,161,170,0.5)",
                padding: "0.2rem 0.25rem",
              }}
            >
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
