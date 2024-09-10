<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
import { useAuthStore } from '@/stores/auth'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    router.replace('/')
  }
})
</script>

<template>
  <main class="container mx-auto flex justify-center">
    <div class="max-w-[480px] rounded-md bg-white p-4 sm:min-w-[480px]">
      <h1 class="mb-6 mt-2 text-center text-xl font-bold">Log in</h1>
      <LoginForm />
      <div class="mt-4 text-sm text-slate-700">
        Don't have an account yet? <RouterLink to="/register">Register</RouterLink>
      </div>
    </div>
  </main>
</template>
