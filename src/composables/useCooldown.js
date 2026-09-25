import { onUnmounted, ref } from 'vue'

export function useCooldown(seconds = 30) {
  const remaining = ref(0)
  let timer = null

  function start() {
    remaining.value = seconds
    clearInterval(timer)
    timer = setInterval(() => {
      remaining.value -= 1
      if (remaining.value <= 0) clearInterval(timer)
    }, 1000)
  }

  onUnmounted(() => clearInterval(timer))

  return { remaining, start }
}
