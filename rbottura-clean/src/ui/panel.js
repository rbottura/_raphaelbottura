export function setupPanel(state) {
  // initial empty state
  const previewPanel = document.getElementById('previewPanel')
  if (previewPanel && window.innerWidth >= 900) {
    previewPanel.style.display = 'flex'
  }
  updatePanel(state)
}

function findProjectById(state, id) {
  for (const section of state.projects.sections) {
    const found = section.projects.find(p => p.id === id)
    if (found) return found
  }
  return null
}

function isVideoFile(filename) {
  return /\.(mp4|webm|ogg|mov|avi)$/i.test(filename)
}

function getVimeoEmbedUrl(vimeoUrl) {
  const match = vimeoUrl.match(/vimeo\.com\/(\d+)/)
  return match ? `https://player.vimeo.com/video/${match[1]}` : vimeoUrl
}

export function updatePanel(state) {
  const project = findProjectById(state, state.activeId)
  const previewPanel = document.getElementById('previewPanel')

  const title = document.getElementById('panelTitle')
  const desc = document.getElementById('panelDesc')
  const actions = document.getElementById('panelActions')
  const iframe = document.getElementById('panelIframe')
  const empty = document.getElementById('panelEmpty')
  const gallery = document.getElementById('panelGallery')

  // Show preview panel on desktop
  if (previewPanel && window.innerWidth >= 900) {
    previewPanel.style.display = 'flex'
  }

  if (!project) {
    title.textContent = 'select a project'
    desc.textContent = ''
    actions.innerHTML = ''
    iframe.style.display = 'none'
    empty.style.display = 'flex'
    if (gallery) gallery.style.display = 'none'
    return
  }

  title.textContent = project.title
  desc.textContent = project.description || ''

  // Check what preview options are available
  const hasAbout = project.preview?.type === 'about' && project.about
  const hasIframe = project.preview?.type === 'iframe' && project.preview?.src
  const hasVideo = project.preview?.type === 'video' && project.preview?.src
  const hasGallery = project.media?.images && project.media.images.length > 0
  const previewHeader = document.querySelector('.preview-panel-header')
  
  // Add toggle buttons if multiple options exist
  let toggleContainer = previewHeader?.querySelector('.preview-toggle-buttons')
  
  if ((hasIframe || hasVideo) && hasGallery) {
    if (!toggleContainer) {
      toggleContainer = document.createElement('div')
      toggleContainer.className = 'preview-toggle-buttons'
      previewHeader?.appendChild(toggleContainer)
    }
    
    toggleContainer.innerHTML = `
      ${hasIframe ? `<button class="preview-toggle-btn" data-preview="iframe">embed</button>` : ''}
      ${hasVideo ? `<button class="preview-toggle-btn" data-preview="video">video</button>` : ''}
      <button class="preview-toggle-btn" data-preview="gallery">gallery</button>
    `
    
    // Set default view or stored preference
    const defaultPreview = state.previewMode || (hasIframe ? 'iframe' : hasVideo ? 'video' : 'gallery')
    state.previewMode = defaultPreview
    
    toggleContainer.querySelectorAll('.preview-toggle-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation()
        const mode = btn.dataset.preview
        state.previewMode = mode
        
        toggleContainer.querySelectorAll('.preview-toggle-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        
        // Re-render the preview with the selected mode
        renderPreviewContent(state, project, iframe, empty, gallery)
      }
      
      if (btn.dataset.preview === state.previewMode) {
        btn.classList.add('active')
      }
    })
  } else if (toggleContainer) {
    toggleContainer.remove()
  }

  actions.innerHTML = (project.links || [])
    .map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`)
    .join('')

  // Render the appropriate content
  renderPreviewContent(state, project, iframe, empty, gallery)
}

function renderPreviewContent(state, project, iframe, empty, gallery) {
  const hasAbout = project.preview?.type === 'about' && project.about
  const hasIframe = project.preview?.type === 'iframe' && project.preview?.src
  const hasVideo = project.preview?.type === 'video' && project.preview?.src
  const hasGallery = project.media?.images && project.media.images.length > 0

  // Determine what to show based on preview mode
  let showAbout = false
  let showIframe = false
  let showVideo = false
  let showGallery = false

  if (state.previewMode === 'about' && hasAbout) {
    showAbout = true
  } else if (state.previewMode === 'iframe' && hasIframe) {
    showIframe = true
  } else if (state.previewMode === 'video' && hasVideo) {
    showVideo = true
  } else if (state.previewMode === 'gallery' && hasGallery) {
    showGallery = true
  } else if (hasAbout) {
    showAbout = true
  } else if (hasIframe) {
    showIframe = true
  } else if (hasVideo) {
    showVideo = true
  } else if (hasGallery) {
    showGallery = true
  }

  // Hide everything first
  iframe.style.display = 'none'
  if (gallery) gallery.style.display = 'none'
  empty.style.display = 'none'

  if (showAbout) {
    renderAboutContent(project, gallery)
  } else if (showIframe) {
    iframe.src = project.preview.src
    iframe.style.display = 'block'
  } else if (showVideo) {
    iframe.src = getVimeoEmbedUrl(project.preview.src)
    iframe.style.display = 'block'
  } else if (showGallery) {
    if (gallery) {
      // Build gallery content with optional long description and captions
      let galleryHTML = ''
      
      // Add long description if available
      if (project.longDescription) {
        galleryHTML += `
          <div class="gallery-description">
            <p>${project.longDescription}</p>
          </div>
        `
      }
      
      // Add images/videos with optional captions
      galleryHTML += `<div class="gallery-items">`
      galleryHTML += project.media.images
        .map(item => {
          // Handle both string format (backward compatibility) and object format {src, caption}
          const imgSrc = typeof item === 'string' ? item : item.src
          const caption = typeof item === 'string' ? '' : (item.caption || '')
          
          if (isVideoFile(imgSrc)) {
            return `
              <figure class="gallery-item">
                <video 
                  style="max-width: 100%; border: 1px solid var(--border); display: block;" 
                  controls
                  preload="metadata"
                >
                  <source src="${project.media.path}${imgSrc}" type="video/${imgSrc.split('.').pop()}">
                  Your browser does not support the video tag.
                </video>
                ${caption ? `<figcaption class="gallery-caption">${caption}</figcaption>` : ''}
              </figure>
            `
          }
          return `
            <figure class="gallery-item">
              <img src="${project.media.path}${imgSrc}" alt="${project.title}" style="max-width: 100%; border: 1px solid var(--border); display: block;">
              ${caption ? `<figcaption class="gallery-caption">${caption}</figcaption>` : ''}
            </figure>
          `
        })
        .join('')
      galleryHTML += `</div>`
      
      gallery.innerHTML = galleryHTML
      gallery.style.display = 'flex'
    }
  } else {
    empty.style.display = 'flex'
  }
}

function renderAboutContent(project, container) {
  if (!project.about) return
  
  const about = project.about
  let html = '<div class="about-content">'
  
  // Bio
  if (about.bio) {
    html += `<div class="about-section"><p class="about-bio">${about.bio}</p></div>`
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
  container.innerHTML = html
  container.style.display = 'flex'
}