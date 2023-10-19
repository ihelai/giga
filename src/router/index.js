import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ArchivePage from '../views/ArchivePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/archive',
    name: 'Archive',
    component: ArchivePage,
  },
  {
    path: '/item/:id',
    name: 'HomeItemDetail',
    component: HomePage,
    props: true,
  },
  {
    path: '/archive/item/:id',
    name: 'ArchiveItemDetail',
    component: ArchivePage,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  base: '/giga'
  //, scrollBehavior() {
  //   return { top: 0 }
  // }
});


export default router;
