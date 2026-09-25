<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppShell from '@/components/brand/AppShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useAdminStore } from '@/stores/admin'
import { ROLE_NAMES } from '@/constants/roles'

const admin = useAdminStore()
const router = useRouter()
const loading = ref(true)

onMounted(async () => {
  try {
    await admin.fetchDashboard()
  } catch (err) {
    console.error('Failed to load dashboard:', err)
  } finally {
    loading.value = false
  }
})

function navigateTo(path) {
  router.push(path)
}

function roleLabel(roleId) {
  return ROLE_NAMES[Number(roleId)] || 'Unknown'
}
</script>

<template>
  <AppShell>
    <div class="mb-8">
      <h1 class="font-display text-[28px] font-medium text-navy">Admin Dashboard</h1>
      <p class="mt-1.5 text-[14.5px] text-muted">Manage companies, users, and system analytics</p>
    </div>

    <div v-if="loading" class="text-center text-muted">Loading dashboard...</div>

    <div v-else-if="admin.error" class="rounded-2xl bg-danger-bg p-4 text-danger">
      {{ admin.error }}
    </div>

    <div v-else class="space-y-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-24px_rgba(11,30,54,0.35)] backdrop-blur-md">
          <div class="text-[12.5px] font-semibold text-muted uppercase tracking-wide">Total Users</div>
          <div class="mt-2 text-[32px] font-bold text-navy">{{ admin.dashboard?.stats?.totalUsers ?? 0 }}</div>
        </div>

        <div class="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-24px_rgba(11,30,54,0.35)] backdrop-blur-md">
          <div class="text-[12.5px] font-semibold text-muted uppercase tracking-wide">Companies</div>
          <div class="mt-2 text-[32px] font-bold text-navy">{{ admin.dashboard?.stats?.totalCompanies ?? 0 }}</div>
        </div>

        <div class="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-24px_rgba(11,30,54,0.35)] backdrop-blur-md">
          <div class="text-[12.5px] font-semibold text-muted uppercase tracking-wide">Job Seekers</div>
          <div class="mt-2 text-[32px] font-bold text-navy">{{ admin.dashboard?.stats?.totalJobSeekers ?? 0 }}</div>
        </div>

        <div class="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-24px_rgba(11,30,54,0.35)] backdrop-blur-md">
          <div class="text-[12.5px] font-semibold text-muted uppercase tracking-wide">Verified Users</div>
          <div class="mt-2 text-[32px] font-bold text-navy">{{ admin.dashboard?.stats?.verifiedUsers ?? 0 }}</div>
        </div>
      </div>

      <!-- Management Sections -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Companies Section -->
        <div class="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-24px_rgba(11,30,54,0.35)] backdrop-blur-md">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-[18px] font-semibold text-navy">Recent Companies</h2>
            <BaseButton size="sm" @click="navigateTo('/admin/companies')">View All</BaseButton>
          </div>

          <div v-if="admin.dashboard?.recentCompanies?.length" class="space-y-3">
            <div
              v-for="company in admin.dashboard.recentCompanies.slice(0, 3)"
              :key="company.id"
              class="flex items-center justify-between border-b border-navy/10 pb-3 last:border-0"
            >
              <div>
                <div class="text-[14px] font-medium text-navy">{{ company.name }}</div>
                <div class="text-[12.5px] text-muted">{{ company.email }}</div>
              </div>
              <span
                class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                :class="
                  company.status === 'ACTIVE'
                    ? 'bg-cyan/15 text-cyan'
                    : 'bg-danger-bg text-danger'
                "
              >
                {{ company.status }}
              </span>
            </div>
          </div>
          <div v-else class="text-center text-[14px] text-muted">No companies yet</div>

          <BaseButton block class="mt-4" @click="navigateTo('/admin/companies/create')">
            Create Company
          </BaseButton>
        </div>

        <!-- Users Section -->
        <div class="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-24px_rgba(11,30,54,0.35)] backdrop-blur-md">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-[18px] font-semibold text-navy">Recent Users</h2>
            <BaseButton size="sm" @click="navigateTo('/admin/users')">View All</BaseButton>
          </div>

          <div v-if="admin.dashboard?.recentUsers?.length" class="space-y-3">
            <div
              v-for="user in admin.dashboard.recentUsers.slice(0, 3)"
              :key="user.id"
              class="flex items-center justify-between border-b border-navy/10 pb-3 last:border-0"
            >
              <div>
                <div class="text-[14px] font-medium text-navy">{{ user.email }}</div>
                <div class="text-[12.5px] text-muted">{{ roleLabel(user.role_id) }}</div>
              </div>
              <span
                class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                :class="
                  user.status === 'ACTIVE'
                    ? 'bg-cyan/15 text-cyan'
                    : 'bg-danger-bg text-danger'
                "
              >
                {{ user.status }}
              </span>
            </div>
          </div>
          <div v-else class="text-center text-[14px] text-muted">No users yet</div>

          <BaseButton block class="mt-4" @click="navigateTo('/admin/users')">
            Manage Users
          </BaseButton>
        </div>
      </div>

      <!-- Users by Role -->
      <div v-if="admin.dashboard?.usersByRole" class="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-24px_rgba(11,30,54,0.35)] backdrop-blur-md">
        <h2 class="mb-4 text-[18px] font-semibold text-navy">Users by Role</h2>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="role in admin.dashboard.usersByRole" :key="role.role_id" class="text-center">
            <div class="text-[28px] font-bold text-navy">{{ role.count }}</div>
            <div class="mt-1 text-[12.5px] text-muted">{{ roleLabel(role.role_id) }}</div>
          </div>
        </div>
      </div>
    </div>
  </AppShell>
</template>
