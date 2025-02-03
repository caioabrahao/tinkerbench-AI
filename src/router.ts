// filepath: /d:/Área de Trabalho/tinkerbench-AI/src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import IdeaGenV1 from './views/IdeaGenV1.vue';
import IdeaGenV2 from './views/IdeaGenV2.vue';
import NotFoundPage from './views/404NotFound.vue';

const routes = [
  { path: '/', component: IdeaGenV2 },
  { path: '/:notFound', component: NotFoundPage },
  { path: '/v1', component: IdeaGenV1 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;