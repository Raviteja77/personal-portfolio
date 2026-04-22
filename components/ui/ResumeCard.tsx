"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { personal, skills } from "@/content";

const PREVIEW_SKILLS = ["Angular", "React", "TypeScript", "GraphQL", "NgRx"];

export function ResumeCard() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  function handleDownload() {
    if (downloading || downloaded) return;
    setDownloading(true);
    // Trigger browser download
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Ravi_Teja_Geddada_Resume.pdf";
    a.click();
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 800);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      style={{
        position: "relative",
        borderRadius: "1.25rem",
        background: "rgba(24,24,27,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "1.75rem",
        overflow: "hidden",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Animated border beam from 21st.dev */}
      <BorderBeam
        size={180}
        duration={7}
        colorFrom="#2563EB"
        colorTo="#8B5CF6"
        borderWidth={1.5}
      />

      {/* Subtle inner glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(37,99,235,0.5), rgba(139,92,246,0.5), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* PDF icon */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 48,
          height: 48,
          borderRadius: "0.75rem",
          background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(139,92,246,0.15))",
          border: "1px solid rgba(37,99,235,0.3)",
          marginBottom: "1.25rem",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#pdfGrad)"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="pdfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>

      {/* Name + role */}
      <div style={{ marginBottom: "1rem" }}>
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "1.05rem",
            color: "var(--color-text)",
            letterSpacing: "-0.01em",
            marginBottom: "0.2rem",
          }}
        >
          {personal.name}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: "var(--color-muted)",
          }}
        >
          Software Engineer · Angular · React · TypeScript
        </p>
      </div>

      {/* Skills preview chips */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.5rem" }}
      >
        {PREVIEW_SKILLS.map((s) => (
          <span
            key={s}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "var(--color-muted)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "9999px",
              padding: "0.2rem 0.6rem",
            }}
          >
            {s}
          </span>
        ))}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.68rem",
            color: "rgba(161,161,170,0.5)",
            padding: "0.2rem 0.4rem",
          }}
        >
          +{Object.values(skills).flat().length - PREVIEW_SKILLS.length} more
        </span>
      </div>

      {/* Download button — adapted from 21st.dev ShimmerButton */}
      <motion.button
        onClick={handleDownload}
        whileHover={downloading || downloaded ? {} : { scale: 1.02 }}
        whileTap={downloading || downloaded ? {} : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        style={{
          width: "100%",
          padding: "0.75rem 1.25rem",
          borderRadius: "0.75rem",
          border: "1px solid rgba(37,99,235,0.4)",
          background: downloaded
            ? "rgba(34,197,94,0.15)"
            : "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(139,92,246,0.2))",
          cursor: downloading || downloaded ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.55rem",
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Shimmer sweep on hover */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "100%", opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            pointerEvents: "none",
          }}
        />

        <AnimatePresence mode="wait">
          {downloaded ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#22C55E",
                }}
              >
                Downloaded!
              </span>
            </motion.div>
          ) : downloading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid rgba(37,99,235,0.3)",
                  borderTopColor: "#2563EB",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--color-muted)",
                }}
              >
                Downloading…
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <motion.div
                animate={{ y: [0, 2, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#dlGrad)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    <linearGradient id="dlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </motion.div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                }}
              >
                Download Resume
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* View online link */}
      <motion.a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ color: "var(--color-text)" }}
        style={{
          display: "block",
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: "0.72rem",
          color: "var(--color-muted)",
          marginTop: "0.85rem",
          textDecoration: "none",
          transition: "color 0.2s ease",
        }}
      >
        View in browser ↗
      </motion.a>
    </motion.div>
  );
}
