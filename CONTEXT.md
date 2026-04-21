# CONTEXT — Personal Portfolio
> Load this file at the start of every new session to get up to speed instantly.
> Say: "Read CONTEXT.md and PROGRESS.md, then tell me what we should work on."

---

## What This Project Is
Personal brand portfolio website for Raviteja Geddada. Goal: visually premium, cinematic dark mode, scroll-driven parallax, subtle 3D elements. The kind of site that makes a strong first impression.

## Tech Stack (Quick Ref)
| Layer | Tool |
|-------|------|
| Framework | Next.js 15, App Router, TypeScript strict |
| Styling | Tailwind CSS v4 (CSS-first — no `tailwind.config.js`) |
| Motion | Framer Motion (components) + GSAP ScrollTrigger (scroll) |
| Smooth Scroll | Lenis v1.1+ |
| 3D | React Three Fiber + Three.js |
| Email | Resend via Next.js Route Handler |
| Deploy | Vercel |

## Design Tokens (Quick Ref)
```
Background:  #09090B   (near-black, not pure #000)
Surface:     #18181B
Accent:      #2563EB   (customize)
Text:        #FAFAFA / #A1A1AA (muted)
Heading:     Archivo (300–700w)
Body:        Space Grotesk (300–700w)
Easing:      [0.16, 1, 0.3, 1]  (Expo.out)
```

## Directory Map (what lives where)
```
app/                → Next.js App Router (layout, page, globals.css, API routes)
components/
  sections/         → HeroSection, AboutSection, WorkSection, SkillsSection, ContactSection
  three/            → All R3F / Three.js scenes (always dynamic import + Suspense)
  ui/               → Reusable primitives (Button, Badge, GlassCard, etc.)
  layout/           → Nav, Footer
content/            → index.ts (ONLY place personal info lives — never hardcode in components)
lib/
  animations.ts     → Shared Framer Motion variants
  utils.ts          → cn(), clamp(), lerp()
hooks/
  useScroll.ts      → Scroll progress + parallax values
  useMouseParallax.ts → Mouse-tracking tilt
docs/               → SPEC-*.md files for planned features
.claude/            → Commands, memory, rules, skills (this system)
```

## Critical Rules (Never Break)
1. All personal info lives in `content/index.ts`. Never hardcode text in components.
2. All R3F/Three.js components: `dynamic(() => import(...), { ssr: false })` + `<Suspense>`
3. GSAP ScrollTrigger: always check `prefers-reduced-motion` before creating triggers
4. Tailwind v4: CSS-first config — design tokens go in `app/globals.css` as CSS variables
5. Lenis: initialized once in root layout provider — never add scroll event listeners elsewhere
6. `will-change: transform` only on actively animating elements, never statically

## Commands Available
| Command | What it does |
|---------|-------------|
| `/plan [feature]` | Architect mode — writes spec to `docs/SPEC-*.md`, no code |
| `/implement [feature]` | Dev mode — reads spec, builds step by step |
| `/review [file or feature]` | Code review with 🔴🟡🟢 severity |
| `/qa [feature]` | Test coverage check + visual QA checklist |
| `/fix [bug]` | Root cause → minimal fix → regression note |
| `/status` | Full project status briefing |

## Memory Files
- `.claude/memory/PROGRESS.md` — what's done, what's next
- `.claude/memory/DECISIONS.md` — why things are built the way they are
- `.claude/memory/GOTCHAS.md` — mistakes made, rules that override defaults

## Where We Are Now
→ Read `.claude/memory/PROGRESS.md` for current state.
