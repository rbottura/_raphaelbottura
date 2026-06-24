/**
 * Client-side routing for deep links.
 *
 * Each project gets a URL like /colorkinetype (derived from its id, or an
 * optional `slug` field). The site is a static SPA, so on a direct visit
 * Netlify rewrites the path to index.html (see public/_redirects) and this
 * module reads the path to open the matching project.
 */

const SITE_TITLE = 'Raphael Bottura'

/**
 * Turn an id (or custom slug) into a clean, URL-safe slug.
 * "Projet_Eclate" -> "projet-eclate", "personnal playground" -> "personnal-playground"
 */
export function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** The slug used in the URL for a given project. */
export function projectSlug(project) {
  return slugify(project.slug || project.id)
}

/** Read the current slug from the URL path (ignores query/hash). */
export function currentSlug() {
  return decodeURIComponent(window.location.pathname).replace(/^\/+|\/+$/g, '')
}

/** Find a project (and its section) whose slug matches the given slug. */
export function findProjectBySlug(projects, slug) {
  const target = slugify(slug)
  if (!target) return null
  for (const section of projects.sections) {
    for (const project of section.projects) {
      if (projectSlug(project) === target) return { project, section }
    }
  }
  return null
}

/** Update the address bar to reflect the active project (no page reload). */
export function setUrlForProject(project, { replace = false } = {}) {
  const path = project ? '/' + projectSlug(project) : '/'
  if (window.location.pathname === path) return
  const method = replace ? 'replaceState' : 'pushState'
  window.history[method]({ projectId: project ? project.id : null }, '', path)
}

/** Keep the browser tab title in sync with the active project. */
export function updateDocumentTitle(project) {
  document.title = project ? `${project.title} — ${SITE_TITLE}` : SITE_TITLE
}

/**
 * Wire up routing. `onSelect(id, opts)` opens a project and `onClear(opts)`
 * returns to the home/empty state. Handles the initial URL plus back/forward.
 */
export function initRouter(state, { onSelect, onClear }) {
  const route = () => {
    const slug = currentSlug()
    if (!slug) {
      onClear({ updateHistory: false })
      return
    }
    const match = findProjectBySlug(state.projects, slug)
    if (match) {
      onSelect(match.project.id, { updateHistory: false, scroll: true })
    } else {
      // Unknown slug: show home and clean up the URL.
      onClear({ updateHistory: false })
      window.history.replaceState(null, '', '/')
    }
  }

  window.addEventListener('popstate', route)
  route() // resolve the URL the visitor landed on
}
