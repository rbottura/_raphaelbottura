import './style.css'
import projects from './data/projects.json'

import { renderProjectList } from './ui/projectList'
import { setupPanel } from './ui/panel'

const state = {
  activeId: null,
  projects
}

renderProjectList(state)
setupPanel(state)