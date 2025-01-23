// filepath: /d:/Área de Trabalho/tinkerbench-AI/src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import IdeaGenV1 from './views/IdeaGenV1.vue';
import NotFoundPage from './views/404NotFound.vue';

const routes = [
  { path: '/', component: IdeaGenV1 },
  { path: '/:notFound', component: NotFoundPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;