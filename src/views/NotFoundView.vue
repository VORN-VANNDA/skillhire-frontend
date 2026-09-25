<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <div class="bg-water-light flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <p class="bg-gradient-to-br from-navy via-navy-soft to-cyan bg-clip-text font-display text-[64px] font-medium leading-none text-transparent">404</p>
    <h1 class="mt-3 text-[20px] font-semibold text-navy">This page doesn't exist.</h1>
    <p class="mt-1.5 max-w-sm text-[14.5px] text-muted">
      Double-check the link, or head back to sign in.
    </p>
    <router-link to="/login" class="mt-6">
      <BaseButton :block="false">Go to sign in</BaseButton>
    </router-link>
  </div>
</template>
