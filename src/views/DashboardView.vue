<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppShell from '@/components/brand/AppShell.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const refreshing = ref(true)

onMounted(async () => {
  try {
    await auth.fetchMe()
  } catch {
    // The response interceptor already cleared the session on a 401;
    // this just gets the user off a now-stale authenticated page.
    router.push({ name: 'login' })
  } finally {
    refreshing.value = false
  }
})
</script>

<template>
  <AppShell>
    <h1 class="font-display text-[28px] font-medium text-navy">
      Welcome{{ auth.user?.email ? ',' : '' }}
      <span v-if="auth.user?.email">{{ auth.user.email.split('@')[0] }}</span>
    </h1>
    <p class="mt-1.5 text-[14.5px] text-muted">This is the authenticated sample screen — profile and job features come next.</p>

    <div class="mt-8 max-w-md rounded-[20px] bg-white/70 p-6 shadow-[0_20px_50px_-24px_rgba(11,30,54,0.35)] backdrop-blur-md">
      <div v-if="refreshing" class="text-[14px] text-muted">Loading your account…</div>
      <dl v-else class="space-y-4">
        <div class="flex items-center justify-between">
          <dt class="text-[13.5px] text-muted">Email</dt>
          <dd class="text-[14px] font-medium text-navy">{{ auth.user?.email }}</dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-[13.5px] text-muted">Account type</dt>
          <dd class="rounded-full bg-gold/15 px-2.5 py-0.5 text-[12.5px] font-semibold text-gold-deep">
            {{ auth.roleLabel }}
          </dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-[13.5px] text-muted">Status</dt>
          <dd
            class="rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold"
            :class="
              auth.user?.status === 'ACTIVE'
                ? 'bg-cyan/15 text-cyan'
                : 'bg-danger-bg text-danger'
            "
          >
            {{ auth.user?.status || 'Unknown' }}
          </dd>
        </div>
      </dl>
    </div>

    <router-link
      to="/change-password"
      class="mt-6 inline-block text-[14px] font-semibold text-navy hover:text-cyan"
    >
      Change password
    </router-link>
  </AppShell>
</template>
