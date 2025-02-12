import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';
import Contact from '../views/Contact.vue';

const routes = [
  { path: '/', component: Projects },
  { path: '/projects', component: Projects },
  { path: '/contact', component: Contact }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;