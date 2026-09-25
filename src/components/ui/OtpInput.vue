<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  length: { type: Number, default: 6 },
  error: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue', 'complete'])

const boxes = ref(Array.from({ length: props.length }, (_, i) => props.modelValue[i] || ''))
const inputs = ref([])

watch(
  () => props.modelValue,
  (val) => {
    const next = Array.from({ length: props.length }, (_, i) => val[i] || '')
    if (next.join('') !== boxes.value.join('')) {
      boxes.value = next
    }
  },
)

function emitValue() {
  const value = boxes.value.join('')
  emit('update:modelValue', value)
  if (value.length === props.length) emit('complete', value)
}

function onInput(index, event) {
  const digits = event.target.value.replace(/\D/g, '')
  if (!digits) {
    boxes.value[index] = ''
    emitValue()
    return
  }
  // Handles a fast typist landing multiple digits in one box.
  const chars = digits.split('')
  chars.forEach((char, offset) => {
    const target = index + offset
    if (target < props.length) boxes.value[target] = char
  })
  emitValue()
  const nextIndex = Math.min(index + chars.length, props.length - 1)
  nextTick(() => inputs.value[nextIndex]?.focus())
}

function onKeydown(index, event) {
  if (event.key === 'Backspace' && !boxes.value[index] && index > 0) {
    boxes.value[index - 1] = ''
    emitValue()
    nextTick(() => inputs.value[index - 1]?.focus())
  } else if (event.key === 'ArrowLeft' && index > 0) {
    inputs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < props.length - 1) {
    inputs.value[index + 1]?.focus()
  }
}

function onPaste(event) {
  const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, props.length)
  if (!digits) return
  event.preventDefault()
  boxes.value = Array.from({ length: props.length }, (_, i) => digits[i] || '')
  emitValue()
  const lastIndex = Math.min(digits.length, props.length - 1)
  nextTick(() => inputs.value[lastIndex]?.focus())
}
</script>

<template>
  <div>
    <div class="flex gap-2.5" @paste="onPaste">
      <input
        v-for="(digit, index) in boxes"
        :key="index"
        :ref="(el) => (inputs[index] = el)"
        :value="digit"
        inputmode="numeric"
        autocomplete="one-time-code"
        maxlength="1"
        class="h-12 w-10 rounded-2xl bg-navy/[0.04] text-center text-xl font-semibold text-navy shadow-[inset_0_1px_2px_rgba(11,30,54,0.06)] [font-variant-numeric:tabular-nums] transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan/50 sm:h-14 sm:w-12"
        :class="error ? 'bg-danger-bg/50 ring-2 ring-danger/40' : ''"
        @input="onInput(index, $event)"
        @keydown="onKeydown(index, $event)"
      />
    </div>
    <p v-if="error" class="mt-2 text-[13px] text-danger">{{ error }}</p>
  </div>
</template>
