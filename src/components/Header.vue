<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { useAuthStore } from '@/stores/auth'
import { Notebook } from 'lucide-vue-next'
import { RouterLink, useRouter } from 'vue-router'

const showAuth = import.meta.env.VITE_APP_MODE === 'online'
const authStore = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="fixed z-20 flex h-[72px] w-full items-center bg-white px-4">
    <div class="mx-auto w-full lg:container">
      <div class="flex items-center justify-between">
        <RouterLink to="/" class="text-black hover:no-underline">
          <h1 class="flex items-center gap-1">
            <Notebook aria-hidden />
            <span class="text-xl font-bold sm:text-2xl">TaskMaster</span>
          </h1>
        </RouterLink>
        <div v-if="showAuth">
          <Button v-if="!authStore.isAuthenticated" :as="RouterLink" to="/login">Log in</Button>
          <Button v-if="authStore.isAuthenticated" variant="secondary" @click="handleLogout"
            >Log out</Button
          >
        </div>
      </div>
    </div>
  </header>
</template>
