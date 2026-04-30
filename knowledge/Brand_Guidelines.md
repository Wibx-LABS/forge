---
type: document
title: Brand_Guidelines
status: draft
last_updated: 2026-04-29
---

# Wibx Brand Guidelines

_Extracted from the Home Configurator project for replication across Wibx products._

## 1. Overview

The design system within this project is strictly **Dark Mode First** and relies on high-contrast neon accents against deep black and dark gray surfaces.

---

## 2. Logo

The primary lockup combines the green icon mark with the white WIBX wordmark on a dark background. Use the SVG source below as the canonical asset.

**Clearspace**: maintain at least the icon's width on all sides.  
**Minimum size**: 28px tall (icon mark alone: 28×28px).  
**Don't**: recolor the icon mark, apply the wordmark on light backgrounds without adjusting fill to `#0c0c0c`, or separate icon and wordmark at sizes above 40px tall.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 222 64.69" aria-label="WIBX">
  <!-- Icon mark -->
  <path fill="#00ff70" d="M33.79,64.64h-2.94C5.62,64.64,0,59.02,0,33.79v-2.94C0,5.62,5.62,0,30.85,0h2.94c25.23,0,30.85,5.62,30.85,30.85v2.94c0,25.23-5.62,30.85-30.85,30.85Z"/>
  <circle fill="#141414" cx="19.09" cy="24.98" r="2.94"/>
  <circle fill="#141414" cx="45.52" cy="24.98" r="2.94"/>
  <path fill="#141414" d="M53.16,29.97c1.2-1.6,1.91-3.58,1.91-5.73,0-5.27-4.27-9.54-9.54-9.54-3.97,0-7.37,2.42-8.81,5.87-1.23.92-2.75,1.47-4.4,1.47s-3.18-.55-4.4-1.47c-1.44-3.45-4.84-5.87-8.81-5.87-5.27,0-9.54,4.27-9.54,9.54,0,2.15.71,4.14,1.91,5.73-3.68,3.46-2.65,7.15-2,8.58,0,0,.66,1.26,1.62,2.35,8.39,9.52,20.94,9.04,21.22,9.04h0c.28,0,12.83.48,21.22-9.04.96-1.09,1.62-2.34,1.62-2.35.65-1.43,1.69-5.12-2-8.58ZM45.52,19.1c2.84,0,5.14,2.3,5.14,5.14s-2.3,5.14-5.14,5.14-5.14-2.3-5.14-5.14,2.3-5.14,5.14-5.14ZM19.09,19.1c2.84,0,5.14,2.3,5.14,5.14s-2.3,5.14-5.14,5.14-5.14-2.3-5.14-5.14,2.3-5.14,5.14-5.14ZM50.59,37.86s-.3.33-.3.34c-6.89,7.61-17.62,7.29-17.99,7.29,0,0,0,0,0,0s0,0,0,0c-.37,0-11.1.32-17.99-7.29,0,0-.29-.33-.3-.34-1.25-1.58-1-3.83.64-5.17,1.32.7,2.83,1.09,4.43,1.09,4.79,0,8.75-3.52,9.44-8.12,1.16.5,2.44.78,3.78.78s2.62-.28,3.78-.78c.69,4.6,4.65,8.12,9.44,8.12,1.6,0,3.11-.4,4.43-1.09,1.64,1.34,1.89,3.59.64,5.17Z"/>
  <!-- Wordmark -->
  <path fill="white" d="M127.81,4.41c0-.81-.66-1.47-1.47-1.47h-8.81c-.66,0-1.22.45-1.41,1.05l-7.58,25.26-4.31-13.53c-.19-.59-.75-1.02-1.4-1.02h-8.81c-.65,0-1.21.43-1.4,1.02l-4.31,13.53-3.17-10.57c-.18-.6-.75-1.05-1.41-1.05h-8.81c-.81,0-1.47.66-1.47,1.47,0,.15.02.29.06.42l8.81,29.38c.18.6.75,1.05,1.41,1.05h8.81c.06,0,.13,0,.2-.01.58-.08,1.04-.49,1.21-1.01l4.48-14.07,4.48,14.07c.19.6.76,1.02,1.4,1.02h8.82c.66,0,1.22-.45,1.41-1.05l13.22-44.07c.04-.13.06-.28.06-.42Z"/>
  <circle fill="white" cx="135.15" cy="8.81" r="5.88"/>
  <rect fill="white" x="129.28" y="17.63" width="11.75" height="32.32" rx="1.47" ry="1.47"/>
  <path fill="white" d="M166,14.69c-2.65,0-5.14.7-7.35,1.93V4.41c0-.81-.66-1.47-1.47-1.47h-8.81c-.81,0-1.47.66-1.47,1.47v44.07c0,.81.66,1.47,1.47,1.47h8.81c.81,0,1.47-.66,1.47-1.47v-.46c2.2,1.23,4.7,1.93,7.35,1.93,8.92,0,16.16-7.89,16.16-17.63s-7.24-17.63-16.16-17.63ZM164.53,39.67c-3.24,0-5.87-3.28-5.88-7.33v-.04c0-4.05,2.64-7.33,5.88-7.33s5.88,3.29,5.88,7.35-2.63,7.35-5.88,7.35Z"/>
  <path fill="white" d="M207.57,32.32l12.46,15.23c.21.25.33.58.33.93,0,.81-.66,1.47-1.47,1.47h-10.28c-.45,0-.87-.22-1.14-.54l-6.94-8.49-6.94,8.49c-.27.32-.68.54-1.14.54h-10.28c-.81,0-1.47-.66-1.47-1.47,0-.35.13-.68.33-.93l12.46-15.23-12.46-15.23c-.21-.25-.33-.58-.33-.93,0-.81.66-1.47,1.47-1.47h10.28c.45,0,.87.22,1.14.54l6.94,8.49,6.94-8.49c.27-.32.68-.54,1.14-.54h10.28c.81,0,1.47.66,1.47,1.47,0,.35-.13.68-.33.93l-12.46,15.23Z"/>
</svg>
```

---

## 3. Admin Dashboard Theme (Configurator UI)

This theme is built on a custom Shadcn UI / Tailwind CSS implementation. It prioritizes data visibility and technical precision.

### 🎨 Colors

- **Background**: `#0c0c0c` to `#000000` (Deep Black)
- **Surface / Card**: `#141414` (Elevated dark gray)
- **Primary / Interactive**: `#00ff70` (Neon Green)
- **Foreground / Primary Text**: `#ebf7ee` (Off-white with subtle green tint)
- **Secondary / Borders**: `#2e2e2e`
- **Muted Text**: `#ababab`
- **Destructive / Error**: `#f06a6f`

### 🔤 Typography

- **Core Font Family**: `Red Hat Display`, `Helvetica Neue`, `Arial`, sans-serif
- **Characteristics**: Clean, geometric, and modern technical appearance.

### 📐 UI Components & Geometry

- **Border Radius**: `10px` (`0.625rem`) - Sharp, but slightly softened.
- **Inputs & Controls**: Dark backgrounds (`#2e2e2e`, `#141414`) that use Neon Green (`#00ff70`) for focus rings, selection states, and track toggles.

### 🌸 Alternative Themes ("Maria" Theme)

An alternative internal theme exists with the following palette:

- **Primary**: `#ff66c4` (Pink)
- **Background**: `#13020c` (Deep Purple)
- **Secondary**: `#2b0a1b`

---

## 4. Web View Templates Theme (Mobile Post/Ranking)

This theme is deployed constraints for end-user facing content, prioritizing a modern, immersive, and premium mobile experience.

### 🎨 Colors

- **Background Global**: `#0b0b0f`
- **Surface Elements**: `#17181f`
- **Primary Accent**: `#ff5a00` (Neon Orange)
- **Accent Glow**: `rgba(255, 90, 0, 0.18)`
- **Text**: `#f5f5f5` (White)
- **Muted Text**: `#afb2bf`

### 🔤 Typography

- **Core Font Family**: System UI (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif)
- **Headers**: High impact, large sizing (`clamp(28px, 8vw, 44px)`) with tight letter-spacing (`-0.02em`) for a bold, compact look.

### 📐 UI Components & Experiences

- **Border Radius**:
  - Large/Cards: `22px`
  - Fully Rounded (Buttons/Pills): `999px`
- **Shadows**: Heavy and deep for elevation (`0 12px 40px rgba(0, 0, 0, 0.4)`).
- **Background Textures**: Frequent use of subtle radial and linear gradients for depth rather than flat colors:
  - _Global Background_: `radial-gradient(circle at 20% -10%, rgba(255, 90, 0, 0.18), transparent 35%), #0b0b0f`
  - _Cards_: `linear-gradient(100deg, #1f2027, #17181f)`
  - _Buttons_: `linear-gradient(90deg, rgba(255, 90, 0, 0.4), rgba(255, 90, 0, 0.15))`
- **Borders**: Thin, semi-transparent borders for glass-like element separation (`1px solid rgba(255, 255, 255, 0.08)`).
- **Interactive Elements**: Hover and focus states often utilize scaling animations `transform: scaleX(1)` and transition effects (`280ms ease`) over glowing pseudo-elements.

---

## 5. General UX/UI Principles to Replicate

1. **Darkness Equals Premium**: Both systems bypass standard light modes to create a moody, sleek, and premium aesthetic by layering blacks and very dark grays (`#000` to `#1f1f1f`).
2. **Selective High Saturation**: Rely almost entirely on grayscale/monochrome UI structural elements. Inject extremely saturated neon colors (Neon Green or Neon Orange) _only_ to guide the eye toward primary actions, data highlights, and interactive states.
3. **Subtle Elevation**: Use extremely soft, large drop shadows combined with 1px low-opacity white outline borders to create a layered "Glass" or "Panel" effect.
4. **Fluid Typography & Spacing**: Favor CSS `clamp()` functions heavily to ensure typography looks perfectly scaled across any viewport size organically.
