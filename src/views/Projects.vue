<template>

    <!-- Spotlight Card Section -->
    <v-expand-transition>
        <div v-if="spotlightProject" class="spotlight-wrapper">
            <ProjectCard :project="spotlightProject" :isSpotlight="true" />
            <v-btn class="remove-spotlight" @click="spotlightProject = null">Remove Spotlight</v-btn>
        </div>
    </v-expand-transition>

    <!-- Deck of Project Cards -->
    <div id="btn-toggle-container">
        <v-btn-toggle id="btn-toggle-wrapper" v-model="activeFilter" density="compact" mandatory>
            <v-btn value="all">All</v-btn>
            <v-btn value="creative">Creative</v-btn>
            <v-btn value="it">I.T.</v-btn>
        </v-btn-toggle>
    </div>
    <div class="project-deck board">
        <div v-for="(project, index) in filteredProjects" :key="index" class="project-card-wrapper"
            :class="{ 'minified': spotlightProject }" @click="setSpotlight(project)">
            <ProjectCard :project="project" :isSpotlight="false" />

        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { useProjectStore } from '@/store/useProjectStore';

const activeFilter = ref("all");
const projectStore = useProjectStore();
const projects = ref(projectStore.projects);
const spotlightProject = ref(null);

const filteredProjects = computed(() => {
    if (activeFilter.value === "all") return projects.value;
    return projects.value.filter(project => project.type === activeFilter.value);
});

const setSpotlight = (project) => {
    spotlightProject.value = project;
};

// Remove the spotlighted project from the list
const nonSpotlightProjects = computed(() => {
    return filteredProjects.value.filter(project => project !== spotlightProject.value);
});
</script>
<style scoped>

/* Spotlight Wrapper */
.spotlight-wrapper {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 98px;
    gap: 20px;
}

/* Minified Deck Cards */
.project-card-wrapper {
    display: flex;
    opacity: 1;
    aspect-ratio: 2/3;
    transition: opacity 0.3s ease-in-out, transform 0.2s ease;
}

.project-card-wrapper.minified {
    opacity: 1;
    transform: scale(0.9);
}

/* Spotlight Animation */
.spotlight-enter-active,
.spotlight-leave-active {
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
}

.spotlight-enter-from,
.spotlight-leave-to {
    transform: scale(0.8);
    opacity: 0;
}

.remove-spotlight {
    margin-top: 10px;
    color: red;
    cursor: pointer;
}

#btn-toggle-wrapper {
    margin-top: 4rem;
    justify-content: center;
    width: 100%;
}
</style>