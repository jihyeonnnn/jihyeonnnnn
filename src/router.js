import { createWebHistory, createRouter } from "vue-router";
import Iaas from './components/Iaas'

const routes = [
  {
    path: "/iaas",
    component: Iaas,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 