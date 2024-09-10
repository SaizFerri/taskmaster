<script setup lang="ts">
import RegisterForm from '@/components/auth/RegisterForm.vue'
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
      <h1 class="mb-6 mt-2 text-center text-xl font-bold">Create an account</h1>
      <RegisterForm />
      <div class="mt-4 text-sm text-slate-700">
        Already have an account? <RouterLink to="/login">Login</RouterLink>
      </div>
    </div>
  </main>
</template>
