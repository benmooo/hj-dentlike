import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null as { id: string; name: string; email: string } | null)
  const accessToken = ref<string | null>(null)
  const isLoggedIn = computed(() => accessToken.value !== null)

  function login(userData: { id: string; name: string; email: string }, token: string) {
    user.value = userData
    accessToken.value = token
  }

  function logout() {
    user.value = null
    accessToken.value = null
  }

  return { isLoggedIn, user, authToken: accessToken, login, logout }
})
