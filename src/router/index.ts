import NotFound from '@/components/NotFound.vue'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const publicRoutes = ['/login', '/register']

const setupRouter = () => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },

      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      ...(import.meta.env.VITE_APP_MODE === 'online'
        ? [
            {
              path: '/register',
              name: 'register',
              component: RegisterView
            },
            {
              path: '/login',
              name: 'login',
              component: LoginView
            }
          ]
        : [])
    ]
  })

  router.beforeEach(async (to) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
      return '/login'
    }
  })

  return router
}

export default setupRouter
