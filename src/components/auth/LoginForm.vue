<script setup lang="ts">
import { useForm } from '@/composables/useForm'
import { auth } from '@/lib/firebase'
import { RegisterSchema, type RegisterForm } from '@/lib/types'
import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth'
import { Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../ui/Button.vue'
import FormInput from '../ui/FormInput.vue'
import { useAuthStore } from '@/stores/auth'

const { onLogin } = useAuthStore()
const router = useRouter()
const { form, handleSubmit } = useForm<RegisterForm>(RegisterSchema)
const isLoading = ref(false)
const error = ref<string | undefined>()

const submit = handleSubmit(async ({ email, password }) => {
  isLoading.value = true
  error.value = undefined
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    onLogin(userCredentials.user)
    router.push('/')
  } catch (e) {
    console.log({ e })
    error.value = (e as AuthError).message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="submit">
    <FormInput id="email" label="E-mail" :field="form.email" />
    <FormInput id="password" label="Password" :field="form.password" type="password" />
    <Button :disabled="isLoading" class="text-center">
      <Loader2 v-if="isLoading" class="inline animate-spin text-foreground-button" />
      <template v-if="!isLoading">Log in</template>
    </Button>
    <span v-if="error" class="text-xs text-red-600">{{ error }}</span>
  </form>
</template>
