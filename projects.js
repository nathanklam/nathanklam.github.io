/* ===================================================================
   PROJECT DATA
   Each project is one object with a unique `id`. To retire a project
   to the Archive, change its `status` from 'active' to 'archived' —
   nothing else needs to move. It will automatically disappear from
   its group's row list and appear as a compact entry under the
   "Archive" dropdown in the navbar. If no projects are archived, the
   dropdown and the Archive section simply don't render.

   Fields:
     id          unique slug, used as the row's element id / anchor
     group       'combat-robotics' | 'academic-projects'
                 (must match a [data-group] container in index.html)
     status      'active' | 'archived'
     badge       optional small chip label (e.g. an award)
     title       project heading, HTML entities allowed
     images      [] for a placeholder, [one] for a static image,
                 [two+] to render as a captioned carousel
                 each image: { src, alt, caption, contain }
                 `contain` = true for renders/CAD shots that need
                 letterboxing on a white background instead of a crop
     description paragraph text
     meta        [[label, value], ...] rendered as spec lines
     link        { mode: 'external', href, label } or
                 { mode: 'soon', label }
=================================================================== */

const PROJECTS = [
  {
    id: 'master-oogway',
    group: 'combat-robotics',
    status: 'active',
    badge: 'Coolest Bot; Most Destroyed — Sacramento 2025',
    title: '&ldquo;Master Oogway&rdquo; (Spring 2025)',
    images: [
      { src: 'images/main_page/master_oogway_CAD.png', alt: 'Master Oogway CAD overview', contain: true }
    ],
    description: 'A 15 lb combat robot developed with a $1000 budget under my leadership, featuring a four-wheel drive system and a dual-disk spinner optimized for reliability and serviceability. Led mechanical design and manufacturing, focusing on survivability and durability; ranked highest in comparison to other Berkeley teams.',
    meta: [['Tools/Skills', 'Fusion 360 · Mill · Lathe · BOM Management · GD&amp;T']],
    link: { mode: 'external', href: 'projects/master_oogway.html', label: 'View Robot' }
  },
  {
    id: 'skadoosh',
    group: 'combat-robotics',
    status: 'active',
    badge: 'Most Destructive (Eggsterminator) — Berkeley 2024',
    title: '1lb PLANTs &ldquo;Skadoosh&rdquo; (Winter 2026-), &ldquo;Eggsterminator&rdquo; (Fall 2024)',
    images: [
      { src: 'images/main_page/eggsterminator.png', alt: 'Eggsterminator 1lb robot', caption: 'Eggsterminator (Fall 2024)', contain: true },
      { src: 'images/main_page/skadoosh.jpg',       alt: 'Skadoosh 1lb robot',       caption: 'Skadoosh v1 (Winter 2026)',  contain: true },
      { src: 'images/main_page/skadoosh_v2.jpg',    alt: 'Skadoosh 1lb robot',       caption: 'Skadoosh v2 (Spring 2026)' },
      { src: 'images/main_page/skadoosh_v3.png',    alt: 'Skadoosh 1lb robot',       caption: 'Skadoosh v3 (Summer 2026)',  contain: true }
    ],
    description: 'Eggsterminator was a 1 lb plastic combat robot focused on survivability through angled geometry and print-oriented design, earning Most Destructive in an internal competition. Skadoosh builds on this foundation with an improved weapon system and experimental front-wedge geometry. The third iteration is in assembly, returning to tested and proven design methodology.',
    meta: [['Tools/Skills', 'Onshape · Fusion 360 · 3D Printing · Soldering']],
    link: { mode: 'external', href: 'projects/PLANTs.html', label: 'View Robots' }
  },
  {
    id: 'planned-3lb',
    group: 'combat-robotics',
    status: 'active',
    badge: 'In Design',
    title: 'Planned 3 lb, "I am You" (Summer 2026-)',
    images: [],
    description: 'Horizontal midcutter robot design in progress. The goal is to integrate a microcontroller and IMU to add semi-autonomy functionality. Our first milestone is to automatically maximize bite.',
    meta: [['Tools/Skills', 'Onshape']],
    link: { mode: 'soon', label: 'View Robot (Coming Soon)' }
  },
  {
    id: 'malware-syntax-terror',
    group: 'combat-robotics',
    status: 'active',
    title: 'Project Contributions: &ldquo;Malware&rdquo; (Fall 2025-), &ldquo;Syntax Terror&rdquo; (Fall 2025-)',
    images: [
      { src: 'images/main_page/malware.png',       alt: 'Malware 30lb robot',      caption: 'Malware (30 lb)',      contain: true },
      { src: 'images/main_page/syntax_terror.png', alt: 'Syntax Terror 3lb robot', caption: 'Syntax Terror (3 lb)', contain: true }
    ],
    description: "Contributed to the mechanical design and fabrication of multiple team robots, including the student organization's flagship 30 lb robot with a high-energy spinner and a 3 lb robot exploring shuffling swerve locomotion. Provided additional manual machining support to multiple robot teams, such as Global Pounding and Traiano (12 lb robots).",
    meta: [['Tools/Skills', 'Onshape · Mill · Lathe']],
    link: { mode: 'soon', label: 'View Contributions (Coming Soon)' }
    //link: { mode: 'external', href: 'projects/contributions.html', label: 'View Contributions' }
  },
  {
    id: 'culinary-bot',
    group: 'academic-projects',
    status: 'active',
    title: 'Culinary Bot (Spring 2026)',
    images: [
      { src: 'images/main_page/mec106a.png', alt: 'MEC106A' }
    ],
    description: 'A robotic culinary plating assistant using a UR7e arm with an attached camera to capture a completed dish from multiple viewpoints, reconstruct a 3D model of the arrangement, identify food items, and generate an accurate pick-and-place plan to recreate it.',
    meta: [
      ['Course', 'MEC106A - Introduction to Robotics'],
      ['Tools/Skills', 'ROS2 · YOLO · Python · HTML · CSS']
    ],
    link: { mode: 'external', href: 'https://nchaniel.github.io/106a-Report/', label: 'Link to Project Website' }
  },
  {
    id: 'composite-armor',
    group: 'academic-projects',
    status: 'active',
    title: 'Composite Armor in Combat Robotics Applications (Spring 2026)',
    images: [
      { src: 'images/main_page/me127.png', alt: 'ME127 Simulations' }
    ],
    description: 'A simulation project investigating the behavior of composites under medium-velocity impacts (up to 110 m/s) with non-linear trajectories and high mass. The goal is to explore and possibly develop alternatives to aluminum 6061 and steel for armor applications in combat robotics.',
    meta: [
      ['Course', 'ME127 - Introduction to Composite Materials'],
      ['Tools/Skills', 'Ansys · LS-DYNA · Fusion 360 · LaTeX']
    ],
    link: { mode: 'external', href: 'projects/ME127.html', label: 'View Project Report' }
  },
  {
    id: 'esp-resso-32',
    group: 'academic-projects',
    status: 'active',
    title: 'ESP-RESSO 32 (Fall 2025)',
    images: [
      { src: 'images/main_page/espresso32.png', alt: 'ESP-RESSO 32 embedded system' }
    ],
    description: 'An embedded system using ESP32 microcontrollers to monitor and allow repeatability of moka pot brewing via multiple sensors and real-time feedback. Prioritized functional reliability over aesthetics.',
    meta: [
      ['Course', 'ME100 - Electronics for IoT'],
      ['Tools/Skills', 'Python · Fusion 360']
    ],
    link: { mode: 'soon', label: 'View Project (Coming Soon)' }
  },
  {
    id: 'e29-corner-mount',
    group: 'academic-projects',
    status: 'archived',
    title: 'Caster Wheel Modular Mounting System &mdash; Corner Mount (Spring 2025)',
    images: [
      { src: 'images/main_page/e29_corner_mount.png', alt: 'E29 Corner Mount design', caption: 'Corner Mount Design', contain: true },
      { src: 'images/e29/e29_deliverable.png',        alt: 'E29 deliverable',         caption: 'Deliverable' },
      { src: 'images/e29/e29_assembly.png',            alt: 'E29 assembly view',       caption: 'Assembly View' }
    ],
    description: 'A modular mounting mechanism enabling temporary and non-destructive attachment of caster wheels to object corners without drilling or permanent fasteners. Designed as part of a multi-component team assembly emphasizing manufacturability and ease of use.',
    meta: [
      ['Course', 'E29 - Manufacturing and Design Communication'],
      ['Tools/Skills', 'Fusion 360 · SolidWorks']
    ],
    link: { mode: 'soon', label: 'View Project (Coming Soon)' }
  }
];

/* ===================================================================
   RENDERING — you shouldn't need to touch anything below this line
   when adding, editing, or archiving a project above.
=================================================================== */

function placeholderMediaHTML() {
  return `<div class="row-media-placeholder">
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
    <span>Images Coming Soon</span>
  </div>`;
}

function mediaHTML(project) {
  const imgs = project.images || [];
  if (imgs.length === 0) return placeholderMediaHTML();

  if (imgs.length === 1) {
    const im = imgs[0];
    return `<img src="${im.src}" alt="${im.alt}"${im.contain ? ' class="contain"' : ''}>`;
  }

  const slides = imgs.map(im =>
    `<img src="${im.src}" alt="${im.alt}" data-caption="${im.caption || ''}"${im.contain ? ' class="contain"' : ''}>`
  ).join('');
  const dots = imgs.map(() => `<span class="carousel-dot"></span>`).join('');

  return `<div class="project-image-rotator">
    <div class="image-viewport">
      ${slides}
      <div class="image-caption-overlay"></div>
      <div class="carousel-controls">
        <button class="carousel-btn carousel-prev" aria-label="Previous image">&#8249;</button>
        <div class="carousel-dots">${dots}</div>
        <button class="carousel-btn carousel-next" aria-label="Next image">&#8250;</button>
      </div>
    </div>
  </div>`;
}

function linkHTML(link, extraClass) {
  if (!link) return '';
  if (link.mode === 'external') {
    return `<a class="project-link${extraClass ? ' ' + extraClass : ''}" href="${link.href}">${link.label} &rarr;</a>`;
  }
  return `<a class="coming-soon-link${extraClass ? ' ' + extraClass : ''}">${link.label} &rarr;</a>`;
}

function metaHTML(meta) {
  return (meta || []).map(([label, value]) =>
    `<p class="project-meta"><span class="meta-label">${label}:</span> ${value}</p>`
  ).join('');
}

function rowHTML(project, reverse) {
  const badge = project.badge ? `<span class="chip">${project.badge}</span>` : '';
  return `<div class="project-row${reverse ? ' reverse' : ''}" id="${project.id}">
    <div class="row-media">${mediaHTML(project)}</div>
    <div class="row-body">
      ${badge}
      <h4>${project.title}</h4>
      <p>${project.description}</p>
      ${metaHTML(project.meta)}
      ${linkHTML(project.link)}
    </div>
  </div>`;
}

function archiveRowHTML(project) {
  const lastMeta = project.meta && project.meta.length ? project.meta[project.meta.length - 1][1] : '';
  return `<div class="archive-row" id="${project.id}-archive">
    <div>
      <div class="archive-title">${project.title}</div>
      <div class="archive-sub">${lastMeta}</div>
    </div>
    ${linkHTML(project.link, 'archive-link')}
  </div>`;
}

(function renderProjects() {
  const active = PROJECTS.filter(p => p.status !== 'archived');
  const archived = PROJECTS.filter(p => p.status === 'archived');

  const byGroup = {};
  active.forEach(p => (byGroup[p.group] = byGroup[p.group] || []).push(p));

  Object.keys(byGroup).forEach(groupId => {
    const container = document.querySelector(`[data-group="${groupId}"] .project-rows`);
    if (!container) return;
    container.innerHTML = byGroup[groupId].map((p, i) => rowHTML(p, i % 2 === 1)).join('');
  });

  if (archived.length) {
    const archiveSection = document.getElementById('archive');
    const archiveDropdown = document.getElementById('archiveDropdown');
    if (archiveSection) {
      archiveSection.style.display = '';
      archiveSection.querySelector('.archive-list').innerHTML = archived.map(archiveRowHTML).join('');
    }
    if (archiveDropdown) {
      archiveDropdown.style.display = '';
      archiveDropdown.querySelector('.navbar-dropdown-menu').innerHTML =
        archived.map(p => `<a href="#${p.id}-archive">${p.title}</a>`).join('');
    }
  }

  // (Re)initialize every carousel on the page, including the ones
  // just injected above and the static one in the About section.
  document.querySelectorAll('.project-image-rotator').forEach(rotator => {
    const images  = rotator.querySelectorAll('.image-viewport img');
    const dots    = rotator.querySelectorAll('.carousel-dot');
    const caption = rotator.querySelector('.image-caption-overlay');
    const prev    = rotator.querySelector('.carousel-prev');
    const next    = rotator.querySelector('.carousel-next');
    let current   = 0;

    function goTo(i) {
      images[current].classList.remove('active');
      dots[current]?.classList.remove('active');
      current = (i + images.length) % images.length;
      images[current].classList.add('active');
      dots[current]?.classList.add('active');
      if (caption) caption.textContent = images[current].dataset.caption || '';
    }

    goTo(0);

    let timer;
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 4000);
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetTimer(); }));
    prev?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
    next?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

    resetTimer();
  });
})();
