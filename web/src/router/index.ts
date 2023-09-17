import { createRouter, createWebHistory } from 'vue-router'
import HomeViewVue from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewVue
    },
    {
      path: '/add-sheet',
      name: 'add-sheet',
      component: () => import('@/views/AddSheetView.vue')
    },
    {
      path: '/sheet/:id',
      name: 'sheet-detail',
      component: () => import('@/views/SheetDetailView.vue')
    },
    {
      path: '/sheet/:id/add-item',
      name: 'add-item',
      component: () => import('@/views/AddItemView.vue')
    }
  ]
})

export default router
