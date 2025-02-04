import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';

const routes = [
  { path: '/', component: Projects },
  { path: '/projects', component: Projects }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;