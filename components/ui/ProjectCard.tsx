"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

// Gradient color overlay per project (sits on top of screenshot)
const OVERLAYS: Record<string, string> = {
  "rove-around":
    "linear-gradient(to bottom, rgba(66,133,244,0.18) 0%, rgba(9,9,11,0.55) 100%)",
  acronet:
    "linear-gradient(to bottom, rgba(36,150,237,0.18) 0%, rgba(9,9,11,0.55) 100%)",
  "find-jobs":
    "linear-gradient(to bottom, rgba(37,99,235,0.18) 0%, rgba(9,9,11,0.55) 100%)",
  "inventory-angular":
    "linear-gradient(to bottom, rgba(221,0,49,0.15) 0%, rgba(9,9,11,0.55) 100%)",
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
  images: { thumbnail: string; screenshots: readonly string[] };
  featured: boolean;
}

interface ProjectCardProps {
  project: ProjectCardData;
  onOpen: (project: ProjectCardData) => void;
  featured?: boolean;
}

export function ProjectCard({ project, onOpen, featured = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const overlay = OVERLAYS[project.id] ?? OVERLAYS["find-jobs"];

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
      {/* Screenshot thumbnail */}
      <div
        style={{
          height: featured ? 200 : 160,
          position: "relative",
          flexShrink: 0,
          background: "#0f1117",
          overflow: "hidden",
        }}
      >
        {/* Real screenshot */}
        <Image
          src={project.images.thumbnail}
          alt={`${project.title} screenshot`}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "top",
            opacity: hovered ? 0.7 : 0.85,
            transition: "opacity 0.3s ease, transform 0.4s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient colour tint on top */}
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, background: overlay }}
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
