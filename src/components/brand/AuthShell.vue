<script setup>
import SkillConstellation from './SkillConstellation.vue'

defineProps({
  headline: { type: String, required: true },
  supporting: { type: String, required: true },
  // Only used for the register -> verify-otp sequence, which is a genuine
  // two-step flow — omit elsewhere.
  step: { type: Object, default: null }, // { current, total }
})

const stats = [
  { value: '1,200+', label: 'Jobs posted' },
  { value: '8,500+', label: 'Professionals' },
  { value: '300+', label: 'Companies hiring' },
]
</script>

<template>
  <div class="bg-water flex min-h-screen flex-col lg:flex-row">
    <!-- Brand column: sits directly on the water gradient, no panel edge -->
    <div class="relative flex shrink-0 flex-col justify-between px-8 py-8 text-paper lg:w-[42%] lg:px-14 lg:py-12">
      <router-link to="/login" class="relative z-10 flex items-center gap-2 font-display text-lg font-medium">
        <span class="flex h-7 w-7 items-center justify-center rounded-xl bg-gold text-sm font-semibold text-navy shadow-[0_0_22px_rgba(255,159,28,0.5)]">S</span>
        SkillHire
      </router-link>

      <!-- Constellation motif: decorative, desktop only -->
      <div class="relative z-0 my-10 hidden min-h-64 flex-1 lg:block">
        <SkillConstellation />
      </div>

      <div class="relative z-10 max-w-md">
        <div v-if="step" class="mb-4 flex items-center gap-1.5">
          <span
            v-for="n in step.total"
            :key="n"
            class="h-1.5 rounded-full transition-all"
            :class="n <= step.current ? 'w-6 bg-gold shadow-[0_0_10px_rgba(255,159,28,0.65)]' : 'w-1.5 bg-white/15'"
          />
          <span class="ml-1.5 text-[12.5px] text-muted-on-navy">Step {{ step.current }} of {{ step.total }}</span>
        </div>
        <h1 class="font-display text-[32px] leading-[1.12] font-medium tracking-tight text-paper lg:text-[40px]">
          {{ headline }}
        </h1>
        <p class="mt-3 text-[15.5px] leading-relaxed text-muted-on-navy">
          {{ supporting }}
        </p>

        <div v-if="!step" class="relative mt-7 hidden gap-6 pt-6 sm:flex">
          <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent blur-[0.5px]"></div>
          <div v-for="s in stats" :key="s.label">
            <p class="font-display text-[21px] font-medium text-gold">{{ s.value }}</p>
            <p class="mt-0.5 text-[12.5px] text-muted-on-navy">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form column: a frosted glass card floating on the same gradient -->
    <div class="flex flex-1 items-center justify-center px-6 py-12 sm:px-10">
      <div class="w-full max-w-[440px] rounded-[28px] bg-white/85 px-8 py-10 shadow-[0_30px_80px_-24px_rgba(5,15,30,0.65)] backdrop-blur-2xl sm:px-10">
        <slot />
      </div>
    </div>
  </div>
</template>
