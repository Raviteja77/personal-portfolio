"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Marquee } from "@/components/ui/Marquee";
import { certifications } from "@/content";

const CATEGORY_COLORS: Record<string, string> = {
  Frontend:     "#2563EB",
  Backend:      "#7C3AED",
  Languages:    "#0EA5E9",
  Professional: "#10B981",
  "AI/ML":      "#F59E0B",
  Competition:  "#EF4444",
};

function CertCard({
  title,
  issuer,
  image,
  category,
}: {
  title: string;
  issuer: string;
  image: string;
  category: string;
}) {
  const color = CATEGORY_COLORS[category] ?? "#2563EB";

  return (
    <div
      style={{
        width: 260,
        height: 160,
        margin: "0 10px",
        perspective: 800,
        flexShrink: 0,
        cursor: "pointer",
      }}
      className="cert-card-wrapper"
    >
      <motion.div
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front — certificate image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "0.875rem",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#0a0a0c",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover", opacity: 0.9 }}
            sizes="260px"
          />
          {/* Category pill */}
          <span
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#fff",
              background: color,
              padding: "0.2rem 0.5rem",
              borderRadius: "999px",
              opacity: 0.9,
            }}
          >
            {category}
          </span>
        </div>

        {/* Back — details */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "0.875rem",
            border: `1px solid ${color}33`,
            background: `linear-gradient(135deg, #0f0f14 0%, #18181B 100%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            padding: "1.25rem",
            textAlign: "center",
          }}
        >
          {/* Glow dot */}
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 12px ${color}`,
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "0.8125rem",
              color: "var(--color-text)",
              lineHeight: 1.35,
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              color: color,
              fontWeight: 500,
            }}
          >
            {issuer}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function CertificationsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  // Split certs into two rows
  const row1 = certifications.slice(0, Math.ceil(certifications.length / 2));
  const row2 = certifications.slice(Math.ceil(certifications.length / 2));

  return (
    <section
      ref={ref}
      id="certifications"
      style={{
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Heading */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          marginBottom: "3.5rem",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--color-accent)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Credentials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
            letterSpacing: "-0.03em",
            color: "var(--color-text)",
            marginBottom: "1rem",
          }}
        >
          Certifications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--color-muted)",
            maxWidth: "32rem",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Hover to reveal each certificate. {certifications.length} credentials across frontend, backend, and professional development.
        </motion.p>
      </div>

      {/* Row 1 — left to right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ marginBottom: "1.25rem" }}
      >
        <Marquee speed={prefersReduced ? 0 : 45} pauseOnHover>
          {row1.map((cert) => (
            <CertCard key={cert.title} {...cert} />
          ))}
        </Marquee>
      </motion.div>

      {/* Row 2 — right to left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        <Marquee speed={prefersReduced ? 0 : 38} reverse pauseOnHover>
          {row2.map((cert) => (
            <CertCard key={cert.title} {...cert} />
          ))}
        </Marquee>
      </motion.div>

      {/* Bottom count pill */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--color-muted)",
            padding: "0.5rem 1.25rem",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          {certifications.length} certificates earned · hover cards to preview
        </span>
      </motion.div>
    </section>
  );
}
