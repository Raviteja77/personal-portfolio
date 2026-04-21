"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoParallaxProps {
  src?: string;
  posterSrc?: string;
}

export function VideoParallax({ src, posterSrc }: VideoParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !mediaRef.current) return;

    const tween = gsap.to(mediaRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => { tween.kill(); };
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      aria-hidden
      style={{
        position: "relative",
        height: "60vh",
        overflow: "hidden",
      }}
    >
      {/* Gradient overlay — always present */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(to bottom, #09090B 0%, transparent 30%, transparent 70%, #09090B 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle noise grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          pointerEvents: "none",
        }}
      />

      <div
        ref={mediaRef}
        style={{
          position: "absolute",
          inset: "-20% 0",
          zIndex: 1,
        }}
      >
        {src ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={posterSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.35) saturate(1.4)",
            }}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          /* CSS gradient fallback when no video provided */
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `
                radial-gradient(ellipse 80% 60% at 20% 50%, rgba(37,99,235,0.18) 0%, transparent 60%),
                radial-gradient(ellipse 60% 80% at 80% 30%, rgba(124,58,237,0.14) 0%, transparent 60%),
                radial-gradient(ellipse 70% 70% at 50% 80%, rgba(14,165,233,0.12) 0%, transparent 60%),
                #09090B
              `,
            }}
          >
            {/* Animated moving grid lines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(37,99,235,0.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(37,99,235,0.08) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                maskImage:
                  "radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 100%)",
              }}
            />
          </div>
        )}
      </div>

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "0.75rem",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
          }}
        >
          Engineering Excellence
        </p>
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
            maxWidth: "700px",
            lineHeight: 1.15,
          }}
        >
          Turning complex problems into elegant software
        </p>
      </div>
    </section>
  );
}
