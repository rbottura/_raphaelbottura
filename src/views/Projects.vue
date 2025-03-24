<template>
    <div id="btn-toggle-wrapper">
        <v-btn-toggle v-model="activeFilter" density="compact" mandatory>
            <v-btn value="all">All</v-btn>
            <v-btn value="creative">Creative</v-btn>
            <v-btn value="it">IT</v-btn>
        </v-btn-toggle>
    </div>
    <div class="project-deck board">
        <div v-for="(project, index) in filteredProjects" :key="index" class="project-card-wrapper">
            <ProjectCard :project="project" />
        </div>
    </div>
</template>

<script setup>
import ProjectCard from '@/components/ProjectCard.vue';
import { useProjectStore } from '@/store/useProjectStore';
import { ref, computed } from 'vue';

const activeFilter = ref("all"); // Reactive filter state
const projectStore = useProjectStore();
const projects = ref(projectStore.projects)
const filteredProjects = computed(() => {
    // projectStore.projects;
    if (activeFilter.value === "all") return projects.value;
    return projects.value.filter(project => project.type === activeFilter.value);
});
console.log(ref(projectStore.projects))

</script>
<style scoped>

#btn-toggle-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}
</style>
<style>
</style>