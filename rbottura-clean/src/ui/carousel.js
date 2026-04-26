let currentCarousel = null

function isVideoFile(filename) {
  return /\.(mp4|webm|ogg|mov|avi)$/i.test(filename)
}

export function openCarousel(projectId, initialIndex, projects) {
  const project = findProjectById(projects, projectId)
  if (!project || !project.media?.images) return

  currentCarousel = {
    projectId,
    currentIndex: initialIndex,
    images: project.media.images,
    mediaPath: project.media.path
  }

  const modal = document.getElementById('carouselModal')
  const carousel = document.getElementById('carouselViewer')

  // Build slides HTML
  carousel.innerHTML = currentCarousel.images
    .map((img, idx) => {
      if (isVideoFile(img)) {
        return `
          <div class="carousel-slide" data-idx="${idx}">
            <video controls preload="metadata">
              <source src="${currentCarousel.mediaPath}${img}" type="video/${img.split('.').pop()}">
              Your browser does not support the video tag.
            </video>
          </div>
        `
      }
      return `
        <div class="carousel-slide" data-idx="${idx}">
          <img src="${currentCarousel.mediaPath}${img}" alt="slide ${idx + 1}">
        </div>
      `
    })
    .join('')

  modal.classList.add('open')
  document.body.style.overflow = 'hidden'
  updateCarouselPosition()

  // Add keyboard support
  document.addEventListener('keydown', handleCarouselKeydown)
}

function findProjectById(projects, id) {
  for (const section of projects.sections) {
    const found = section.projects.find(p => p.id === id)
    if (found) return found
  }
  return null
}

function updateCarouselPosition() {
  const carousel = document.getElementById('carouselViewer')
  const slideWidth = carousel.parentElement.offsetWidth
  carousel.style.transform = `translateX(-${currentCarousel.currentIndex * slideWidth}px)`
}

export function closeCarousel() {
  const modal = document.getElementById('carouselModal')
  modal.classList.remove('open')
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleCarouselKeydown)
  currentCarousel = null
}

export function nextSlide() {
  if (!currentCarousel) return
  if (currentCarousel.currentIndex < currentCarousel.images.length - 1) {
    currentCarousel.currentIndex++
    updateCarouselPosition()
  }
}

export function prevSlide() {
  if (!currentCarousel) return
  if (currentCarousel.currentIndex > 0) {
    currentCarousel.currentIndex--
    updateCarouselPosition()
  }
}

function handleCarouselKeydown(e) {
  if (e.key === 'ArrowRight') {
    nextSlide()
  } else if (e.key === 'ArrowLeft') {
    prevSlide()
  } else if (e.key === 'Escape') {
    closeCarousel()
  }
}

// Touch/swipe support
let touchStartX = 0
let touchStartY = 0
let touchEndX = 0
let touchEndY = 0
let isSwiping = false

export function setupCarouselTouchSupport() {
  const modal = document.getElementById('carouselModal')
  const viewport = document.querySelector('.carousel-viewport')
  const viewer = document.getElementById('carouselViewer')
  const container = document.querySelector('.carousel-container')
  if (!viewport || !viewer || !container) return

  // Close on outside click (modal background only) and prevent event propagation
  modal.addEventListener('click', (e) => {
    e.stopPropagation()
    if (e.target === modal) {
      closeCarousel()
      return
    }
  })

  // Prevent clicks on container from bubbling to modal background
  container.addEventListener('click', (e) => {
    e.stopPropagation()
  })

  // Swipe/drag support on carousel slides
  viewer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX
    touchStartY = e.changedTouches[0].screenY
    isSwiping = false
  }, false)

  viewer.addEventListener('touchmove', (e) => {
    const currentX = e.changedTouches[0].screenX
    const currentY = e.changedTouches[0].screenY
    const distX = Math.abs(currentX - touchStartX)
    const distY = Math.abs(currentY - touchStartY)

    // If moved more than 10px horizontally, it's a swipe
    // Only set swiping if horizontal movement is more than vertical
    if (distX > 10 && distX > distY) {
      isSwiping = true
    }
  }, false)

  viewer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX
    touchEndY = e.changedTouches[0].screenY

    // Only handle swipe if significant horizontal movement (and more than vertical)
    const distX = Math.abs(touchEndX - touchStartX)
    const distY = Math.abs(touchEndY - touchStartY)
    
    if (isSwiping && distX > distY) {
      handleSwipe()
    } else if (!isSwiping && distX < 10 && distY < 10) {
      // Simple tap on slide (no movement at all) - close carousel
      const slide = e.target.closest('.carousel-slide')
      if (slide) {
        closeCarousel()
      }
    }
    isSwiping = false
  }, false)

  // Mouse support for desktop
  viewer.addEventListener('mousedown', (e) => {
    touchStartX = e.screenX
    touchStartY = e.screenY
    isSwiping = false
  })

  viewer.addEventListener('mousemove', (e) => {
    const currentX = e.screenX
    const currentY = e.screenY
    const distX = Math.abs(currentX - touchStartX)
    const distY = Math.abs(currentY - touchStartY)

    // If moved more than 10px horizontally (and more than vertically), it's a drag
    if (distX > 10 && distX > distY) {
      isSwiping = true
    }
  })

  viewer.addEventListener('mouseup', (e) => {
    touchEndX = e.screenX
    
    const distX = Math.abs(touchEndX - touchStartX)
    const distY = Math.abs(e.screenY - touchStartY)

    // Only handle swipe if significant horizontal movement (and more than vertical)
    if (isSwiping && distX > distY) {
      handleSwipe()
    } else if (!isSwiping && distX < 10 && distY < 10) {
      // Simple click on slide (no movement at all) - close carousel
      const slide = e.target.closest('.carousel-slide')
      if (slide) {
        closeCarousel()
      }
    }
    isSwiping = false
  })
}

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide() // swiped left, go to next
    } else {
      prevSlide() // swiped right, go to previous
    }
  }
}
