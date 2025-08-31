# HadadaHealth Brand Style Guide

## Brand Overview
- Name: HadadaHealth
- Category: Healthcare management platform for therapists
- Purpose: Streamline clinical operations and documentation (appointments, treatment notes, AI report writing, billing)
- Positioning: Trusted, efficient, POPIA-compliant documentation and workflow for multi-disciplinary practices
- Evidence: `static/manifest.json:2`, `static/manifest.json:4`

## Core Values
- Clinical accuracy: Evidence‑based, clear, editable AI assistance for reports
- Efficiency: Reduce admin overhead, fast flows, sensible defaults
- Trust & privacy: POPIA compliance, audit trails, role‑based permissions
- Collaboration: Multi‑disciplinary workflows and therapist coordination

## Voice & Tone
- Professional: Clinical, precise, no slang
- Empathetic: Patient‑centered wording where relevant
- Clear and action‑oriented: Short sentences, scannable structure
- Compliance‑aware: Avoid absolute medical claims; include review/approval prompts for AI text

---

## Color System

### Primary Palette
- **Primary (Hadada Green):** `#2D6356` — sole brand anchor for CTAs/focus.
- **Secondary (Deep Blue):** `#32517A` — links, secondary CTAs, progress accents.

### Neutrals
- **Text:** `#1F2937`
- **Muted:** `#6B7280`
- **Borders:** `#E5E7EB`
- **Surfaces:** `#F9FAFB`
- **Base/White:** `#FFFFFF`

### Status (feedback only)
- **Success:** `#059669`
- **Info:** `#0EA5E9`
- **Warning:** `#F59E0B`
- **Error:** `#DC3545`

**Removed:** `#2563EB` (extra blue). → Use Secondary `#32517A` for wizard active/progress instead.

---

## Typography

- **UI:** System sans-serif only (`-apple-system, Segoe UI, Roboto, sans-serif`)
- **Serif:** Georgia/Times, **for PDF export/print only**.  
  Avoid serif in-app previews except in dedicated “Print preview” mode.

---

## Layout & Components

- **Radii:** Single radius = `8px` across buttons, cards, inputs.
- **Shadows:** Only 2 elevations:  
  - Card: `0 4px 12px rgba(0,0,0,.08)`  
  - Modal: `0 8px 24px rgba(0,0,0,.12)`
- **Focus:** Always `2px` outline in Primary (`rgba(45,99,86,.4)`), offset `2px`.

### Buttons
- **Primary:** Solid Primary (white text)
- **Secondary:** Outline Primary (Primary text, white background)
- **Tertiary:** Text-only (Secondary for links)
- **Danger:** Solid Error

### Navigation
- Replace gradient headers with **solid Primary**.  
- Gradients allowed only for **marketing/hero** sections, not app chrome.

---

## Wizard / Progress

- **Active step:** Secondary `#32517A`
- **Completed step:** Primary `#2D6356` (or use Success `#059669` if more distinction needed)
- **Removed tertiary blues**; only use Primary + Secondary.

---

## Messaging & Tone

- Keep current voice (clinical, concise).  
- Consolidate microcopy patterns into one set.  
- **No emojis**; neutral prompts only.

---

## Code Implementation

### Colors
- Replace gradients → use solid brand `#2D6356`
  - `static/nav.css` line 62 → `background: #2D6356;`
- Unify wizard blues → `static/css/report_wizard.css`:
  - Active: replace `#2563EB` → `#32517A`
  - Completed: `#2D6356` (Primary)

### Typography
- `static/css/report-editor.css`: Use **sans-serif** in editor UI.  
- Serif allowed only in export/print preview.

### Buttons
- Refactor button classes into 4 variants (Primary, Secondary, Tertiary, Danger).  
- Remove ad-hoc inline styles in templates.

### Focus
- Ensure **all focus states** use: `outline: 2px solid rgba(45,99,86,.4)` with `2px` offset.

---

## Design Tokens (Optional)

`brand.json` (for engineers/AI tools):

```json
{
  "colors": {
    "primary": "#2D6356",
    "secondary": "#32517A",
    "text": "#1F2937",
    "muted": "#6B7280",
    "border": "#E5E7EB",
    "surface": "#F9FAFB",
    "white": "#FFFFFF",
    "success": "#059669",
    "info": "#0EA5E9",
    "warning": "#F59E0B",
    "error": "#DC3545"
  },
  "radii": {
    "md": "8px"
  },
  "shadows": {
    "card": "0 4px 12px rgba(0,0,0,.08)",
    "modal": "0 8px 24px rgba(0,0,0,.12)"
  },
  "focus": {
    "outline": "2px solid rgba(45,99,86,.4)",
    "offset": "2px"
  }
}
```

---

## Rationale

- Reduces brand to **2 core colors + 4 feedbacks + 4 neutrals**.  
- Removes duplicate blues and gradients that add visual noise.  
- Enforces consistent focus, radii, and shadows.  
- Serif reserved for print only; simplifies in-app reading.  

---

## Visual Demos

To complement the written style guide, we have produced **interactive visual demos** that demonstrate the full brand system in context.

- **Spec‑Accurate (Tokens Only)**  
  [Brand Guide Demo](brand-guide-demo.html) — Minimal, single‑theme reference that implements exactly the tokens and rules defined here (no gradients in app chrome, unified focus, 8px radius, card/modal shadows, wizard colors).

- **Light Mode (Modern Edition)**  
  [Demo Light](Demo%20Light.html) — A fresh, modernised interpretation of the brand with softer shadows, refined spacing, and an approachable healthcare‑friendly palette.  
  *Use cases*: Default web application UI, day‑time usage, marketing previews.

- **Dark Mode (Professional Edition)**  
  [Demo Dark](Demo%20Dark.html) — A refined dark theme with subdued tones optimised for clinical environments and extended use. Designed for readability, eye comfort, and professional contexts.  
  *Use cases*: Night‑time usage, clinical dashboards, patient‑facing screens where reduced brightness prevents fatigue.

### Key Differences
- **Light Demo**: Emphasises approachability and clarity with lighter neutrals, modern shadows, and subtle animations.  
- **Dark Demo**: Prioritises eye comfort, subdued contrasts, and professional tone with muted colors and refined dark backgrounds.  
- **Both**: Retain consistent brand tokens, radii (8–12px), shadows (card, modal), and focus rings to ensure coherence across modes.

> These demos serve as living references for designers and developers, showing how the tokens and guidelines translate into real interface components.
