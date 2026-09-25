<script setup>
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:right-4 sm:left-auto">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-[0_20px_45px_-15px_rgba(11,30,54,0.4)] backdrop-blur-xl"
      >
        <svg
          v-if="toast.type === 'error'"
          viewBox="0 0 20 20"
          class="mt-0.5 h-4 w-4 shrink-0 text-danger"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6a1 1 0 112 0v4a1 1 0 11-2 0V6zm1 8a1.1 1.1 0 100-2.2 1.1 1.1 0 000 2.2z"
            clip-rule="evenodd"
          />
        </svg>
        <svg v-else viewBox="0 0 20 20" class="mt-0.5 h-4 w-4 shrink-0 text-cyan" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="flex-1 text-[13.5px] text-navy">{{ toast.message }}</p>
        <button
          type="button"
          class="text-muted hover:text-navy"
          aria-label="Dismiss notification"
          @click="toastStore.dismiss(toast.id)"
        >
          <svg viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor">
            <path d="M10 8.6L14.6 4 16 5.4 11.4 10l4.6 4.6-1.4 1.4-4.6-4.6L5.4 16 4 14.6 8.6 10 4 5.4 5.4 4z" />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
