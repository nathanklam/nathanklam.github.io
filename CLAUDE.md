# Nathan Lam — Portfolio CLAUDE.md

## Project overview

Static HTML/CSS portfolio site for Nathan Lam, Mechanical Engineering student at UC Berkeley.
No build step. Open `index.html` directly in a browser or serve with any static file server.

Design: "Editorial Rows" — a light sticky navbar and full-width alternating
image/text rows, ported from the `concept-bento/` prototype. Home page project
content is data-driven (see `projects.js` below), not hand-written HTML.

## File structure

```
index.html          — main page (about, skills, all projects)
styles.css           — all styles for index.html and sub-pages
projects.js          — PROJECTS data array + rendering/carousel logic for index.html
resume.html          — resume embed page
_snippets.html       — copy-paste reference for home page patterns (not a live page)
projects/
  _template.html     — reference template for new project pages (copy this)
  ME127.html          — composites final report (PDF embed)
  master_oogway.html  — Master Oogway project page
  PLANTs.html         — Skadoosh / Eggsterminator (1 lb robots) project page
  contributions.html  — Malware / Syntax Terror contributions page
images/
  about/             — personal/competition photos used in the About section
  main_page/         — card thumbnail images used by projects.js on index.html
  master_oogway/, e29/, 1lb_bots/, bot_contributions/ — sub-page images
concept-bento/        — standalone design prototype this site's styling is based on;
                         does not link into the live site, kept for reference
concept-blueprint/     — an earlier, unused design prototype
```

## Color system (CSS custom properties in styles.css)

| Variable         | Value       | Used for                                         |
|-------------------|-------------|--------------------------------------------------|
| `--bg`            | `#eef1f4`   | Page background                                   |
| `--surface`       | `#ffffff`   | Accordion/card surfaces                           |
| `--surface-2`     | `#e1e7ec`   | Image placeholder / carousel background           |
| `--ink`           | `#161b20`   | Primary text, headings                            |
| `--body-text`     | `#343c43`   | Paragraph text                                    |
| `--muted`         | `#66707a`   | Secondary text (meta, subtitles, captions)        |
| `--accent`        | `#285f82`   | Primary accent — links, chips, navbar border      |
| `--accent-soft`   | `#dbe7ee`   | Chip / skill-tag background                       |
| `--accent-text`   | `#1c4a64`   | Chip / skill-tag text                             |
| `--accent-light`  | `#6fa8c9`   | Navbar "Email" button, accordion open underline   |
| `--border`        | `#d5dce2`   | Hairline dividers                                 |
| `--navbar-bg`      | `#161b20`   | Sticky navbar, accordion headers, model-viewer bg |

There is a single accent color (no separate combat/academic accent colors as
in the previous design) — project groups are differentiated by heading text
only, not a colored bar.

## styles.css structure (Table of Contents)

The stylesheet is divided into numbered sections — find the section comment
(`── N. Name ──`) to jump to the right block:

```
Shared:
  1.  Design tokens (:root)
  2.  Reset & base
  3.  Navbar               (.navbar)          — single sticky bar, all pages
  4.  Page wrapper          (.page)
  5.  Carousel               (.project-image-rotator)
  6.  Footer

Home page:
  7.  Hero                   (.hero)
  8.  Section heading        (.section-heading)
  9.  About row               (.about-row)
  10. Skills list             (.skills-list)
  11. Project groups & rows   (.project-group / .project-row)
  12. Archive list            (.archive-list)
  13. Responsive — home page

Sub-pages (projects/, resume.html):
  14. Sub-page heading        (.project-heading)
  15. Sub-page section headings (scoped via child combinators — see below)
  16. Overview grid & spec list
  17. Project blocks          (.project-block)
  18. Image captions          (.project-figure)
  19. Standalone carousel     (.carousel-block)
  20. Video embed             (.video-wrapper)
  21. PDF embed                (section > iframe)
  22. Accordion                (.accordion)
  23. 3D model viewer          (model-viewer)
  24. Responsive — sub-pages
```

## Navbar — same on every page

There is one navbar component (`.navbar` / `.navbar-inner` / `.navbar-nav`),
used identically on `index.html` and every sub-page. It's `position: sticky`
and always visible — there is **no** separate hero header, no scroll-triggered
show/hide JS, and no `.site-header` vs `.hero-header` distinction to worry
about (unlike the previous design).

- On `index.html`, nav links are same-page anchors: `#about`, `#skills`, `#projects`.
- On sub-pages, they point back to the home page: `../index.html#about`, etc.
  (`resume.html` sits at the root like `index.html`, so it uses bare
  `index.html#about` — no `../`.)
- The archive dropdown (`#archiveDropdown`) only exists on `index.html`; it's
  hidden by default and revealed by `projects.js` if any project has
  `status: 'archived'`.

**Never** add a second header element to a page — everything (branding,
nav, contact) lives in the one `.navbar`.

## Home page projects are data-driven (projects.js)

Unlike the rest of the site, project cards on `index.html` are **not**
hand-written HTML. `index.html` only provides the group shells:

```html
<div class="project-group" id="combat-robotics" data-group="combat-robotics">
  <h3 class="project-group-title">Combat Robotics at Berkeley</h3>
  <p class="project-group-subtitle">...</p>
  <div class="project-rows"></div>
</div>
```

`projects.js` holds a `PROJECTS` array (one object per project) and renders
each group's `.project-rows` container by matching `group` to `data-group`.
Rows alternate image-left / image-right automatically within each group.

**To add, edit, or archive a project: edit `projects.js`, not `index.html`.**
See the field reference in the comment at the top of `projects.js`, or
`_snippets.html` Section 1 for a copy-paste starting object. Setting
`status: 'archived'` on a project automatically moves it out of its group
and into the Archive section + navbar dropdown — nothing else needs to move.

`projects.js` also contains the carousel init logic that used to live inline
in `index.html`'s `<script>` tag; it runs after rendering so it also
initializes the static About-section carousel.

## Disabling "flashy" features

Certain visual effects are marked `/* FLASHY: ... */` in the code for easy removal:

- **Carousel auto-rotation**: remove the `resetTimer`/`setInterval` block in the
  carousel-init script — in `projects.js` (home page) or the inline script at
  the bottom of each sub-page.
- **Image captions**: remove all `<div class="image-caption-overlay">` elements from HTML.
- **Carousel arrows/dots**: remove all `<div class="carousel-controls">` elements from HTML.

This design does not use dot-grid backgrounds or card hover-lift/zoom effects
(both present in the previous design) — rows and accordion items are static.

## Carousel structure

Every carousel follows this HTML pattern:

```html
<div class="project-image-rotator">
  <div class="image-viewport">
    <img src="..." alt="..." data-caption="Label shown on image">
    <img src="..." alt="..." data-caption="Second label">
    <!-- one <img> per slide; add class="contain" for renders/CAD shots
         that need letterboxing on white instead of a crop -->
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

On `index.html`, carousels inside project rows are generated by `projects.js`
from a project's `images` array (2+ images → carousel, 1 image → plain
`<img>`, 0 images → placeholder). The About-section carousel and every
sub-page carousel are still hand-written HTML using the pattern above, and
are initialized by the same carousel-init logic (duplicated inline on
sub-pages, since they don't load `projects.js`).

**Important:** the number of `.carousel-dot` spans must match the number of `<img>` tags.

On sub-pages, wrap the rotator in `<div class="carousel-block">` to give it
an explicit height. On the home page, `.row-media` / `.about-media` provide
this automatically.

## Accordion max-height

The accordion open state uses `max-height: 5000px` in styles.css section 22 as a CSS animation workaround (you can't transition to `height: auto`). If an accordion item's content is unusually tall and gets clipped at the bottom, increase this value.

## Video embed with caption

To add a caption below a video, wrap `.video-wrapper` in `<figure class="project-figure">`:

```html
<figure class="project-figure">
  <div class="video-wrapper">
    <iframe src="https://www.youtube.com/embed/YOUR_ID" title="..." allowfullscreen></iframe>
  </div>
  <figcaption>Caption text here.</figcaption>
</figure>
```

**Do not put a video inside `.project-block` alongside tall text.** The two-column grid constrains the text column to the video's height — any overflow is hidden. Instead, put the `<figure>` above and the text paragraphs as regular `<p>` elements below it in the same `<section>`.

## Sub-page conventions

- Copy `projects/_template.html` as a starting point for new project pages.
- Sub-pages use the same `.navbar` as `index.html` (see above), with `../`-prefixed links, followed by `<main class="page">`.
- Put the project title in `<div class="project-heading">` at the top of `<main>`,
  not inside the navbar.
- Top-level sub-page sections use a plain `<h2>` as a **direct child** of
  `<section>` (e.g. `<section id="overview"><h2>Overview</h2>...`) — the
  styling in styles.css section 15 targets `.page > section > h2` specifically
  so it can't collide with the home page's `.section-heading h2`. Don't wrap
  sub-page section headings in extra markup.
- PDF embeds use `<iframe>` as a direct child of `<section>` — the CSS rule
  `section > iframe { height: 900px }` targets exactly this pattern.
- Video embeds go inside `<div class="video-wrapper">` to maintain 16:9 aspect ratio. Works with YouTube (`https://www.youtube.com/embed/ID`), Google Drive (`https://drive.google.com/file/d/FILE_ID/preview`, file must be shared "Anyone with the link can view"), or any other iframe-embeddable source.

## About section layout

The About section uses a two-column flex layout (`.about-row`):

```html
<div class="about-row">
  <div class="about-text"> … paragraphs … </div>
  <div class="about-media">
    <!-- .project-image-rotator carousel goes here -->
  </div>
</div>
```

**Resizing the image column:** set `--about-img-w` and `--about-img-h` as inline custom properties directly on `.about-media` in the HTML (defaults: 320px / 272px) — no CSS change needed.

**Per-image crop control:** use `object-position` inline on each `<img>` to shift where the cover crop sits (e.g. `style="object-position: center 40%;"`). Useful when subjects appear at different heights in their photos.

**Image file size:** large JPEGs (phone/camera resolution) downscaled aggressively by the browser can appear noisier than expected. If an image looks grainy in the carousel, re-export it at ~700–900px on the long edge rather than applying a CSS workaround.

**Photo location:** personal/competition photos belong in `images/about/`, not `images/main_page/`. The `main_page/` folder is for project card thumbnails only.

## _snippets.html reference

`_snippets.html` at the root is a copy-paste cheat sheet for the remaining
hand-written home page patterns (project cards are generated from
`projects.js` now, not copy-pasted). Open it in an editor (not a browser)
when adding new content. It covers:

1. Adding a project (projects.js — PROJECTS array field reference)
2. Skill row block
3. Project group shell
4. About row (text + image carousel)

For sub-page patterns (project-block, overview-grid, carousel-block,
video-wrapper, accordion, PDF embed, model-viewer), copy
`projects/_template.html` instead — it demonstrates all of them in context.

## Coming-soon link convention

Projects without a detail page use `link: { mode: 'soon', label: '...' }` in
their `projects.js` entry, which renders as `class="coming-soon-link"` on a
bare `<a>` tag (no `href`). When a project page is ready, change it to
`link: { mode: 'external', href: 'projects/filename.html', label: '...' }`.

## Placeholder images

Projects with no images yet use `images: []` in their `projects.js` entry,
which renders `.row-media-placeholder`. Once images exist, add them to the
`images` array — 1 image renders as a static `<img>`, 2+ renders as a carousel.

## Pending items

- Fill in real URLs for GitHub, LinkedIn, and Email:
  - Navbar Email button (index.html and every sub-page)
  - Footer links (index.html and every sub-page)
- Convert remaining coming-soon links to real hrefs as project pages are created
  (Planned 3 lb, ESP-RESSO 32, E29 Corner Mount) — edit the `link` field in projects.js.
- ESP-RESSO 32 is currently a single static image; can become a carousel when more images exist.
