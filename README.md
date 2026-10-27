# ZZZ-web — Zenless Zone Zero fan pages (dark bluish theme)

This small scaffold contains:
- index.html — landing page with tabbed main content
- page1.html .. page7.html — same layout pages linked from the left quick-nav
- styles.css — dark bluish theme and layout
- scripts.js — lightweight tab switching + deep-link support
- assets/placeholder.svg — simple placeholder image you can replace

How to use
1. Open index.html in any static web server or directly in the browser (for local testing).
2. Edit text and replace assets/placeholder.svg with your images (or change the <img> src).
3. Each page uses the same CSS + JS, so updating styles.css or scripts.js updates all pages.

Notes
- Tabs support keyboard navigation (Left/Right) and will set ?tab=panelId in the URL when you switch.
- Sidebar links point to page1..page7 to match your request for 7 same-format pages.

Next steps
- Replace placeholder text/images with real content.
- Add assets and additional styles (fonts, icons).
- If you want this converted into a template engine or partials (for automated updates), I can add a simple build script or a template for a static site generator.