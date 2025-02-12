// components/Projects.vue
<template>
    <v-container class="project-deck board">
        <div v-for="(project, index) in projects" :key="index" class="project-card-wrapper">
            <ProjectCard :project="project" />
        </div>
    </v-container>
</template>

<script setup>
import ProjectCard from '@/components/ProjectCard.vue';
import { useProjectStore } from '@/store/useProjectStore';
import { computed } from 'vue';

const projectStore = useProjectStore();
const projects = computed(() => projectStore.projects);
</script>

<style scoped>
.project-card-wrapper {
    aspect-ratio: 2/3;

    width: 300px;
    height: 460px;
}
</style>
<style>
</style>