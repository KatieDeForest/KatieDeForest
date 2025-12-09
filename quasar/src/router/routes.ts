import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ErrorNotFoundPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/gallery',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CollectionPage.vue') }],
  },
  {
    path: '/gallery/:collection',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/GalleryPage.vue') }],
  },
  {
    path: '/tags/:slug',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TagGalleryPage.vue') }],
  },
  {
    path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AboutPage.vue') }],
  },
  {
    path: '/contact',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ContactPage.vue') }],
  },
  {
    path: '/services',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ServicesPage.vue') }],
  },
  {
    path: '/privacy',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PrivacyPage.vue') }],
  },
  {
    path: '/terms',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TermsPage.vue') }],
  },
];

export default routes;
