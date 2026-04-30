# Branding & Design System

## Color Palette

### Finesta (Dark Enterprise)
- **Background:** `#070707` (near-black)
- **Surface:** `#101010` (primary), `#161616` (secondary)
- **Accent Green:** `#22ff7b` (bright), `#0ec95a` (darker)
- **Alert Red:** `#ff4d6a`
- **Caution Yellow:** `#ffd55e`
- **Text:** `#ffffff` (primary), `#888888` (secondary), `#444444` (tertiary)

### Bifrost/Commonlib (Purple & Green)
- **Primary Purple:** `#301457`
- **Secondary Purple:** `#662d91`
- **Primary Green:** `#00efa5` (accent)
- **Material Theme:** Indigo (primary), Pink (accent), Red (warn), Light theme

### Wibx-Runner (Mobile Game)
- **Floor/Ground:** Neutral/cool tones
- **Obstacles:** High-alert colors (orange, red, purple)
- **Collectibles:** Luminous colors (blues, golds)

## Typography

### Font Families
- **Finesta:** Clash Display (FontShare CDN) — weights 400–700
- **Bifrost:** Inter — all weights via mixins
- **Wibx-Runner:** Montserrat / Poppins (heavy sans-serif)

## UI Geometry & Spacing

### Bifrost Layout
- **Sidebar:** Closed 100px, Opened 248px
- **Line Height/Indent:** 4 spaces (enforced)
- **Max Line Length:** 140 characters
- **Responsive Breakpoints:**
  - `xs`: ≤599px
  - `sm`: 768–959px
  - `md`: 992–1279px
  - `lg`: 1200–1919px
  - `xl`: ≥1200px

### Wibx-Runner (Mobile)
- **Button Minimum:** 64×64dp (touch-friendly)
- **UI Language:** Bold Neumorphism (drop shadows, soft geometry)
- **Design Direction:** Stylized urban energy (Spider-Verse meets Subway Surfers)
- **Setting:** Near-future LATAM/Brazilian metro — favelas, skyscrapers, graffiti overpasses, Web3 elements

## SVG & Logo

**Wibx Logotype:** White stroke with green accent (`#22ff7b`), inline SVG present in `finesta/Finesta.html`. Used across all projects as primary brand mark.

## Finesta Workflow Design

**Purpose:** Fast, dark-themed financial data processing tool.
- **Input:** CSV (single-quote delimited)
- **Processing:** Client-side JSON extraction, 9 accounting fields
- **Output:** Excel `.xlsx` export
- **Zero Server Communication:** Fully client-side (SheetJS via CDN)

## References

- finesta (HTML, color vars, logo)
- bifrost-framework (Material theme, sidebar layout, responsive breakpoints, font system)
- wibx-runner (neumorphism, mobile geometry, game UI design direction)
