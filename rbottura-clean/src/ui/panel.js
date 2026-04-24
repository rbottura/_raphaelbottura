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
  const hasIframe = project.preview?.type === 'iframe' && project.preview?.src
  const hasVideo = project.preview?.type === 'video' && project.preview?.src
  const hasGallery = project.media?.images && project.media.images.length > 0

  // Determine what to show based on preview mode
  let showIframe = false
  let showVideo = false
  let showGallery = false

  if (state.previewMode === 'iframe' && hasIframe) {
    showIframe = true
  } else if (state.previewMode === 'video' && hasVideo) {
    showVideo = true
  } else if (state.previewMode === 'gallery' && hasGallery) {
    showGallery = true
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

  if (showIframe) {
    iframe.src = project.preview.src
    iframe.style.display = 'block'
  } else if (showVideo) {
    iframe.src = getVimeoEmbedUrl(project.preview.src)
    iframe.style.display = 'block'
  } else if (showGallery) {
    if (gallery) {
      gallery.innerHTML = project.media.images
        .map(img => {
          if (isVideoFile(img)) {
            return `
              <video 
                style="max-width: 100%; border: 1px solid var(--border); display: block;" 
                controls
                preload="metadata"
              >
                <source src="${project.media.path}${img}" type="video/${img.split('.').pop()}">
                Your browser does not support the video tag.
              </video>
            `
          }
          return `<img src="${project.media.path}${img}" alt="${project.title}" style="max-width: 100%; border: 1px solid var(--border); display: block;">`
        })
        .join('')
      gallery.style.display = 'flex'
    }
  } else {
    empty.style.display = 'flex'
  }
}