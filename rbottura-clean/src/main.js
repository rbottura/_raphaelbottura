import './style.css'
import projects from './data/projects.json'

import { renderProjectList } from './ui/projectList'
import { setupPanel } from './ui/panel'
import { closeCarousel, nextSlide, prevSlide, setupCarouselTouchSupport } from './ui/carousel'

const state = {
  activeId: null,
  projects
}

renderProjectList(state)
setupPanel(state)

// Expose carousel functions globally for HTML onclick handlers
window.carouselClose = closeCarousel
window.carouselNext = nextSlide
window.carouselPrev = prevSlide
window.setupCarouselTouchSupport = setupCarouselTouchSupport