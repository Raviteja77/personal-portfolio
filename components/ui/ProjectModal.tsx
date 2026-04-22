"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { ProjectCardData } from "./ProjectCard";

interface ProjectModalProps {
  project: ProjectCardData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeShot, setActiveShot] = useState(0);

  // Reset gallery index when project changes
  useEffect(() => { setActiveShot(0); }, [project]);

  const prev = useCallback(() =>
    setActiveShot((i) => (i - 1 + (project?.images.screenshots.length ?? 1)) % (project?.images.screenshots.length ?? 1)),
    [project]
  );
  const next = useCallback(() =>
    setActiveShot((i) => (i + 1) % (project?.images.screenshots.length ?? 1)),
    [project]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

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
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Drawer */}
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
              maxHeight: "92dvh",
              overflowY: "auto",
              borderRadius: "1.5rem 1.5rem 0 0",
              background: "#111113",
              border: "1px solid rgba(255,255,255,0.09)",
              borderBottom: "none",
            }}
          >
            {/* Drag handle */}
            <div aria-hidden style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", margin: "1rem auto 0" }} />

            <div style={{ maxWidth: "760px", margin: "0 auto", padding: "1.75rem 1.5rem 3rem" }}>

              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "0.375rem" }}>
                    {project.role} · {project.year}
                  </p>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2rem)", letterSpacing: "-0.03em", color: "var(--color-text)", lineHeight: 1.1 }}>
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "var(--color-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", transition: "background 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                >✕</button>
              </div>

              {/* ── Screenshot gallery ── */}
              {project.images.screenshots.length > 0 && (
                <div style={{ marginBottom: "2rem" }}>
                  {/* Main image */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16 / 9",
                      borderRadius: "0.875rem",
                      overflow: "hidden",
                      background: "#0a0a0c",
                      border: "1px solid rgba(255,255,255,0.08)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeShot}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: "absolute", inset: 0 }}
                      >
                        <Image
                          src={project.images.screenshots[activeShot]}
                          alt={`${project.title} screenshot ${activeShot + 1}`}
                          fill
                          style={{ objectFit: "cover", objectPosition: "top" }}
                          sizes="760px"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Prev / Next arrows */}
                    {project.images.screenshots.length > 1 && (
                      <>
                        <button
                          onClick={prev}
                          aria-label="Previous screenshot"
                          style={{
                            position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                            width: 34, height: 34, borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.2)",
                            background: "rgba(9,9,11,0.7)", backdropFilter: "blur(8px)",
                            color: "#fff", cursor: "pointer", fontSize: "0.875rem",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            zIndex: 2, transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(37,99,235,0.7)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(9,9,11,0.7)")}
                        >‹</button>
                        <button
                          onClick={next}
                          aria-label="Next screenshot"
                          style={{
                            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                            width: 34, height: 34, borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.2)",
                            background: "rgba(9,9,11,0.7)", backdropFilter: "blur(8px)",
                            color: "#fff", cursor: "pointer", fontSize: "0.875rem",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            zIndex: 2, transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(37,99,235,0.7)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(9,9,11,0.7)")}
                        >›</button>
                      </>
                    )}

                    {/* Counter badge */}
                    <span style={{
                      position: "absolute", bottom: 10, right: 12,
                      fontFamily: "var(--font-body)", fontSize: "0.6875rem",
                      color: "rgba(255,255,255,0.6)",
                      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
                      padding: "0.2rem 0.5rem", borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}>
                      {activeShot + 1} / {project.images.screenshots.length}
                    </span>
                  </div>

                  {/* Thumbnail strip */}
                  {project.images.screenshots.length > 1 && (
                    <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
                      {project.images.screenshots.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveShot(i)}
                          aria-label={`Screenshot ${i + 1}`}
                          style={{
                            flexShrink: 0,
                            width: 80,
                            height: 50,
                            borderRadius: "0.375rem",
                            overflow: "hidden",
                            border: i === activeShot ? "2px solid var(--color-accent)" : "2px solid rgba(255,255,255,0.08)",
                            cursor: "pointer",
                            position: "relative",
                            background: "#0a0a0c",
                            transition: "border-color 0.2s",
                            padding: 0,
                          }}
                        >
                          <Image src={src} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="80px" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: "1.5rem" }} />

              {/* Description */}
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--color-muted)", lineHeight: 1.75, marginBottom: "2rem" }}>
                {project.longDescription}
              </p>

              {/* Tech stack */}
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.75rem" }}>
                  Tech Stack
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {project.tech.map((t) => (
                    <span key={t} style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-text)", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", padding: "0.3rem 0.75rem", borderRadius: "999px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.links.github || project.links.live) && (
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.875rem", color: "var(--color-text)", textDecoration: "none", padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", transition: "background 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                    >GitHub →</a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.875rem", color: "#fff", textDecoration: "none", padding: "0.625rem 1.25rem", borderRadius: "0.5rem", background: "var(--color-accent)", transition: "background 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-accent)")}
                    >Live Demo →</a>
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
