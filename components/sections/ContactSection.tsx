"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { personal } from "@/content";
import { GradientText } from "@/components/ui/GradientText";
import { ResumeCard } from "@/components/ui/ResumeCard";
import { useMagneticHover } from "@/hooks/useMagneticHover";

gsap.registerPlugin(ScrollTrigger);

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const emailRef    = useRef<HTMLAnchorElement>(null);
  const prefersReduced = useReducedMotion();

  const [fields, setFields]   = useState<FormFields>({ name: "", email: "", message: "" });
  const [status, setStatus]   = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  // GSAP: big email link gradient sweep on scroll
  useEffect(() => {
    if (prefersReduced || !emailRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        emailRef.current,
        { backgroundSize: "0% 2px", opacity: 0, y: 20 },
        {
          backgroundSize: "100% 2px",
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: emailRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
      // Reset to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "7rem 1.5rem 5rem",
        maxWidth: "1280px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* Ambient glows */}
      <div aria-hidden style={{
        position: "absolute", left: "-8%", top: "10%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", right: "-5%", bottom: "15%",
        width: 450, height: 450, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: "1rem" }}
      >
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "0.75rem",
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--color-accent)", marginBottom: "0.75rem",
        }}>
          Contact
        </p>
        <h2 style={{
          fontFamily: "var(--font-heading)", fontWeight: 700,
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          letterSpacing: "-0.03em", color: "var(--color-text)", lineHeight: 1.1,
        }}>
          Have a project{" "}
          <GradientText as="span">in mind?</GradientText>
        </h2>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "0.875rem",
          color: "var(--color-muted)", maxWidth: "34rem",
          lineHeight: 1.65, marginTop: "1rem",
        }}>
          Whether it&apos;s a role, a collaboration, or just a hello — I&apos;d love to hear from you.
          Drop a message or reach out directly.
        </p>
      </motion.div>

      {/* Big interactive email link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ marginBottom: "4.5rem" }}
      >
        <a
          ref={emailRef}
          href={`mailto:${personal.email}`}
          style={{
            display: "inline-block",
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
            color: "var(--color-text)",
            textDecoration: "none",
            backgroundImage: "linear-gradient(to right, #2563EB, #8B5CF6)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 100%",
            backgroundSize: "0% 2px",
            transition: "color 0.3s ease",
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#A1A1AA";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
          }}
        >
          {personal.email} ↗
        </a>
      </motion.div>

      {/* Main two-column grid */}
      <div className="contact-layout" style={{ display: "grid", gap: "2.5rem", alignItems: "start" }}>

        {/* LEFT: Contact form */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            position: "relative",
            borderRadius: "1.25rem",
            background: "rgba(24,24,27,0.7)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "2rem",
            backdropFilter: "blur(16px)",
          }}>
            {/* Subtle top-edge glow line */}
            <div aria-hidden style={{
              position: "absolute", top: 0, left: "20%",
              width: "60%", height: 1,
              background: "linear-gradient(to right, transparent, rgba(37,99,235,0.4), transparent)",
              pointerEvents: "none",
            }} />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    gap: "1rem", padding: "3rem 1rem", textAlign: "center",
                  }}
                >
                  {/* Success checkmark ring */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    style={{
                      width: 64, height: 64, borderRadius: "50%",
                      background: "rgba(34,197,94,0.12)",
                      border: "2px solid rgba(34,197,94,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 0 32px rgba(34,197,94,0.2)",
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                      stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <motion.polyline
                        points="20 6 9 17 4 12"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                      />
                    </svg>
                  </motion.div>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-heading)", fontWeight: 700,
                      fontSize: "1.15rem", color: "var(--color-text)", marginBottom: "0.4rem",
                    }}>
                      Message sent!
                    </p>
                    <p style={{
                      fontFamily: "var(--font-body)", fontSize: "0.85rem",
                      color: "var(--color-muted)", lineHeight: 1.6,
                    }}>
                      Thanks for reaching out. I&apos;ll get back to you soon.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                  <p style={{
                    fontFamily: "var(--font-heading)", fontWeight: 700,
                    fontSize: "1.05rem", color: "var(--color-text)",
                    marginBottom: "-0.25rem",
                  }}>
                    Send a message
                  </p>

                  {/* Name */}
                  <FormField
                    label="Your Name"
                    name="name"
                    type="text"
                    value={fields.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    focused={focused === "name"}
                    required
                  />

                  {/* Email */}
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={fields.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    focused={focused === "email"}
                    required
                  />

                  {/* Message */}
                  <FormField
                    label="Your Message"
                    name="message"
                    type="textarea"
                    value={fields.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    focused={focused === "message"}
                    required
                  />

                  {/* Error message */}
                  <AnimatePresence>
                    {status === "error" && errorMsg && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          fontFamily: "var(--font-body)", fontSize: "0.78rem",
                          color: "#F87171", marginTop: "-0.5rem",
                        }}
                      >
                        {errorMsg}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={status === "submitting" ? {} : { scale: 1.02 }}
                    whileTap={status === "submitting" ? {} : { scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    style={{
                      padding: "0.82rem 1.5rem",
                      borderRadius: "0.75rem",
                      border: "none",
                      background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                      cursor: status === "submitting" ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", gap: "0.6rem",
                      opacity: status === "submitting" ? 0.75 : 1,
                      position: "relative", overflow: "hidden",
                    }}
                  >
                    {/* Shimmer sweep */}
                    <motion.div
                      initial={{ x: "-120%", skewX: "-15deg" }}
                      whileHover={{ x: "120%" }}
                      transition={{ duration: 0.55, ease: "easeInOut" }}
                      style={{
                        position: "absolute", inset: 0, width: "50%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                        pointerEvents: "none",
                      }}
                    />
                    {status === "submitting" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                          style={{
                            width: 15, height: 15, borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTopColor: "#fff",
                          }}
                        />
                        <span style={{
                          fontFamily: "var(--font-body)", fontSize: "0.88rem",
                          fontWeight: 600, color: "#fff",
                        }}>
                          Sending…
                        </span>
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                          stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        <span style={{
                          fontFamily: "var(--font-body)", fontSize: "0.88rem",
                          fontWeight: 600, color: "#fff",
                        }}>
                          Send Message
                        </span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* RIGHT: Resume card + social links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <ResumeCard />

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            style={{ display: "flex", gap: "0.75rem" }}
          >
            <SocialPill
              href={personal.social.github}
              label="GitHub"
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              }
            />
            <SocialPill
              href={personal.social.linkedin}
              label="LinkedIn"
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              }
            />
          </motion.div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.55rem",
              padding: "0.45rem 1rem",
              borderRadius: "9999px",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              width: "fit-content",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "inline-block", width: 7, height: 7,
                borderRadius: "50%", background: "#22C55E",
                boxShadow: "0 0 8px rgba(34,197,94,0.6)",
              }}
            />
            <span style={{
              fontFamily: "var(--font-body)", fontSize: "0.72rem",
              fontWeight: 600, color: "#22C55E", letterSpacing: "0.04em",
            }}>
              Open to opportunities
            </span>
          </motion.div>
        </div>
      </div>

      {/* Footer divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          height: 1, marginTop: "5rem",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
          transformOrigin: "center",
        }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          fontFamily: "var(--font-body)", fontSize: "0.72rem",
          color: "rgba(161,161,170,0.4)", textAlign: "center",
          marginTop: "1.5rem", letterSpacing: "0.04em",
        }}
      >
        Designed &amp; built by Ravi Teja Geddada · {new Date().getFullYear()}
      </motion.p>

      {/* Responsive layout styles */}
      <style>{`
        .contact-layout {
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr 380px;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

interface FormFieldProps {
  label: string;
  name: string;
  type: "text" | "email" | "textarea";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused: boolean;
  required?: boolean;
}

function FormField({ label, name, type, value, onChange, onFocus, onBlur, focused, required }: FormFieldProps) {
  const isActive = focused || value.length > 0;
  const borderColor = focused
    ? "rgba(37,99,235,0.7)"
    : "rgba(255,255,255,0.08)";

  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${borderColor}`,
    borderRadius: "0.625rem",
    padding: "1.25rem 1rem 0.5rem",
    fontFamily: "var(--font-body)",
    fontSize: "0.88rem",
    color: "var(--color-text)",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: focused ? "0 0 0 3px rgba(37,99,235,0.12)" : "none",
    resize: type === "textarea" ? "vertical" : undefined,
    minHeight: type === "textarea" ? 120 : undefined,
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Floating label */}
      <label
        htmlFor={name}
        style={{
          position: "absolute",
          left: "1rem",
          top: isActive ? "0.45rem" : "50%",
          transform: type === "textarea" ? (isActive ? "none" : "translateY(-50%)") : (isActive ? "none" : "translateY(-50%)"),
          fontFamily: "var(--font-body)",
          fontSize: isActive ? "0.65rem" : "0.85rem",
          fontWeight: isActive ? 600 : 400,
          color: focused ? "var(--color-accent)" : "var(--color-muted)",
          pointerEvents: "none",
          transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
          letterSpacing: isActive ? "0.06em" : "0",
          textTransform: isActive ? "uppercase" : "none",
          zIndex: 1,
        }}
      >
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          style={{ ...sharedStyle, paddingTop: "1.5rem" }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          style={sharedStyle}
          autoComplete={name === "email" ? "email" : "off"}
        />
      )}
    </div>
  );
}

function SocialPill({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  const mag = useMagneticHover(0.32);
  return (
    <motion.a
      ref={mag.ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      animate={{ x: mag.xy.x, y: mag.xy.y }}
      whileHover={{ scale: 1.05, borderColor: "rgba(37,99,235,0.5)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onMouseMove={mag.onMove}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "0.55rem 1rem",
        borderRadius: "9999px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        textDecoration: "none",
        color: "var(--color-muted)",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text)")}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
        mag.onLeave();
      }}
    >
      {icon}
      <span style={{
        fontFamily: "var(--font-body)", fontSize: "0.78rem",
        fontWeight: 500, letterSpacing: "0.02em",
      }}>
        {label}
      </span>
    </motion.a>
  );
}
