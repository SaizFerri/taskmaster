<script setup lang="ts">
import { useForm } from '@/composables/useForm'
import { auth } from '@/lib/firebase'
import { RegisterSchema, type RegisterForm } from '@/lib/types'
import { createUserWithEmailAndPassword, type AuthError } from 'firebase/auth'
import { Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../ui/Button.vue'
import FormInput from '../ui/FormInput.vue'

const router = useRouter()
const { form, handleSubmit, update } = useForm<RegisterForm>(RegisterSchema)
const isLoading = ref(false)
const error = ref<string | undefined>()

const submit = handleSubmit(async ({ email, password }) => {
  isLoading.value = true
  error.value = undefined
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    router.push('/login')
  } catch (e) {
    error.value = (e as AuthError).message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <form
    class="flex flex-col gap-4"
    @submit.prevent="submit"
    @input="
      update(
        ($event.target as HTMLInputElement).name as keyof RegisterForm,
        ($event.target as HTMLInputElement).value
      )
    "
  >
    <FormInput
      id="email"
      name="email"
      label="E-mail"
      :field="form.email"
      placeholder="john@doe.com"
    />
    <FormInput
      id="password"
      name="password"
      label="Password"
      :field="form.password"
      placeholder="******"
      type="password"
    />
    <Button :disabled="isLoading" class="text-center">
      <Loader2 v-if="isLoading" class="inline animate-spin text-foreground-button" />
      <template v-if="!isLoading">Register</template>
    </Button>
    <span v-if="error" class="text-xs text-red-600">{{ error }}</span>
  </form>
</template>
