// components/Projects.vue
<template>
    <div class="project-deck">
        <div v-for="(project, index) in projects" :key="index" class="project-card-wrapper">
            <ProjectCard :project="project" />
        </div>
    </div>
</template>

<script setup>
import ProjectCard from '@/components/ProjectCard.vue';
import { useProjectStore } from '@/store/useProjectStore';
import { computed } from 'vue';

const projectStore = useProjectStore();
const projects = computed(() => projectStore.projects);
</script>

<style scoped>
.project-deck {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem;
    padding: 1rem;
    margin: 5rem 0rem;
}

.project-card-wrapper {
    aspect-ratio: 2/3;

    width: 300px;
    /* Maintain 2:3 ratio, max height 100vh */
    height: 450px;
}
</style>
