# Design DNA - Meydani Luxury Hospitality

This document outlines the Design DNA for the Meydani Cafe website, specifying design guidelines, typography, colors, layout grids, shapes, and component rules derived from Google Stitch.

---

## Brand & Style
The brand personality is sophisticated, nocturnal, and premium, reflecting the rich heritage of Turkish and Middle Eastern hospitality through a contemporary lens. The design system targets a discerning audience looking for an elevated culinary experience.

The visual style is **Corporate / Modern** with a **Minimalist** foundation. It prioritizes high-quality food photography against deep, atmospheric backgrounds. The aesthetic evokes a "candlelit" mood—dark, intimate, and warm—using high contrast to direct the user's eye toward calls to action and exquisite menu items. The focus is on clarity, elegance, and conversion, ensuring the digital experience feels as curated as the restaurant itself.

---

## Design System Tokens (CSS / Tailwind Variables)

### Colors
The palette is rooted in a "Dark Mode" philosophy to create a premium, evening-inspired atmosphere.

| Token | Value | Description |
|---|---|---|
| `background` | `#141313` | Main dark background |
| `surface` | `#141313` | Base layer for cards and section panels |
| `surface-dim` | `#141313` | Lighter surface color for subtle depth |
| `surface-bright` | `#3a3939` | Borders and high-contrast surfaces |
| `primary` | `#c8c6c5` | Main text color (Warm White) |
| `on-surface` | `#e5e2e1` | Text on surface panels |
| `secondary-container` | `#ffbf00` | Warm Amber Accent (Lantern glow) |
| `on-secondary` | `#402d00` | Dark text on Amber buttons |
| `outline` | `#8e9192` | Subtle borders and divider colors |

### Typography
The typography strategy relies on the interplay between the classic, high-contrast serifs of **Playfair Display** and the clean, utilitarian precision of **Inter**.

*   **Display Text (Hero & Large Headlines)**:
    *   *Font Family*: `Playfair Display`
    *   *Desktop Size*: `64px` (Weight: 700, Line Height: 72px, Letter Spacing: -0.02em)
    *   *Mobile Size*: `40px` (Weight: 700, Line Height: 48px, Letter Spacing: -0.01em)
*   **Headlines (Section Headings)**:
    *   *Font Family*: `Playfair Display`
    *   *Desktop Size*: `40px` (Weight: 600, Line Height: 48px)
    *   *Mobile Size*: `32px` (Weight: 600, Line Height: 40px)
*   **Body Text (Menu descriptions, paragraphs)**:
    *   *Font Family*: `Inter`
    *   *Large Size*: `18px` (Weight: 400, Line Height: 28px)
    *   *Medium Size*: `16px` (Weight: 400, Line Height: 24px)
*   **Labels & Buttons**:
    *   *Font Family*: `Inter`
    *   *Large Size*: `14px` (Weight: 600, Line Height: 20px, Letter Spacing: 0.05em, uppercase)

### Spacing & Grid System
Vertical spacing follows a strict **8px rhythm** to maintain visual balance. Generous whitespace is encouraged between major sections to emphasize the "premium" nature of the brand.

*   `xs`: `4px`
*   `base`: `8px`
*   `sm`: `12px`
*   `md`: `24px`
*   `lg`: `48px`
*   `xl`: `80px` (whitespace between major sections)
*   `gutter`: `24px`
*   `container-max`: `1200px`

#### Grids by Device:
*   **Desktop (1440px+):** 12-column grid with 24px gutters and 80px side margins.
*   **Tablet (768px - 1024px):** 8-column grid with 24px gutters and 40px margins.
*   **Mobile (Under 768px):** 4-column fluid grid with 16px gutters and 20px margins.

### Shapes & Elevation
*   **Standard Corners (`Rounded`):** `0.5rem (8px)` radius for buttons, input fields, and standard elements.
*   **Card Corners (`Card Rounded`):** `1rem (16px)` radius for cards and images to frame food photography elegantly.
*   **Borders / Badges (`Pill Rounded`):** Pill-shaped (fully rounded) for category chips.
*   **Depth (Shadows):** Tonal layering against Primary Charcoal background. Elevated surfaces use diffuse shadows. Amber buttons feature a soft, warm glow (tinted shadow with 15% opacity) to appear luminous.

---

## Component Specifications

1.  **Buttons**:
    *   *Primary CTA*: Warm Amber background (`#FFBF00`) with Black text (`#000000`) for maximum legibility and conversion.
    *   *Secondary CTA*: Outlined with Warm Amber border and transparent background.
2.  **Cards**:
    *   Surface background (`#1E1E1E`) with no border. Top edges bleed to display full-width high-resolution imagery.
3.  **Input Fields**:
    *   Dark background, 1px border in Warm White at 10% opacity. Transition border to Warm Amber (`#FFBF00`) on focus.
4.  **Menu List**:
    *   Dish names styled in `Playfair Display`. Prices styled in bold `Inter`. Separated by generous spacing or dot leaders.
5.  **Specialty Elements**:
    *   *Reservation Bar*: Sticky footer CTA for quick reservation access on mobile.
    *   *Gallery*: Staggered masonry photo grid with 16px spacing and dark overlays on hover.
