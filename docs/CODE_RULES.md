# Comforty CMS — Color & UI Rules

> This document is the authoritative reference for color usage in Comforty Admin.
> Rules here are enforced in `CLAUDE.md` as **RULE-9**.

---

## Brand Identity

Comforty is a furniture brand centered on **warm, cozy, organic** aesthetics — inspired by natural materials (wood, linen, leather), warm indoor lighting, and comfortable living spaces.

The color system reflects this: warm teal as the primary brand color, warm sand neutrals replacing cold gray, and amber accents evoking oak and candlelight.

---

## Color Scales (`src/app/theme.ts`)

### Primary — Warm Teal

Used for: CTA buttons, active nav state, focus rings, selected states.

| Token | Hex | Usage |
| --- | --- | --- |
| `primary.50` | `#eef6f4` | Subtle tint, active nav background |
| `primary.100` | `#cce8e2` | Muted chip/tag background |
| `primary.200` | `#99d1c5` | — |
| `primary.300` | `#66baa8` | — |
| `primary.400` | `#3da38c` | Hover state, dark mode solid |
| `primary.500` | `#1a8c75` | **Main brand color** — buttons, solid badges |
| `primary.600` | `#157a65` | Pressed/active state |
| `primary.700` | `#106855` | Dark text on light bg (colorPalette.fg) |
| `primary.800` | `#0b5644` | Dark mode muted |
| `primary.900` | `#063d30` | Dark mode subtle bg |

### Neutral — Warm Sand

Used for: all structural UI — backgrounds, borders, text. Replaces Chakra's cold `gray`.

| Token | Hex | Usage |
| --- | --- | --- |
| `neutral.50` | `#faf8f5` | Page canvas background |
| `neutral.100` | `#f2ede7` | Card / panel background |
| `neutral.200` | `#e5ddd3` | Borders, dividers |
| `neutral.300` | `#cfc4b8` | Disabled borders |
| `neutral.400` | `#b8a99b` | Disabled text |
| `neutral.500` | `#9e8e7e` | Placeholder, secondary text |
| `neutral.600` | `#7d6d5f` | Caption text |
| `neutral.700` | `#5e5048` | Body text (dark mode surface) |
| `neutral.800` | `#3d342c` | Primary body text |
| `neutral.900` | `#1f1a15` | Headings, strong text |

### Accent — Warm Amber

Used for: promotional badges, "low stock" warnings, sale tags, featured labels.

| Token | Hex | Usage |
| --- | --- | --- |
| `accent.100` | `#fdf0d5` | Background tint |
| `accent.300` | `#f9c86a` | Decorative / icon color |
| `accent.500` | `#e89c2f` | Main accent — badges, highlights |
| `accent.700` | `#a0651a` | Text on light accent bg |

---

## Semantic Tokens

Always use semantic tokens in layout and component code. Never reference `neutral.X` directly in structural components.

| Token | Light | Dark | Use in |
| --- | --- | --- | --- |
| `bg.canvas` | `neutral.50` | `neutral.900` | Page background |
| `bg.surface` | `neutral.100` | `neutral.800` | Cards, panels, drawers |
| `border.muted` | `neutral.200` | `neutral.700` | All borders and dividers |
| `text.body` | `neutral.800` | `neutral.100` | Primary body text |
| `text.muted` | `neutral.500` | `neutral.400` | Secondary / placeholder text |

---

## colorPalette Convention

Chakra's `colorPalette` prop must always point to `primary` for brand elements:

```tsx
// Correct — sidebar active item
<Flex colorPalette="primary" bg="colorPalette.subtle" color="colorPalette.fg">

// Correct — primary CTA
<Button colorPalette="primary">Lưu thay đổi</Button>

// Wrong — bypasses brand palette
<Button colorPalette="teal">Lưu</Button>
<Button colorPalette="blue">Lưu</Button>
```

---

## Status Color Mapping

Use Chakra's built-in semantic scales **only** for status indicators. Do not use these for brand or structural UI.

| Status | colorPalette | Context |
| --- | --- | --- |
| Active / Success / In stock | `green` | Order confirmed, product active |
| Warning / Low stock / Pending | `orange` | Low inventory, pending review |
| Error / Danger / Out of stock | `red` | Validation errors, delete actions |
| Info / Neutral | `blue` | Informational badges only |
| Inactive / Disabled | `gray` | Archived, stopped |

---

## Rationale

| Decision | Reason |
| --- | --- |
| Teal over blue | Blue is corporate/tech. Teal bridges nature (green) and trust (blue) — fits a home goods brand |
| Warm neutrals | Cold gray creates a tech/office feel. Warm sand aligns with furniture, fabric, and interior materials |
| Amber accent | Evokes oak wood grain, honey, and candlelight — reinforces the "cozy home" brand identity |
| `primary.500` as base | Passes WCAG AA contrast on white, usable as both text color and solid button fill |
| Semantic surface tokens | Prevents hardcoded palette leakage and makes dark mode work automatically |
