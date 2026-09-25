<script setup>
// A loose map of skill tags converging on one matched role — the visual
// shorthand for "skills-based matching" carried through the brand panel.
const tags = [
  { label: 'Node.js', x: 12, y: 18 },
  { label: 'Product design', x: 52, y: 10 },
  { label: 'SQL', x: 8, y: 54 },
  { label: 'Data analysis', x: 27, y: 80 },
  { label: 'Copywriting', x: 86, y: 16 },
  { label: 'Project management', x: 58, y: 88 },
]
const target = { x: 80, y: 56 }
</script>

<template>
  <div class="relative h-full w-full">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient
          v-for="(tag, i) in tags"
          :key="`grad-${i}`"
          :id="`flow-${i}`"
          gradientUnits="userSpaceOnUse"
          :x1="tag.x"
          :y1="tag.y"
          :x2="target.x"
          :y2="target.y"
        >
          <stop offset="0%" stop-color="var(--color-cyan)" stop-opacity="0.05" />
          <stop offset="100%" stop-color="var(--color-cyan)" stop-opacity="0.6" />
        </linearGradient>
      </defs>
      <line
        v-for="(tag, i) in tags"
        :key="tag.label"
        :x1="tag.x"
        :y1="tag.y"
        :x2="target.x"
        :y2="target.y"
        :stroke="`url(#flow-${i})`"
        stroke-width="0.2"
      />
    </svg>

    <span
      v-for="tag in tags"
      :key="tag.label"
      class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-1 text-[12.5px] whitespace-nowrap text-muted-on-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md"
      :style="{ left: tag.x + '%', top: tag.y + '%' }"
    >
      {{ tag.label }}
    </span>

    <span
      class="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[12.5px] font-semibold whitespace-nowrap text-navy shadow-[0_0_32px_rgba(255,159,28,0.6)]"
      :style="{ left: target.x + '%', top: target.y + '%' }"
    >
      <svg viewBox="0 0 20 20" class="h-3.5 w-3.5" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z"
          clip-rule="evenodd"
        />
      </svg>
      Matched
    </span>
  </div>
</template>
