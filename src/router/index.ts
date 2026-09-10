import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArchiveView from '@/views/ArchiveView.vue'
import SurveyView from '@/views/SurveyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveView,
    },
    // {
    //   path: '/questionario',
    //   name: 'survey',
    //   component: SurveyView
    // }
  ],
})

export default router
