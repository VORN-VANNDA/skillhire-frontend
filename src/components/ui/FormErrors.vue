<script setup>
defineProps({
  errors: { type: Array, default: () => [] },
})
</script>

<template>
  <div
    v-if="errors.length"
    role="alert"
    class="rounded-2xl bg-danger-bg px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
  >
    <p v-if="errors.length === 1" class="text-[13.5px] text-danger">{{ errors[0] }}</p>
    <ul v-else class="list-disc space-y-0.5 pl-4 text-[13.5px] text-danger">
      <li v-for="(message, i) in errors" :key="i">{{ message }}</li>
    </ul>
  </div>
</template>
