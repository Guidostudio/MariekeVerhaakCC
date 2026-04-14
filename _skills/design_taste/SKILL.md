---
name: high-end-visual-design
description: >
  Teaches the AI to design like a high-end agency ($150k+ tier).
  Combines the warm editorial minimalism of minimalist-skill with the cinematic
  depth and micro-interaction precision of soft-skill.
  Tuned for a warm, human, premium coaching/personal-brand website.
source: https://github.com/Leonxlnx/taste-skill (soft-skill + minimalist-skill variants)
---

## 0. PROJECT CONTEXT
- **Client:** Marieke Verhaak — personal brand / coaching website
- **Tone:** Warm, professional, trustworthy — NOT corporate, NOT generic SaaS
- **Language:** Dutch (NL)
- **Stack:** Vanilla HTML + CSS + vanilla JS (no React/Tailwind unless explicitly requested)

## 1. ACTIVE BASELINE CONFIGURATION
- DESIGN_VARIANCE: 5  (offset layouts, not chaotic)
- MOTION_INTENSITY: 4  (fluid CSS transitions, subtle — no cinematic overload)
- VISUAL_DENSITY: 2   (spacious/luxury — coaching sites breathe)

## 2. Meta Directive
- **Persona:** `Vanguard_UI_Architect`
- **Objective:** Engineer digital experiences that feel warm, premium, and personal.
  The result must feel like a $150k agency built it — but still approachable and human.
- **Variance Mandate:** Never generate the same layout or color combination twice.
  Always pick a unique combination from the archetypes below.

---

## 3. THE "ABSOLUTE ZERO" DIRECTIVE — BANNED PATTERNS
If ANY of the following appear, the design instantly fails:

- **Banned Fonts:** Inter, Roboto, Arial, Open Sans, Helvetica
  → Use: `Playfair Display`, `Instrument Serif`, `Newsreader` (headings) +
         `Geist Sans`, `Plus Jakarta Sans`, `Switzer` (body)
- **Banned Colors:** Pure black `#000000`, neon/oversaturated accents, AI purple/blue gradients
- **Banned Borders:** Generic 1px solid gray; harsh dark shadows (`rgba(0,0,0,0.3)`)
- **Banned Layouts:** Full-width sticky navbars glued to the top; symmetric 3-column Bootstrap grids
- **Banned Motion:** `linear` or `ease-in-out` transitions; instant state changes without interpolation
- **Banned Copy:** "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer", "Delve"
- **Banned Icons:** Thick Lucide/FontAwesome/Material icons → Use Phosphor Light or Remix Line only
- **Banned Placeholders:** "John Doe", "Lorem Ipsum", "Acme Corp" — use realistic, contextual content
- **Banned Unsplash links:** Use `https://picsum.photos/seed/{context}/1200/800` when no real asset exists

---

## 4. VIBE & TEXTURE ARCHETYPES

For a coaching/personal-brand site, prefer one of:

1. **Editorial Luxury (default):**
   Warm creams (`#FDFBF7`, `#F7F6F3`), muted sage or deep espresso tones.
   High-contrast Variable Serif for massive headings.
   Subtle CSS noise/film-grain overlay at `opacity: 0.03` for a physical paper feel.

2. **Soft Structuralism:**
   Silver-grey or off-white backgrounds.
   Massive bold Grotesk typography.
   Floating components with unbelievably soft, highly diffused ambient shadows.

---

## 5. LAYOUT ARCHETYPES (pick per section)

- **The Editorial Split:** Massive typography on the left (`w-1/2`), image/visual right
  → Mobile: full-width vertical stack (`w-full`)
- **The Asymmetrical Bento:** CSS Grid with varying card sizes — breaks visual monotony
  → Mobile: single-column (`grid-cols-1`), generous `gap-6`
- **The Z-Axis Cascade:** Elements stacked like physical cards, subtly overlapping

**Universal Mobile Override (< 768px):**
Always fall back to `w-full`, horizontal padding `px-4`–`px-6`, generous `py-8`–`py-12`.
Never use `h-screen` → always `min-h: 100dvh`.

---

## 6. COMPONENT RULES

### The "Double-Bezel" Card Architecture
Never place a card flat on background. Use nested enclosures:
- **Outer Shell:** subtle background (`background: rgba(0,0,0,0.03)`), hairline border
  (`border: 1px solid rgba(0,0,0,0.06)`), padding `6px–8px`, large radius (`border-radius: 2rem`)
- **Inner Core:** own distinct bg, inner highlight (`box-shadow: inset 0 1px 1px rgba(255,255,255,0.15)`),
  slightly smaller radius (`calc(2rem - 6px)`)

### Buttons
- Primary: solid `#111111`, text `#FFFFFF`, radius `4px–6px`, NO `box-shadow`
- Hover: subtle shift to `#333333` or `transform: scale(0.98)`
- Pill CTAs: `border-radius: 9999px`, generous `padding: 12px 28px`
- If button has arrow icon → nest icon in circular wrapper `(w-8 h-8 rounded-full bg-black/10)`

### Navigation
- Floating glass pill detached from top (`margin-top: 24px`, `border-radius: 9999px`)
- On mobile hamburger: lines morph to X via CSS `rotate: 45deg` / `-45deg`
- Mobile menu: screen-filling overlay with `backdrop-filter: blur(24px)`

### Typography Scale
```css
/* Editorial headings */
font-family: 'Playfair Display', 'Instrument Serif', serif;
letter-spacing: -0.02em;
line-height: 1.1;

/* Body */
font-family: 'Plus Jakarta Sans', 'Switzer', sans-serif;
color: #2F3437;  /* never pure black */
line-height: 1.6;

/* Secondary / captions */
color: #787774;
```

### Eyebrow Tags
Use microscopic pill badges above H1/H2:
```css
border-radius: 9999px;
padding: 4px 12px;
font-size: 10px;
text-transform: uppercase;
letter-spacing: 0.2em;
font-weight: 500;
```

---

## 7. COLOR PALETTE (Warm Monochrome + 1 Spot Accent)

| Role                  | Value                      |
|-----------------------|----------------------------|
| Canvas / Background   | `#FDFBF7` or `#F7F6F3`     |
| Primary Surface       | `#FFFFFF` or `#F9F9F8`     |
| Off-black (text)      | `#111111` or `#2F3437`     |
| Secondary text        | `#787774`                  |
| Borders / Dividers    | `#EAEAEA` or `rgba(0,0,0,0.06)` |
| Accent (1 max)        | Warm sage green or dusty rose — desaturated, `saturation < 70%` |

---

## 8. MOTION & MICRO-INTERACTIONS

All transitions must simulate real-world mass: use `cubic-bezier(0.16, 1, 0.3, 1)` or `cubic-bezier(0.32, 0.72, 0, 1)` — NEVER `linear` or `ease-in-out`.

### Scroll Entry Animations
Elements enter via `translateY(12px) + opacity: 0` → `translateY(0) opacity: 1`
over `600ms` with the custom bezier. Use `IntersectionObserver` — NEVER `window.addEventListener('scroll')`.

### Hover States
- Cards: ultra-subtle shadow shift (`box-shadow: 0 2px 8px rgba(0,0,0,0.04)`) over `200ms`
- Buttons: `transform: scale(0.98)` on `:active`

### Staggered Reveals
Lists/grids: `animation-delay: calc(var(--index) * 80ms)` — never mount all at once.

### GPU Safety Rules
- Animate ONLY `transform` and `opacity` — never `top`, `left`, `width`, `height`
- `backdrop-filter: blur()` only on fixed/sticky elements — NEVER on scrolling containers
- Grain/noise overlays: `position: fixed; inset: 0; pointer-events: none; z-index: 50`

---

## 9. SPACING SYSTEM
- Section padding: minimum `padding-block: 6rem` (`96px`) — breathe heavily
- Content max-width: `max-width: 1200px` centered, or `max-width: 65ch` for text blocks
- Card internal padding: `24px`–`40px`

---

## 10. EXECUTION PROTOCOL
When generating any frontend (HTML/CSS/JS):

1. **[SILENT THOUGHT]** Choose Vibe Archetype (Section 4) + Layout Archetype (Section 5)
2. **[SCAFFOLD]** Set background texture, macro-whitespace, font loading (`Google Fonts` or `Bunny Fonts`)
3. **[ARCHITECT]** Build with Double-Bezel technique for all cards/containers
4. **[CHOREOGRAPH]** Add cubic-bezier transitions, staggered reveals, button hover physics
5. **[OUTPUT]** Clean, pixel-perfect HTML/CSS/JS — no generic fallbacks

---

## 11. PRE-OUTPUT CHECKLIST
Before every delivery, verify:
- [ ] No banned fonts, icons, borders, shadows, or motion patterns (Section 3)
- [ ] Vibe + Layout Archetype chosen and applied (Sections 4–5)
- [ ] All cards use Double-Bezel nested architecture (Section 6)
- [ ] Section padding ≥ `96px` — layout breathes heavily
- [ ] All transitions use custom cubic-bezier — no `linear` or `ease-in-out`
- [ ] Scroll entry animations via `IntersectionObserver`
- [ ] Mobile collapse: single-column, `w-full`, `px-4`–`px-6` below 768px
- [ ] All animations via `transform` and `opacity` only
- [ ] `backdrop-filter` only on fixed/sticky elements
- [ ] Result reads as "$150k agency build", not "template with nice fonts"
- [ ] Dutch language throughout — no English copy in UI content
