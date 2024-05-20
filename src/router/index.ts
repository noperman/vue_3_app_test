import { authStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout Admin',
      component: () => import('../views/layout/Admin.vue'),
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/pages/DashboardView.vue')
        },
        {
          path: 'bank-master',
          name: 'Bank Master',
          component: () => import('../views/pages/BankMasterView.vue'),
        }
      ]
    }, {
      path: '/auth',
      name: 'Auth',
      component: () => import('../views/pages/AuthView.vue')
    },
  ]
})

const exceludeRouteGard = ["Auth"];
router.beforeEach((to, from) => {
  if (!authStore().data.isLoggedin && !exceludeRouteGard.includes(to.name as string)) return { name: 'Auth' }
});

export default router
