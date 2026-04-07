<template>
  <div class="workbench">

    <!-- ── TOP BAR ─────────────────────────────────────────── -->
    <header class="wb-topbar">
      <div class="wb-title">
        <span class="wb-dot" />
        ProjectCard <em>workbench</em>
      </div>
      <div class="wb-controls">
        <label class="wb-toggle">
          <input type="checkbox" v-model="showGrid" />
          <span>grid</span>
        </label>
        <label class="wb-toggle">
          <input type="checkbox" v-model="darkSurface" />
          <span>dark bg</span>
        </label>
        <div class="wb-scale">
          <span>scale</span>
          <input type="range" min="60" max="110" step="5" v-model.number="scale" />
          <span>{{ scale }}%</span>
        </div>
      </div>
    </header>

    <!-- ── MAIN CANVAS ─────────────────────────────────────── -->
    <main class="wb-canvas" :class="{ 'wb-canvas--dark': darkSurface, 'wb-canvas--grid': showGrid }">

      <!-- SECTION: Spotlight cards -->
      <section class="wb-section">
        <div class="wb-section-label">spotlight — with images</div>
        <div class="wb-row">
          <div
            v-for="(project, i) in spotlightProjects"
            :key="'sp-' + i"
            class="wb-card-frame"
            :style="{ transform: `scale(${scale / 100})` }"
          >
            <div class="wb-frame-label">{{ project.title }}</div>
            <ProjectCard :project="project" :isSpotlight="true" />
          </div>
        </div>
      </section>

      <!-- SECTION: Deck (minified) cards -->
      <section class="wb-section">
        <div class="wb-section-label">deck — minified (isSpotlight: false)</div>
        <div class="wb-row wb-row--wrap">
          <div
            v-for="(project, i) in deckProjects"
            :key="'dk-' + i"
            class="wb-card-frame wb-card-frame--small"
            :style="{ transform: `scale(${scale / 100})` }"
          >
            <div class="wb-frame-label">{{ project.title }}</div>
            <ProjectCard :project="project" :isSpotlight="false" />
          </div>
        </div>
      </section>

      <!-- SECTION: Edge cases -->
      <section class="wb-section">
        <div class="wb-section-label">edge cases</div>
        <div class="wb-row">
          <div
            v-for="(project, i) in edgeCases"
            :key="'ec-' + i"
            class="wb-card-frame"
            :style="{ transform: `scale(${scale / 100})` }"
          >
            <div class="wb-frame-label">{{ project._label }}</div>
            <ProjectCard :project="project" :isSpotlight="project._spotlight" />
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'

// ── UI state ────────────────────────────────────────────────
const showGrid  = ref(false)
const darkSurface = ref(false)
const scale     = ref(90)

// ── Mock image list (uses your existing /medias/ structure) ──
// Drop any real filenames in here; workbench will use them.
// Falls back to a placeholder path if the file doesn't exist.
const imgs = (title, names) => names.map(n => n)  // kept simple — just filenames

// ── Spotlight mock projects ──────────────────────────────────
const spotlightProjects = [
  {
    title: 'Portfolio App',
    type: 'web',
    description:
      'A full-stack portfolio built with Vue 3 and Node.js. Features dynamic project cards, animated transitions, and a custom CMS for content updates without redeployment.',
    tags: ['Vue 3', 'Node.js', 'Vite', 'GSAP'],
    link: 'https://example.com',
    repo: 'https://github.com/example/portfolio',
    video: null,
    images: imgs('Portfolio App', ['screenshot-1.webp', 'screenshot-2.webp', 'screenshot-3.webp']),
  },
  {
    title: 'E-Commerce PWA',
    type: 'web',
    description:
      'Progressive web app with offline support, cart persistence, Stripe payment integration, and a real-time inventory system. Scored 98 on Lighthouse.',
    tags: ['React', 'Redux Toolkit', 'Stripe', 'Workbox'],
    link: 'https://example.com',
    repo: null,
    video: 'https://youtube.com/watch?v=example',
    images: imgs('E-Commerce PWA', ['hero.webp', 'cart.webp']),
  },
  {
    title: 'Analytics Dashboard',
    type: 'data',
    description:
      'Real-time analytics dashboard with D3-powered charts, WebSocket data feeds, and configurable widget layout. Handles 50k events/min without frame drops.',
    tags: ['TypeScript', 'D3.js', 'WebSocket', 'Tailwind'],
    link: null,
    repo: 'https://github.com/example/dashboard',
    video: null,
    images: imgs('Analytics Dashboard', ['dash.webp', 'charts.webp', 'mobile.webp']),
  },
]

// ── Deck (minified) mock projects ───────────────────────────
const deckProjects = [
  {
    title: 'Chat Platform',
    type: 'web',
    description: 'Real-time messaging with rooms and presence indicators.',
    tags: ['WebSocket', 'Express', 'Socket.io'],
    link: 'https://example.com',
    repo: null,
    video: null,
    images: imgs('Chat Platform', ['bg-img.webp']),
  },
  {
    title: 'Game Engine',
    type: 'game',
    description: '2D canvas engine with sprite batching and a physics layer.',
    tags: ['Canvas API', 'WebGL', 'TypeScript'],
    link: null,
    repo: 'https://github.com/example/engine',
    video: 'https://youtube.com/watch?v=example',
    images: imgs('Game Engine', ['bg-img.webp']),
  },
  {
    title: 'CMS Builder',
    type: 'tool',
    description: 'Headless CMS with drag-and-drop page builder.',
    tags: ['Svelte', 'GraphQL', 'Postgres'],
    link: 'https://example.com',
    repo: 'https://github.com/example/cms',
    video: null,
    images: imgs('CMS Builder', ['bg-img.webp']),
  },
  {
    title: 'Mobile App',
    type: 'mobile',
    description: 'Cross-platform app with offline-first architecture.',
    tags: ['React Native', 'Firebase'],
    link: null,
    repo: null,
    video: 'https://youtube.com/watch?v=example',
    images: imgs('Mobile App', ['bg-img.webp']),
  },
]

// ── Edge cases ───────────────────────────────────────────────
const edgeCases = [
  {
    _label: 'no links at all',
    _spotlight: true,
    title: 'Secret Project',
    type: 'web',
    description: 'This project has no live link, no repo and no video — just a description. Testing that the links row collapses gracefully and nothing looks broken.',
    tags: ['Stealth', 'WIP'],
    link: null,
    repo: null,
    video: null,
    images: imgs('Secret Project', ['screenshot-1.webp']),
  },
  {
    _label: 'very long title + many tags',
    _spotlight: true,
    title: 'An Extraordinarily Long Project Title That Might Overflow',
    type: 'web',
    description: 'Stress-testing long titles and a large number of tag chips to see how they wrap and whether the layout holds up under real-world content pressure.',
    tags: ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind', 'Pinia', 'Vitest', 'Playwright', 'Docker'],
    link: 'https://example.com',
    repo: 'https://github.com/example/long',
    video: null,
    images: imgs('Long Title Project', ['screenshot-1.webp', 'screenshot-2.webp']),
  },
  {
    _label: 'no images (images tab empty)',
    _spotlight: true,
    title: 'CLI Tool',
    type: 'tool',
    description: 'A command-line project manager with no screenshots. The image carousel should handle an empty images array without crashing or showing broken states.',
    tags: ['Rust', 'CLI'],
    link: null,
    repo: 'https://github.com/example/cli',
    video: null,
    images: [],
  },
]
</script>

<style scoped>
/* ── Layout ─────────────────────────────────────────────────── */
.workbench {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'DM Mono', 'Fira Code', monospace;
  background: #f0ede8;
  color: #1a1a1a;
}

/* ── Top bar ────────────────────────────────────────────────── */
.wb-topbar {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 44px;
  background: #1a1a1a;
  color: #e8e4dc;
  font-size: 12px;
  letter-spacing: 0.04em;
  border-bottom: 1px solid #2e2e2e;
}

.wb-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.wb-title em {
  font-style: normal;
  color: #7a7a7a;
  font-weight: 400;
}

.wb-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 6px #4ade8088;
}

.wb-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.wb-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  color: #9a9a9a;
  transition: color 0.15s;
}

.wb-toggle:hover { color: #e8e4dc; }

.wb-toggle input {
  accent-color: #4ade80;
  cursor: pointer;
}

.wb-scale {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9a9a9a;
}

.wb-scale input[type="range"] {
  width: 80px;
  accent-color: #4ade80;
  cursor: pointer;
}

/* ── Canvas ─────────────────────────────────────────────────── */
.wb-canvas {
  flex: 1;
  padding: 32px 28px 64px;
  transition: background 0.2s;
  background: #f0ede8;
}

.wb-canvas--dark {
  background: #141414;
}

.wb-canvas--grid {
  background-image:
    linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
  background-size: 24px 24px;
}

.wb-canvas--dark.wb-canvas--grid {
  background-color: #141414;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
}

/* ── Sections ───────────────────────────────────────────────── */
.wb-section {
  margin-bottom: 56px;
}

.wb-section-label {
  font-family: 'DM Mono', 'Fira Code', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #9a9a9a;
  margin-bottom: 16px;
  padding-left: 2px;
  border-left: 2px solid #4ade80;
  padding-left: 8px;
}

.wb-canvas--dark .wb-section-label {
  color: #555;
}

/* ── Rows ───────────────────────────────────────────────────── */
.wb-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
  overflow-x: auto;
  padding-bottom: 12px;
}

.wb-row--wrap {
  flex-wrap: wrap;
  overflow-x: visible;
}

/* ── Card frames ────────────────────────────────────────────── */
.wb-card-frame {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transform-origin: top left;
  transition: transform 0.2s ease;
}

.wb-card-frame--small {
  /* deck cards are naturally smaller — let them breathe */
}

.wb-frame-label {
  font-family: 'DM Mono', 'Fira Code', monospace;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #bbb;
  padding: 2px 6px;
  background: #1a1a1a22;
  border-radius: 3px;
  width: fit-content;
}

.wb-canvas--dark .wb-frame-label {
  background: #ffffff11;
  color: #555;
}
</style>