import { updatePanel } from './panel'
import { openCarousel, setupCarouselTouchSupport } from './carousel'

export function renderProjectList(state) {
  const container = document.getElementById('projects')

  container.innerHTML = state.projects.sections
    .map(section => `
      <div class="section">
        <button class="section-toggle" onclick="toggleSection(this)">
          <span class="arrow">▶</span>
          <span class="section-label">${section.title}</span>
          <span class="section-count">${section.projects.length}</span>
        </button>
        <div class="section-items">
          ${section.subLabel ? `<span class="sub-label">${section.subLabel}</span>` : ''}
          ${section.projects
            .map(p => `
              <div class="project-item" data-id="${p.id}">
                <div>
                  <div class="project-name">${p.title}</div>
                  ${p.tags ? `
                    <div class="project-tags">
                      ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                  ` : ''}
                </div>
                ${p.url ? `<a class="ext-link" href="${p.url}" target="_blank" onclick="event.stopPropagation()">${p.urlLabel || '↗'}</a>` : ''}
              </div>
              <div class="mobile-preview" id="mobile-${p.id}">
                <div class="preview-meta">
                  <strong>${p.title}</strong> — ${p.description}
                  ${p.url ? `<a href="${p.url}" target="_blank" class="ext-link">${p.urlLabel || '↗'}</a>` : ''}
                </div>
                ${p.media?.images && p.media.images.length > 0 ? `
                  <div class="thumb-gallery">
                    <div class="thumb-scroll">
                      ${p.media.images.map((img, idx) => `
                        <div class="thumb-item" data-idx="${idx}" data-id="${p.id}">
                          <img src="${p.media.path}${img}" alt="thumbnail ${idx + 1}">
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            `)
            .join('')}
        </div>
      </div>
    `)
    .join('')

  // Section toggle functionality
  window.toggleSection = function(btn) {
    btn.classList.toggle('open')
    btn.nextElementSibling.classList.toggle('open')
  }

  // Project selection functionality
  container.addEventListener('click', (e) => {
    const item = e.target.closest('.project-item')
    if (!item) return

    const id = item.dataset.id
    state.activeId = id

    document.querySelectorAll('.project-item')
      .forEach(el => el.classList.remove('active'))

    item.classList.add('active')

    // Handle mobile vs desktop
    const isMobile = window.innerWidth < 900
    if (isMobile) {
      const mobileEl = document.getElementById('mobile-' + id)
      if (mobileEl) {
        document.querySelectorAll('.mobile-preview').forEach(el => el.classList.remove('open'))
        mobileEl.classList.add('open')
      }
    } else {
      updatePanel(state)
    }
  })

  // Open first section by default
  const firstToggle = container.querySelector('.section-toggle')
  if (firstToggle) firstToggle.click()

  // Handle thumbnail clicks to open carousel
  container.addEventListener('click', (e) => {
    const thumb = e.target.closest('.thumb-item')
    if (thumb) {
      const projectId = thumb.dataset.id
      const idx = parseInt(thumb.dataset.idx, 10)
      openCarousel(projectId, idx, state.projects)
      setupCarouselTouchSupport()
    }
  })
}