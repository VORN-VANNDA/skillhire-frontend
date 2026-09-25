import { ref } from 'vue'
import { defineStore } from 'pinia'

let nextId = 1

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  function push(message, { type = 'success', timeout = 5000 } = {}) {
    const id = nextId++
    toasts.value.push({ id, message, type })
    if (timeout) {
      setTimeout(() => dismiss(id), timeout)
    }
    return id
  }

  function dismiss(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  const success = (message) => push(message, { type: 'success' })
  const error = (message) => push(message, { type: 'error' })

  return { toasts, push, dismiss, success, error }
})
