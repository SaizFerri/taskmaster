import './assets/base.css'

import { createPinia } from 'pinia'
import { createApp, nextTick } from 'vue'

import { useAuthStore } from '@/stores/auth'
import App from './App.vue'
import setupRouter from './router'

const app = createApp(App)

app.use(createPinia())

const authStore = useAuthStore()

if (import.meta.env.VITE_APP_MODE === 'offline') {
  setupApp()
} else {
  authStore.$subscribe(
    (_, state) => {
      if (!state.isLoading) {
        setupApp()
      }
    },
    { once: true }
  )
}

function setupApp() {
  const router = setupRouter()
  app.use(router)
  nextTick(() => {
    app.mount('#app')
  })
}
