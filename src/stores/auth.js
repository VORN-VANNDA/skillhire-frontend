import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import * as authApi from '@/api/auth'
import { registerTokenGetter, registerUnauthorizedHandler } from '@/api/client'
import { roleHome, roleName } from '@/constants/roles'

const TOKEN_KEY = 'skillhire_token'
const USER_KEY = 'skillhire_user'

function loadUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) || '')
  const user = ref(loadUser())
  const loading = ref(false)

  const isAuthenticated = computed(() => Boolean(token.value))
  const roleId = computed(() => user.value?.role_id ?? null)
  const roleLabel = computed(() => roleName(roleId.value))
  const homePath = computed(() => roleHome(roleId.value))

  function persist() {
    if (token.value) {
      localStorage.setItem(TOKEN_KEY, token.value)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
    if (user.value) {
      localStorage.setItem(USER_KEY, JSON.stringify(user.value))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }

  function setSession({ token: newToken, ...userFields }) {
    token.value = newToken
    user.value = userFields
    persist()
  }

  function clearSession() {
    token.value = ''
    user.value = null
    persist()
  }

  async function withLoading(fn) {
    loading.value = true
    try {
      return await fn()
    } finally {
      loading.value = false
    }
  }

  // ---- actions, one per backend endpoint -------------------------------

  function register(payload) {
    return withLoading(() => authApi.register(payload))
  }

  function verifyOtp(payload) {
    return withLoading(() => authApi.verifyOtp(payload))
  }

  function resendOtp(payload) {
    return withLoading(() => authApi.resendOtp(payload))
  }

  async function login(payload) {
    return withLoading(async () => {
      const { data } = await authApi.login(payload)
      setSession(data)
      return data
    })
  }

  async function logout() {
    return withLoading(async () => {
      try {
        await authApi.logout()
      } finally {
        clearSession()
      }
    })
  }

  async function fetchMe() {
    return withLoading(async () => {
      const { data } = await authApi.getMe()
      user.value = { ...user.value, ...data }
      persist()
      return data
    })
  }

  function changePassword(payload) {
    return withLoading(() => authApi.changePassword(payload))
  }

  function forgotPassword(payload) {
    return withLoading(() => authApi.forgotPassword(payload))
  }

  function verifyResetOtp(payload) {
    return withLoading(() => authApi.verifyResetOtp(payload))
  }

  function resetPassword(payload) {
    return withLoading(() => authApi.resetPassword(payload))
  }

  function setupCompanyAccount(payload) {
    return withLoading(() => authApi.setupCompanyAccount(payload))
  }

  // The axios client needs to read the current token without importing
  // this store at module-eval time (that would be circular), so it asks
  // for a getter instead. A 401 from anywhere clears the session.
  registerTokenGetter(() => token.value)
  registerUnauthorizedHandler(() => clearSession())

  return {
    token,
    user,
    loading,
    isAuthenticated,
    roleId,
    roleLabel,
    homePath,
    register,
    verifyOtp,
    resendOtp,
    login,
    logout,
    fetchMe,
    changePassword,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    setupCompanyAccount,
    clearSession,
  }
})
