# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start (New Session)
Read `CONTEXT.md` and `.claude/memory/PROGRESS.md` first. They tell you exactly where we are and what to do next.

## Commands
| Command | Purpose |
|---------|---------|
| `/plan [section]` | Architect mode — writes spec, no code |
| `/implement [section]` | Dev mode — reads spec and builds |
| `/review [file]` | Code review with severity ratings |
| `/qa [section]` | Visual + motion QA checklist |
| `/fix [bug]` | Root cause → minimal fix |
| `/status` | Full project status briefing |

## Project in One Line
Personal brand portfolio: Next.js 15 + Framer Motion + GSAP ScrollTrigger + Lenis + React Three Fiber. Dark mode, cinematic, parallax-heavy.

## Stack
- **Framework**: Next.js 15, App Router, TypeScript strict
- **Styling**: Tailwind CSS v4 (CSS-first — design tokens in `app/globals.css`, no `tailwind.config.js`)
- **Motion**: Framer Motion (components) + GSAP ScrollTrigger (scroll-driven)
- **Smooth Scroll**: Lenis v1.1+
- **3D**: React Three Fiber + Three.js (always `dynamic()` + `ssr:false` + `<Suspense>`)
- **Email**: Resend via `app/api/contact/route.ts`
- **Deploy**: Vercel

## Common Commands
```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run type-check   # TypeScript check (no emit)
```

## The One Rule That Overrides Everything
All personal info (name, bio, projects, social links) lives in `content/index.ts`. Never hardcode it in components.

## Animation Non-Negotiables
1. Always `prefers-reduced-motion` check before creating GSAP ScrollTrigger
2. Always return `trigger.kill()` cleanup in `useEffect`
3. Never animate `width`/`height`/`top`/`left` — only `transform` + `opacity`
4. All R3F components: `dynamic()` + `ssr: false` + `<Suspense fallback={...}>`
5. Never add `window.addEventListener('scroll', ...)` — use Lenis or Framer Motion's `useScroll`

## Design Tokens (Quick Ref)
```
Background:  #09090B   ← not pure #000 (OLED smear)
Surface:     #18181B
Accent:      #2563EB
Muted text:  #A1A1AA
Heading:     Archivo (300–700w)
Body:        Space Grotesk (300–700w)
Easing:      [0.16, 1, 0.3, 1]
```

## Environment Variables
```
NEXT_PUBLIC_SITE_URL=      # Deployed URL
RESEND_API_KEY=            # Contact form email
NEXT_PUBLIC_GA_ID=         # Google Analytics (optional)
```
