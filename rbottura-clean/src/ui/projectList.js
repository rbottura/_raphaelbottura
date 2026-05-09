import { updatePanel } from './panel'
import { openCarousel, setupCarouselTouchSupport, isCarouselCloseBufferActive } from './carousel'

export function renderProjectList(state) {
  const container = document.getElementById('projects')

  // Add gallery filter button at the top
  const filterHtml = `
    <div class="projects-filter">
      <button class="filter-btn active" data-filter="all">all</button>
      <button class="filter-btn" data-filter="gallery">gallery</button>
    </div>
  `

  // Initialize filter state if not already set
  if (!state.viewFilter) {
    state.viewFilter = 'all'
  }

  // container.innerHTML = filterHtml

  // Render appropriate view based on filter
  if (state.viewFilter === 'gallery') {
    renderGalleryView(state, container)
  } else {
    renderAllView(state, container)
  }

  // Add filter button event listeners
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      state.viewFilter = btn.dataset.filter
      renderProjectList(state)
    })
  })
}

function renderAllView(state, container) {
  // Render normal sections view
  const sectionsHtml = state.projects.sections
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
            .map(p => renderProjectItem(p))
            .join('')}
        </div>
      </div>
    `)
    .join('')

  container.innerHTML += sectionsHtml

  // Attach event listeners
  attachProjectListeners(state)
}

function renderProjectItem(p) {
  // Check if this is an about preview
  const hasAbout = p.preview?.type === 'about' && p.about
  
  return `
    <div class="project-item" data-id="${p.id}">
    <div>
      <div class="project-info">
        <div class="project-name">${p.title}</div><div class="project-dates"><p>${p.dates ? p.dates.year || p.dates.start : ''}</p></div></div>
        ${p.tags ? `
          <div class="project-tags">
            ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        ` : ''}
      </div>
      ${p.url ? `<a class="ext-link" href="${p.url}" target="_blank" onclick="event.stopPropagation()">${p.urlLabel || '↗'}</a>` : ''}
    </div>
    <div class="mobile-preview" id="mobile-${p.id}">
      ${hasAbout ? renderMobileAboutContent(p.about) : `
        <div class="preview-meta">
          <strong>${p.title}</strong> — ${p.description || ''}
          ${p.url ? `<a href="${p.url}" target="_blank" class="ext-link">${p.urlLabel || '↗'}</a>` : ''}
        </div>
        ${p.media?.images && p.media.images.length > 0 ? `
          <div class="thumb-gallery">
            <div class="thumb-scroll">
              ${p.media.images.map((img, idx) => {
                // Handle both string format (backward compatibility) and object format {src, caption}
                const imgSrc = typeof img === 'string' ? img : img.src
                const caption = typeof img === 'string' ? '' : (img.caption || '')
                return `
                  <div class="thumb-item" data-idx="${idx}" data-id="${p.id}" title="${caption ? caption : ''}">
                    <img src="${p.media.path}${imgSrc}" alt="thumbnail ${idx + 1}">
                  </div>
                `
              }).join('')}
            </div>
          </div>
        ` : ''}
      `}
    </div>
  `
}

function renderMobileAboutContent(about) {
  let html = '<div class="about-content">'
  
  // Bio
  if (about.bio) {
    html += `<div class="about-section"><p class="about-bio">${about.bio}</p></div>`
  }

  if (about.professionalExperience && about.professionalExperience.length > 0) {
    html += `<div class="about-section">
      <h3 class="about-heading">Professional Experience</h3>`
    about.professionalExperience.forEach(exp => {
      html += `<li class="about-list-item"><strong>${exp.position}</strong> — ${exp.company} (${exp.year})</li>`
    })
    html += `</ul></div>`
  }
  
  // Education
  if (about.education && about.education.length > 0) {
    html += `<div class="about-section">
      <h3 class="about-heading">Education</h3>
      <ul class="about-list">`
    about.education.forEach(edu => {
      html += `<li class="about-list-item"><strong>${edu.degree}</strong> — ${edu.school} (${edu.year})</li>`
    })
    html += `</ul></div>`
  }
  
  // Skills
  if (about.skills && about.skills.length > 0) {
    html += `<div class="about-section">
      <h3 class="about-heading">Skills</h3>
      <ul class="about-list">`
    about.skills.forEach(skill => {
      html += `<li class="about-list-item">${skill}</li>`
    })
    html += `</ul></div>`
  }
  
  // Languages
  if (about.languages && about.languages.length > 0) {
    html += `<div class="about-section">
      <h3 class="about-heading">Languages</h3>
      <ul class="about-list">`
    about.languages.forEach(lang => {
      html += `<li class="about-list-item"><strong>${lang.name}</strong> — ${lang.level}</li>`
    })
    html += `</ul></div>`
  }
  
  // Contact
  if (about.contact) {
    html += `<div class="about-section">
      <h3 class="about-heading">Contact</h3>
      <div class="about-contact">`
    if (about.contact.email) {
      html += `<p><a href="mailto:${about.contact.email}">${about.contact.email}</a></p>`
    }
    if (about.contact.location) {
      html += `<p>${about.contact.location}</p>`
    }
    html += `</div></div>`
  }
  
  html += '</div>'
  return html
}

function renderGalleryView(state, container) {
  // Collect all projects with galleries from all sections
  const galleryProjects = []
  state.projects.sections.forEach(section => {
    section.projects.forEach(p => {
      if (p.media?.images && p.media.images.length > 0) {
        galleryProjects.push(p)
      }
    })
  })

  const galleryHtml = `
    <div class="section">
      <button class="section-toggle" onclick="toggleSection(this)">
        <span class="arrow">▶</span>
        <span class="section-label">Gallery</span>
        <span class="section-count">${galleryProjects.length}</span>
      </button>
      <div class="section-items">
        ${galleryProjects
          .map(p => renderProjectItem(p))
          .join('')}
      </div>
    </div>
  `

  container.innerHTML += galleryHtml

  // Attach event listeners
  attachProjectListeners(state)
}

function attachProjectListeners(state) {
  const container = document.getElementById('projects')

  // Section toggle functionality
  window.toggleSection = function(btn) {
    if (isCarouselCloseBufferActive()) {
      console.log('[Section Toggle] Ignored - carousel close buffer active')
      return
    }
    btn.classList.toggle('open')
    btn.nextElementSibling.classList.toggle('open')
  }

  // Project selection functionality
  container.addEventListener('click', (e) => {
    if (isCarouselCloseBufferActive()) {
      console.log('[Project List] Click ignored - carousel close buffer active')
      return
    }

    const item = e.target.closest('.project-item')
    if (!item) {
      return
    }

    const id = item.dataset.id
    console.log('[Project Item] Selected:', id)
    state.activeId = id

    document.querySelectorAll('.project-item')
      .forEach(el => el.classList.remove('active'))

    item.classList.add('active')

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
      console.log('[Thumbnail] Clicked, opening carousel for:', projectId, 'index:', idx)
      openCarousel(projectId, idx, state.projects)
      setupCarouselTouchSupport()
    }
  })

  // Debug: Log clicks on section labels
  container.addEventListener('click', (e) => {
    if (e.target.closest('.section-label')) {
      console.log('[Section Label] Clicked:', e.target.textContent, 'Buffer active?', isCarouselCloseBufferActive())
    }
  }, true)
}