import './style.css'
import projects from './data/projects.json'

import { renderProjectList, selectProject, clearSelection } from './ui/projectList'
import { setupPanel } from './ui/panel'
import { closeCarousel, nextSlide, prevSlide, setupCarouselTouchSupport } from './ui/carousel'
import { setupTheme } from './ui/theme'
import { initRouter, findProjectBySlug, currentSlug } from './ui/router'

// Resolve the project from the URL (e.g. /colorkinetype) before first render
// so the list doesn't auto-open the wrong section.
const initialMatch = findProjectBySlug(projects, currentSlug())

const state = {
  activeId: initialMatch ? initialMatch.project.id : null,
  projects
}

setupTheme()
renderProjectList(state)
setupPanel(state)

// Deep links: open the project from the URL, sync the URL on selection,
// and handle browser back/forward.
initRouter(state, {
  onSelect: (id, opts) => selectProject(state, id, opts),
  onClear: (opts) => clearSelection(state, opts)
})

// Expose carousel functions globally for HTML onclick handlers
window.carouselClose = closeCarousel
window.carouselNext = nextSlide
window.carouselPrev = prevSlide
window.setupCarouselTouchSupport = setupCarouselTouchSupport