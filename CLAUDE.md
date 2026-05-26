# Nathan Lam — Portfolio CLAUDE.md

## Project overview

Static HTML/CSS portfolio site for Nathan Lam, Mechanical Engineering student at UC Berkeley.
No build step. Open `index.html` directly in a browser or serve with any static file server.

## File structure

```
index.html          — main page (about, skills, all projects)
styles.css          — all styles for index.html and sub-pages
resume.html         — resume embed page
_snippets.html      — copy-paste reference for all home page patterns (not a live page)
projects/
  _template.html    — reference template for new project pages (copy this)
  ME127.html        — composites final report (PDF embed, legacy nav style)
images/
  about/            — personal/competition photos used in the About section
  main_page/        — card thumbnail images used on index.html project cards
  master_oogway/    — extra images for Master Oogway carousel
  e29/              — extra images for E29 carousel
```

## Color system (CSS custom properties in styles.css)

| Variable        | Value       | Used for                                    |
|-----------------|-------------|---------------------------------------------|
| `--navy`        | `#0d1b2a`   | Hero header, sticky header, footer          |
| `--navy-mid`    | `#1e3a5f`   | Accordion header hover (sub-pages)          |
| `--accent`      | `#f59e0b`   | Amber — primary accent, combat section bar  |
| `--blue`        | `#2563eb`   | Blue — secondary accent, academic section   |
| `--bg`          | `#f1f5f9`   | Page background                             |
| `--surface`     | `#ffffff`   | Card and main content surface               |
| `--surface-alt` | `#f8fafc`   | Image column placeholder background         |

## styles.css structure (Table of Contents)

The stylesheet is divided into 24 numbered sections — find the section comment
(`── N. Name ──`) to jump to the right block:

```
Home page:
  1.  Design tokens (:root)
  2.  Reset & base
  3.  Hero header          (.hero-header)
  4.  Sticky header        (.sticky-header)
  5.  Dropdown nav         (.nav-dropdown)
  6.  Main container       (main)
  7.  Section headings
  8.  About section
  9.  Skills section       (.skills-grid)
  10. Project groups       (.project-group)
  11. Project cards        (.project-card)
  12. Image carousel       (.project-image-rotator)
  13. Image placeholder    (.project-image-placeholder)
  14. Mobile — card stacking
  15. Footer

Sub-pages (projects/, resume.html):
  16. Site header          (.site-header / .header-inner)
  17. Project heading      (.project-heading)
  18. Project blocks       (.project-block)
  19. Overview grid & spec list
  20. Standalone carousel  (.carousel-block)
  21. Video embed          (.video-wrapper)
  22. PDF embed            (section > iframe)
  23. Accordion            (.accordion)
  24. 3D model viewer      (model-viewer)
```

## Hero vs. sub-page header — important distinction

The **hero header** (`<header class="hero-header">`) on `index.html` uses
`display: flex; flex-direction: column; align-items: center` for centered
column layout. It is scoped to `.hero-header` so it cannot leak onto sub-pages.

Sub-pages use `<header class="site-header">` instead — a horizontal bar with
name left and nav right. `.header-inner` mirrors `.sticky-inner`'s
`max-width: 1100px; margin: 0 auto; padding: 14px 32px` so both headers
share identical horizontal extents.

**Never** use a bare `header { }` rule — it would affect both header types.

## Disabling "flashy" features

Certain visual effects are marked `/* FLASHY: ... */` in the code for easy removal:

- **Hero dot-grid**: remove `background-image` line in `.hero-header {}` in styles.css
- **Main content dot-grid**: remove `background-image` line in `main {}` in styles.css
- **Carousel auto-rotation**: remove the `setInterval` block in the carousel script in index.html
- **Card hover lift**: remove `transition/transform` from `.project-card` and `.project-card:hover`
- **Image hover zoom**: remove `transition/transform` from `.project-card-image > img` and the hover rule below it
- **Image captions**: remove all `<div class="image-caption-overlay">` elements from HTML
- **Carousel arrows/dots**: remove all `<div class="carousel-controls">` elements from HTML

## Carousel structure

Every carousel card follows this HTML pattern inside `.project-card-image`:

```html
<div class="project-image-rotator">
  <div class="image-viewport">
    <img src="..." alt="..." data-caption="Label shown on image">
    <img src="..." alt="..." data-caption="Second label">
    <!-- one <img> per slide -->
    <div class="image-caption-overlay"></div>   <!-- remove to hide captions -->
    <div class="carousel-controls">
      <button class="carousel-btn carousel-prev" aria-label="Previous image">&#8249;</button>
      <div class="carousel-dots">
        <span class="carousel-dot"></span>       <!-- one per image -->
      </div>
      <button class="carousel-btn carousel-next" aria-label="Next image">&#8250;</button>
    </div>
  </div>
</div>
```

The JS at the bottom of index.html (and each sub-page) auto-initializes all
`.project-image-rotator` elements on that page.

**Important:** the number of `.carousel-dot` spans must match the number of `<img>` tags.

On sub-pages, wrap the rotator in `<div class="carousel-block">` to give it
an explicit height (the home page card layout provides this automatically).

## Sub-page conventions

- Copy `projects/_template.html` as a starting point for new project pages.
- Sub-pages use `<header class="site-header">` + `.header-inner` for the top bar.
- Put the project title in `<div class="project-heading">` at the top of `<main>`,
  not inside the header.
- The `.page-title` class is legacy (used only by ME127.html); prefer `.project-heading`.
- PDF embeds use `<iframe>` as a direct child of `<section>` — the CSS rule
  `section > iframe { height: 900px }` targets exactly this pattern.
- Video embeds go inside `<div class="video-wrapper">` to maintain 16:9 aspect ratio.

## About section layout

The About section uses a two-column flex layout:

```html
<div class="about-grid">
  <div class="about-text"> … paragraphs … </div>
  <div class="about-images" style="--about-img-w: 300px; --about-img-h: 290px;">
    <!-- .project-image-rotator carousel goes here -->
  </div>
</div>
```

**Resizing the image column:** set `--about-img-w` and `--about-img-h` as inline custom properties directly on `.about-images` in the HTML — no CSS change needed. The CSS reads `var(--about-img-w, 300px)` with a fallback, so the inline values take precedence.

**Per-image crop control:** use `object-position` inline on each `<img>` to shift where the cover crop sits (e.g. `style="object-position: center 40%;"`). Useful when subjects appear at different heights in their photos.

**Image file size:** large JPEGs (phone/camera resolution) downscaled aggressively by the browser can appear noisier than expected. If an image looks grainy in the carousel, re-export it at ~700–900px on the long edge rather than applying a CSS workaround.

**Photo location:** personal/competition photos belong in `images/about/`, not `images/main_page/`. The `main_page/` folder is for project card thumbnails only.

## _snippets.html reference

`_snippets.html` at the root is a copy-paste cheat sheet for all home page patterns. Open it in an editor (not a browser) when adding new content. It covers:

1. Project card — carousel image
2. Project card — single static image
3. Project card — image placeholder
4. Link variants — coming-soon vs. real (internal and external)
5. Skill category block
6. Project group shell
7. About section grid

## Coming-soon link convention

Links for projects without a detail page use `class="coming-soon-link"` on a bare `<a>` tag (no `href`).
When a project page is ready, replace with `<a href="projects/filename.html">View project →</a>`.

## Placeholder images

Cards without images use `.project-image-placeholder`. Replace the entire placeholder `<div>` with
either a single `<img>` or a `.project-image-rotator` carousel when images become available.

## Pending items

- Fill in real URLs for GitHub, LinkedIn, and Email:
  - Sticky header Links dropdown (index.html)
  - Footer links (index.html)
  - Sub-page nav dropdowns (template + any project pages)
  - Hero nav Email link (index.html)
- Convert coming-soon links to real hrefs as project pages are created
  (Master Oogway, Skadoosh/Eggsterminator, Contributions, ESP-RESSO 32, E29 Corner Mount)
- ESP-RESSO 32 is currently a single static image; can become a carousel when more images exist
- ME127.html uses the old simplified nav — can be updated to the full dropdown nav from _template.html
- **Project nav dropdown:** once the majority of project pages exist, add direct links to them
  in the sticky header Projects dropdown as flat indented items beneath the section anchors
  (e.g. "↳ Master Oogway" under "Combat Robotics"). Do NOT use a nested/flyout submenu —
  flatten everything into one dropdown. Update index.html and _template.html together.
