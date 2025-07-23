import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '../views/AboutView.vue'  
import EvenDetailView from '@/views/EventDetailView.vue'


import StudentListView from '@/views/StudentListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({page: parseInt(route.query.page?.toString() || '1'),}),
    },
    {
      path: '/events/:id',
      name: 'event-detail-view',
      component: EvenDetailView,
      props: true, 
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/students',
      name: 'students',
      component: StudentListView,
    },
  ],
})

export default router
