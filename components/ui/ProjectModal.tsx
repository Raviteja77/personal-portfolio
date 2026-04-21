"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ProjectCardData } from "./ProjectCard";

interface ProjectModalProps {
  project: ProjectCardData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 80,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          />

          {/* Drawer panel — slides up from bottom */}
          <motion.div
            key="modal"
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 90,
              maxHeight: "90dvh",
              overflowY: "auto",
              borderRadius: "1.5rem 1.5rem 0 0",
              background: "#111113",
              border: "1px solid rgba(255,255,255,0.09)",
              borderBottom: "none",
            }}
          >
            {/* Drag handle */}
            <div
              aria-hidden
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                background: "rgba(255,255,255,0.15)",
                margin: "1rem auto 0",
              }}
            />

            <div
              style={{
                maxWidth: "720px",
                margin: "0 auto",
                padding: "1.75rem 1.5rem 3rem",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {project.role} · {project.year}
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 4vw, 2rem)",
                      letterSpacing: "-0.03em",
                      color: "var(--color-text)",
                      lineHeight: 1.1,
                    }}
                  >
                    {project.title}
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    flexShrink: 0,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    color: "var(--color-muted)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
                  }
                >
                  ✕
                </button>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Long description */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                }}
              >
                {project.longDescription}
              </p>

              {/* Tech stack */}
              <div style={{ marginBottom: "2rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Tech Stack
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        color: "var(--color-text)",
                        background: "rgba(37,99,235,0.1)",
                        border: "1px solid rgba(37,99,235,0.2)",
                        padding: "0.3rem 0.75rem",
                        borderRadius: "999px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.links.github || project.links.live) && (
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        color: "var(--color-text)",
                        textDecoration: "none",
                        padding: "0.625rem 1.25rem",
                        borderRadius: "0.5rem",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.05)",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
                      }
                    >
                      GitHub →
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        color: "#fff",
                        textDecoration: "none",
                        padding: "0.625rem 1.25rem",
                        borderRadius: "0.5rem",
                        background: "var(--color-accent)",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#1D4ED8")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "var(--color-accent)")
                      }
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
