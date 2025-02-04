// store/useProjectStore.js
import { defineStore } from 'pinia';
import projects from './projects.json';

export const useProjectStore = defineStore('projectStore', {
    state: () => ({
        projects: projects.map((project, index) => ({ id: index + 1, ...project })), // Compute ID dynamically
        filter: ''
    }),
    getters: {
        filteredProjects(state) {
            if (!state.filter) return state.projects;
            return state.projects.filter(p => p.tags.includes(state.filter));
        }
    },
    actions: {
        setFilter(tag) {
            this.filter = tag;
        }
    }
});
