<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  autocomplete: { type: String, default: 'off' },
  placeholder: { type: String, default: '' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])

const id = useId()
const describedBy = computed(() => {
  if (props.error) return `${id}-error`
  if (props.hint) return `${id}-hint`
  return undefined
})
</script>

<template>
  <div>
    <label :for="id" class="mb-1.5 block text-[13.5px] font-semibold text-navy">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      :aria-invalid="Boolean(error)"
      :aria-describedby="describedBy"
      class="w-full rounded-2xl bg-navy/[0.04] px-3.5 py-2.5 text-[15px] text-navy placeholder:text-muted/70 shadow-[inset_0_1px_2px_rgba(11,30,54,0.06)] transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan/50"
      :class="error ? 'bg-danger-bg/50 ring-2 ring-danger/40 focus:ring-danger/50' : ''"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" :id="`${id}-error`" class="mt-1.5 text-[13px] text-danger">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="`${id}-hint`" class="mt-1.5 text-[13px] text-muted">
      {{ hint }}
    </p>
  </div>
</template>
