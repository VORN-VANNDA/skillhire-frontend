<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { ROLES } from '@/constants/roles'

const auth = useAuthStore()
const toast = useToastStore()
const router = useRouter()

const isAdmin = () => auth.roleId === ROLES.ADMIN

async function handleLogout() {
  try {
    await auth.logout()
    toast.success('Signed out.')
  } catch {
    // Token was already invalid server-side — the local session is
    // cleared either way, so just continue to the login screen.
  } finally {
    router.push('/login')
  }
}
</script>

<template>
  <div class="bg-water-light min-h-screen">
    <header class="bg-white/70 shadow-[0_8px_24px_-16px_rgba(11,30,54,0.35)] backdrop-blur-xl">
      <div class="mx-auto max-w-6xl px-6 py-4">
        <div class="flex items-center justify-between mb-0">
          <router-link to="/dashboard" class="flex items-center gap-2 font-display text-lg font-medium text-navy">
            <span class="flex h-7 w-7 items-center justify-center rounded-xl bg-gold text-sm font-semibold text-navy shadow-[0_0_16px_rgba(255,159,28,0.45)]">S</span>
            SkillHire
          </router-link>
          <div class="flex items-center gap-4">
            <span class="hidden text-[13.5px] text-muted sm:inline">{{ auth.user?.email }}</span>
            <button
              type="button"
              class="text-[13.5px] font-semibold text-navy hover:text-cyan"
              @click="handleLogout"
            >
              Sign out
            </button>
          </div>
        </div>

        <!-- Admin Navigation -->
        <nav v-if="isAdmin()" class="mt-4 flex gap-6 border-t border-navy/10 pt-4">
          <router-link
            to="/admin/dashboard"
            class="text-[13.5px] font-semibold text-navy hover:text-cyan"
            active-class="text-cyan border-b-2 border-cyan pb-1"
          >
            Dashboard
          </router-link>
          <router-link
            to="/admin/companies"
            class="text-[13.5px] font-semibold text-navy hover:text-cyan"
            active-class="text-cyan border-b-2 border-cyan pb-1"
          >
            Companies
          </router-link>
          <router-link
            to="/admin/users"
            class="text-[13.5px] font-semibold text-navy hover:text-cyan"
            active-class="text-cyan border-b-2 border-cyan pb-1"
          >
            Users
          </router-link>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>
