import { auth } from '@/lib/firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

type BaseUser = { uid: string }
type AuthStore = {
  user: Ref<BaseUser | undefined>
  isAuthenticated: Ref<boolean>
  isLoading: Ref<boolean>
  onLogin(userInfo: BaseUser): void
  logout(): void
}

const useFirebaseAuthStore = defineStore('auth', (): AuthStore => {
  const user = ref<User | undefined>()
  const isLoading = ref(true)
  const isAuthenticated = ref(false)

  onAuthStateChanged(auth, async (userInfo) => {
    onReady(userInfo)
  })

  function onLogin(userInfo: User) {
    isAuthenticated.value = true
    user.value = userInfo
  }

  function onReady(userInfo: User | null) {
    if (userInfo) {
      isAuthenticated.value = true
      user.value = userInfo
    } else {
      isAuthenticated.value = false
      user.value = undefined
    }
    isLoading.value = false
  }

  async function logout() {
    await auth.signOut()
    isAuthenticated.value = false
    user.value = undefined
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    onLogin,
    logout
  }
})

const useNoAuthStore = defineStore('auth', (): AuthStore => {
  const user = ref({ uid: 'local' })
  const isLoading = ref(false)
  const isAuthenticated = ref(true)

  async function logout() {
    noop()
  }

  function onLogin() {
    noop()
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    onLogin,
    logout
  }
})

function noop() {
  return void 0
}

const useAuthStore =
  import.meta.env.VITE_APP_MODE === 'online' ? useFirebaseAuthStore : useNoAuthStore

export { useAuthStore }
