# Personal Portfolio — Roadmap

## Vision
A personal brand website that looks and feels premium — cinematic dark mode, smooth parallax scrolling, subtle 3D elements, and motion that has purpose. The kind of site that wins awwwards nominations without being gimmicky.

## Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript strict)
- **Styling**: Tailwind CSS v4 (CSS-first config, no tailwind.config.js)
- **Animations**: Framer Motion (component transitions) + GSAP ScrollTrigger (scroll-driven effects)
- **Smooth Scroll**: Lenis v1.1+
- **3D**: React Three Fiber + Three.js + @react-three/drei
- **Email**: Resend (contact form)
- **Deploy**: Vercel

## Design System
- **Style**: Modern Dark + Glassmorphism
- **BG**: `#09090B` (not `#000000` — avoids OLED smear)
- **Accent**: `#2563EB` (customize to personal brand color)
- **Heading Font**: Archivo (300–700w)
- **Body Font**: Space Grotesk (300–700w)
- **Easing**: `[0.16, 1, 0.3, 1]` (Expo.out) for all entries
- **Spring**: `damping: 20, stiffness: 90` for physics-based motion

---

## Phases

### Phase 0 — Project Setup ⬜
- [ ] Initialize Next.js 15 with App Router + TypeScript strict
- [ ] Configure Tailwind v4 (CSS-first config in `app/globals.css`)
- [ ] Set up Google Fonts (Archivo + Space Grotesk) in `app/layout.tsx`
- [ ] Initialize Lenis smooth scroll provider
- [ ] Set up GSAP + ScrollTrigger (client-side only, dynamic import)
- [ ] Define CSS design tokens (colors, spacing, easing)
- [ ] Move `animations.ts` → `lib/animations.ts`
- [ ] Move `index.ts` → `content/index.ts`
- [ ] Create `lib/utils.ts` (cn, clamp, lerp helpers)
- [ ] Set up `tsconfig.json` with `@/` path aliases

### Phase 1 — Hero Section ⬜
- [ ] Full-screen hero layout (100dvh)
- [ ] GSAP text reveal: name animates in word-by-word on load
- [ ] Ambient background: slow-oscillating gradient blobs (CSS + Framer Motion)
- [ ] Mouse parallax on hero text/elements (`useMouseParallax` hook)
- [ ] Subtle grid or noise texture overlay
- [ ] Scroll indicator arrow (fade-out on scroll)
- [ ] Nav: fixed, glassmorphism, hides on scroll down / shows on scroll up

### Phase 2 — About Section ⬜
- [ ] Two-column layout: text left, image/visual right
- [ ] GSAP ScrollTrigger: text lines reveal as you scroll into view
- [ ] Parallax image: moves slower than scroll (10% offset)
- [ ] Floating stat cards (years exp, projects, etc.) with glassmorphism style
- [ ] Subtle hover effects on stats

### Phase 3 — Work / Projects Section ⬜
- [ ] Masonry or featured-first grid layout
- [ ] Project cards with hover: scale + reveal overlay with tech stack
- [ ] GSAP ScrollTrigger: cards stagger in from bottom
- [ ] Featured project: full-width with parallax image hero
- [ ] "Case study" link pattern for detailed projects
- [ ] Filter by category (optional, Phase 2 polish)

### Phase 4 — Skills Section ⬜
- [ ] Skill tags grouped by category (Languages, Frontend, Backend, DevOps)
- [ ] Framer Motion stagger reveal on scroll enter
- [ ] Subtle animated background (floating particles or grid)
- [ ] Proficiency shown via animated fill or opacity weight (no boring progress bars)

### Phase 5 — Contact Section ⬜
- [ ] Simple form: name, email, message
- [ ] Resend integration via Next.js Route Handler (`app/api/contact/route.ts`)
- [ ] Loading → success → error states
- [ ] Social links row (GitHub, LinkedIn, Twitter/X)
- [ ] Footer with copyright

### Phase 6 — 3D Elements (Optional, post-core) ⬜
- [ ] Hero: R3F scene with floating geometric shapes or particles
- [ ] All R3F components: `dynamic(() => import(...), { ssr: false })` + `<Suspense>`
- [ ] Keep GLTF/GLB total under 2MB compressed
- [ ] Test on mobile — disable 3D on low-end devices via `gl.getContext()`

### Phase 7 — Polish & Ship ⬜
- [ ] Loading screen (brief, branded)
- [ ] Page-level smooth transitions (Framer Motion `AnimatePresence`)
- [ ] `prefers-reduced-motion` — all GSAP + Framer Motion respects this
- [ ] SEO: `metadata` in `app/layout.tsx`, OG image, `sitemap.ts`
- [ ] Lighthouse target: 90+ on all metrics
- [ ] Mobile: test at 375px, 768px, 1024px
- [ ] Fill in real content in `content/index.ts`
- [ ] Vercel deploy: push `main` → auto-deploys

---

## Section Order (Final Page Flow)
```
↓  Hero          — full screen, cinematic intro
↓  About         — who you are, brief and human
↓  Work          — projects / case studies
↓  Skills        — what you use
↓  Contact       — how to reach you
```

## What We Are NOT Building (this version)
- Blog / articles section
- Dark/light toggle (dark only)
- CMS integration (content stays in `content/`)
- Authentication
- Analytics beyond Vercel Speed Insights
