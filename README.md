# Premier Schools Exhibition (PSE) — Landing Page

## Project Structure

```
pse-landing/
├── index.html          # Main HTML (semantic HTML5, ARIA roles, WCAG 2.2 AA)
├── css/
│   └── styles.css      # All styles — BEM naming, no frameworks
├── js/
│   └── main.js         # All interactivity — sliders, nav, reveals
├── assets/
│   ├── logos/          # Add school logo files here (PNG/SVG, recommended 240×80px)
│   └── images/         # Hero/card images (replace placeholder gradients)
└── README.md
```

## Features Implemented

### Hero Section — Dual-Axis Slider
- Horizontal navigation (3 slides) + vertical sub-slides per horizontal slide
- Auto-play (4.5s interval), pauses on hover/focus
- Pause/Play toggle button with `aria-pressed`
- Swipe support (touch devices)
- Keyboard navigation: Arrow keys (←→ horizontal, ↑↓ vertical)
- Dot indicators for both axes
- `aria-live` region announces current slide to screen readers

### Participating School Logos
- Two rows with alternating direction (LTR / RTL) — "sling" animation
- Continuous CSS `@keyframes` — no JS needed
- Pauses on `:hover` and `:focus-within`
- Edge fade via CSS `::before`/`::after` pseudo-elements

### Choose the School
- 4-column grid on desktop, 2-column on tablet (≤900px)
- Converts to horizontal scroll slider on mobile (≤600px) with `scroll-snap`
- Swipe support via native scroll; JS updates pagination dots
- Fully keyboard navigable

### Exhibition Section
- Full-section slider with 6 highlight cards
- 3 visible on desktop, 2 on tablet, 1 on mobile
- Previous/Next buttons with disabled state
- Optional auto-play (5s), pauses on hover/focus
- Touch swipe support

### Accessibility (WCAG 2.2 AA)
- Skip-to-content link
- All interactive elements have visible focus styles (3px gold outline)
- ARIA roles: `carousel`, `tablist`, `tab`, `region`, `banner`, `contentinfo`
- `aria-label` and `aria-live` on all dynamic regions
- `aria-pressed` on pause button, `aria-selected` on dots
- `prefers-reduced-motion` respected — all animations disabled
- Screen reader announcements on slide changes

### QA Checklist
- [ ] W3C HTML validator: https://validator.w3.org/
- [ ] W3C CSS validator: https://jigsaw.w3.org/css-validator/
- [ ] axe DevTools (Chrome extension) — aim for zero violations
- [ ] Keyboard-only navigation test (Tab, Shift+Tab, Arrow keys, Enter, Space)
- [ ] Screen reader test (NVDA + Firefox, VoiceOver + Safari)
- [ ] Devices: Chrome, Firefox, Safari, Edge (latest 2 versions)
- [ ] iOS Safari & Android Chrome
- [ ] Responsive breakpoints: 320px, 375px, 768px, 1024px, 1280px+

## Replacing Placeholder Content

### School Logos
Replace `.logos__placeholder` divs with `<img>` tags:
```html
<img src="assets/logos/dps.png" alt="Delhi Public School logo" width="120" height="40" loading="lazy" />
```

### School Card Visuals
Replace the `.school-card__logo-placeholder` div with an `<img>`:
```html
<img src="assets/images/school-dps.jpg" alt="Delhi Public School campus" loading="lazy" />
```

### Exhibition Card Images
Replace `.exhibit-card__img-placeholder` with:
```html
<img src="assets/images/exhibit-admissions.jpg" alt="Admissions clinic at PSE" loading="lazy" />
```

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--clr-primary` | `#1A1464` | Deep navy — headings, buttons |
| `--clr-accent` | `#E8A020` | Warm gold — highlights, CTAs |
| `--ff-display` | Playfair Display | Headings |
| `--ff-body` | Inter | Body, UI |

## Browser Support

- Chrome 120+
- Firefox 120+
- Safari 16+
- Edge 120+
- iOS Safari 16+
- Android Chrome 120+

No polyfills required for `scroll-snap`, `IntersectionObserver`, `CSS custom properties`, `backdrop-filter`.
