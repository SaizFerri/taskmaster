import './assets/base.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { useAuthStore } from '@/stores/auth'
import App from './App.vue'
import setupRouter from './router'

const app = createApp(App)

app.use(createPinia())

const authStore = useAuthStore()

if (import.meta.env.VITE_APP_MODE === 'offline') {
  setupApp()
} else {
  authStore.$subscribe((_, state) => {
    console.log(state)

    if (!state.isLoading) {
      setupApp()
    }
  })
}

function setupApp() {
  const router = setupRouter()
  app.use(router)
  app.mount('#app')
}
