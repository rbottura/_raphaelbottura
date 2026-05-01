/**
 * Theme management module
 * Handles dark mode toggle with localStorage persistence
 */

const THEME_KEY = 'theme-preference'
const DARK_MODE_CLASS = 'dark-mode'
const LIGHT_MODE_CLASS = 'light-mode'

/**
 * Get the system's preferred color scheme
 */
function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Get the user's saved theme preference from localStorage
 */
function getSavedPreference() {
  return localStorage.getItem(THEME_KEY)
}

/**
 * Determine which theme to use
 */
function getEffectiveTheme() {
  const saved = getSavedPreference()
  if (saved) {
    return saved
  }
  return getSystemPreference()
}

/**
 * Apply theme to the document
 */
function applyTheme(theme) {
  const html = document.documentElement
  
  if (theme === 'dark') {
    html.classList.add(DARK_MODE_CLASS)
    html.classList.remove(LIGHT_MODE_CLASS)
  } else {
    html.classList.remove(DARK_MODE_CLASS)
    html.classList.add(LIGHT_MODE_CLASS)
  }
  
  updateToggleButton(theme)
}

/**
 * Update the toggle button text
 */
function updateToggleButton(theme) {
  const toggle = document.getElementById('themeToggle')
  if (toggle) {
    toggle.textContent = theme === 'dark' ? 'Light' : 'Dark'
    toggle.classList.toggle('active', theme === 'dark')
  }
}

/**
 * Toggle between light and dark mode
 */
function toggleTheme() {
  const current = getEffectiveTheme()
  const newTheme = current === 'dark' ? 'light' : 'dark'
  
  localStorage.setItem(THEME_KEY, newTheme)
  applyTheme(newTheme)
}

/**
 * Initialize theme system
 */
export function setupTheme() {
  // Apply the effective theme on page load
  const theme = getEffectiveTheme()
  applyTheme(theme)
  
  // Setup toggle button listener
  const toggle = document.getElementById('themeToggle')
  if (toggle) {
    toggle.addEventListener('click', toggleTheme)
  }
  
  // Listen for system theme changes
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  darkModeQuery.addEventListener('change', (e) => {
    // Only update if user hasn't set a preference
    if (!getSavedPreference()) {
      applyTheme(e.matches ? 'dark' : 'light')
    }
  })
}
