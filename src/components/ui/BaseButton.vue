<script setup>
defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' }, // primary | ghost | link
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: true },
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-semibold transition-all duration-150 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
    :class="[
      block ? 'w-full' : '',
      variant === 'primary' &&
        'bg-navy text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_32px_-12px_rgba(11,30,54,0.6)] hover:bg-navy-soft hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_36px_-10px_rgba(0,180,216,0.4)] focus-visible:ring-2 focus-visible:ring-gold/70',
      variant === 'ghost' &&
        'bg-navy/5 text-navy hover:bg-navy/10 focus-visible:ring-2 focus-visible:ring-cyan/50',
      variant === 'link' &&
        'w-auto! px-0 py-0 text-cyan hover:text-navy underline-offset-4 hover:underline',
    ]"
  >
    <svg
      v-if="loading"
      class="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
      <path
        class="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
    <slot />
  </button>
</template>
