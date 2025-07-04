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
<template>
    <div id="btn-toggle-container">
        <v-btn-toggle id="btn-toggle-wrapper" v-model="activeFilter" density="compact" mandatory>
            <v-btn value="all">All</v-btn>
            <v-btn value="creative">Creative</v-btn>
            <v-btn value="it">I.T.</v-btn>
        </v-btn-toggle>
    </div>
    <!-- Spotlight Card Section -->
    <v-expand-transition>
        <div v-if="spotlightProject" class="spotlight-wrapper">
            <ProjectCard :project="spotlightProject" :isSpotlight="true" />
            <v-btn class="remove-spotlight" @click="spotlightProject = null">Remove Spotlight</v-btn>
        </div>
    </v-expand-transition>

    <!-- Deck of Project Cards -->
    <div class="project-deck board">
        <div v-for="(project, index) in projects" :key="index" class="project-card-wrapper"
            :class="{ 'minified': spotlightProject }" @click="setSpotlight(project)">

            <v-expand-x-transition>
                <ProjectCard v-if="activeFilter === 'all' || project.type === activeFilter" :project="project" :isSpotlight="false" class="mx-auto deck-card"/>
            </v-expand-x-transition>
        </div>
    </div>
</template>

<style scoped>
/* Spotlight Wrapper */
.spotlight-wrapper {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 20px;
}

/* Minified Deck Cards */
.project-card-wrapper {
    display: flex;
    opacity: 1;
    aspect-ratio: 2/3;
    width: 200px;
    transition: opacity 0.3s ease-in-out, transform 0.2s ease, width .3s ease;
}

.project-card-wrapper.minified {
    opacity: 1;
    width: 100px;
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
    justify-content: center;
    width: 100%;
}
/* 
.v-card:not(.spotlight-card) {
    width: 150px;
} */
</style>