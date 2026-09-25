<script setup>
import { computed, ref, useId } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, required: true },
  autocomplete: { type: String, default: 'new-password' },
  error: { type: String, default: '' },
  showRequirements: { type: Boolean, default: false },
  hideLabel: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])

const id = useId()
const visible = ref(false)

const requirements = computed(() => [
  { label: 'At least 8 characters', met: props.modelValue.length >= 8 },
  { label: 'One uppercase letter', met: /[A-Z]/.test(props.modelValue) },
  { label: 'One lowercase letter', met: /[a-z]/.test(props.modelValue) },
  { label: 'One number', met: /\d/.test(props.modelValue) },
  { label: 'One special character (@$!%*?&#)', met: /[@$!%*?&#]/.test(props.modelValue) },
  { label: 'Only letters, numbers, and @$!%*?&#', met: /^[A-Za-z\d@$!%*?&#]*$/.test(props.modelValue) },
])
</script>

<template>
  <div>
    <label v-if="!hideLabel" :for="id" class="mb-1.5 block text-[13.5px] font-semibold text-navy">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="visible ? 'text' : 'password'"
        :value="modelValue"
        :autocomplete="autocomplete"
        required
        :aria-invalid="Boolean(error)"
        class="w-full rounded-2xl bg-navy/[0.04] px-3.5 py-2.5 pr-11 text-[15px] text-navy shadow-[inset_0_1px_2px_rgba(11,30,54,0.06)] transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan/50"
        :class="error ? 'bg-danger-bg/50 ring-2 ring-danger/40 focus:ring-danger/50' : ''"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button
        type="button"
        class="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted hover:text-navy"
        :aria-label="visible ? 'Hide password' : 'Show password'"
        @click="visible = !visible"
      >
        <svg v-if="visible" viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.4 5.2A10.6 10.6 0 0112 5c5 0 9 4.5 10 7-.4 1-1.2 2.4-2.4 3.7M6.4 6.4C4.4 7.8 2.9 9.7 2 12c1 2.5 5 7 10 7 1.4 0 2.7-.3 3.9-.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
    <p v-if="error" class="mt-1.5 text-[13px] text-danger">{{ error }}</p>

    <ul v-if="showRequirements" class="mt-2.5 grid grid-cols-1 gap-1 sm:grid-cols-2">
      <li
        v-for="req in requirements"
        :key="req.label"
        class="flex items-center gap-1.5 text-[12.5px]"
        :class="req.met ? 'text-cyan' : 'text-muted'"
      >
        <svg v-if="req.met" viewBox="0 0 20 20" class="h-3.5 w-3.5 shrink-0" fill="currentColor">
          <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
        </svg>
        <span v-else class="h-1 w-1 shrink-0 rounded-full bg-muted"></span>
        {{ req.label }}
      </li>
    </ul>
  </div>
</template>
