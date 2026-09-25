<script setup>
import { onMounted, ref } from 'vue'
import AppShell from '@/components/brand/AppShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FormErrors from '@/components/ui/FormErrors.vue'
import { useAdminStore } from '@/stores/admin'
import { useToastStore } from '@/stores/toast'
import { ROLE_NAMES } from '@/constants/roles'

const admin = useAdminStore()
const toast = useToastStore()
const loading = ref(true)
const errors = ref([])
const actionLoading = ref(false)

onMounted(async () => {
  try {
    await admin.fetchUsers()
  } catch (err) {
    errors.value = [err.message]
  } finally {
    loading.value = false
  }
})

async function handleBlock(id) {
  if (!confirm('Block this user? They will not be able to log in.')) return
  try {
    actionLoading.value = true
    await admin.blockUser(id)
    toast.success('User blocked')
  } catch (err) {
    errors.value = [err.message]
  } finally {
    actionLoading.value = false
  }
}

async function handleActivate(id) {
  if (!confirm('Activate this user?')) return
  try {
    actionLoading.value = true
    await admin.activateUser(id)
    toast.success('User activated')
  } catch (err) {
    errors.value = [err.message]
  } finally {
    actionLoading.value = false
  }
}

function getRoleLabel(roleId) {
  return ROLE_NAMES[Number(roleId)] || 'Unknown'
}
</script>

<template>
  <AppShell>
    <div class="mb-8">
      <h1 class="font-display text-[28px] font-medium text-navy">Users</h1>
      <p class="mt-1.5 text-[14.5px] text-muted">Manage user accounts</p>
    </div>

    <FormErrors :errors="errors" v-if="errors.length" class="mb-6" />

    <div v-if="loading" class="text-center text-muted">Loading users...</div>

    <div v-else-if="!admin.users.length" class="text-center text-muted">No users found</div>

    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-navy/10">
            <th class="px-4 py-3 text-left text-[12.5px] font-semibold text-muted uppercase">Email</th>
            <th class="px-4 py-3 text-left text-[12.5px] font-semibold text-muted uppercase">Role</th>
            <th class="px-4 py-3 text-left text-[12.5px] font-semibold text-muted uppercase">Verified</th>
            <th class="px-4 py-3 text-left text-[12.5px] font-semibold text-muted uppercase">Status</th>
            <th class="px-4 py-3 text-left text-[12.5px] font-semibold text-muted uppercase">Created</th>
            <th class="px-4 py-3 text-right text-[12.5px] font-semibold text-muted uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in admin.users" :key="user.id" class="border-b border-navy/5 hover:bg-navy/[0.02]">
            <td class="px-4 py-4">
              <div class="text-[14px] font-medium text-navy">{{ user.email }}</div>
            </td>
            <td class="px-4 py-4">
              <span class="rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold text-gold-deep">
                {{ getRoleLabel(user.role_id) }}
              </span>
            </td>
            <td class="px-4 py-4">
              <span
                class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                :class="
                  user.is_verified
                    ? 'bg-cyan/15 text-cyan'
                    : 'bg-warning-bg text-warning'
                "
              >
                {{ user.is_verified ? 'Yes' : 'No' }}
              </span>
            </td>
            <td class="px-4 py-4">
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
            </td>
            <td class="px-4 py-4">
              <div class="text-[14px] text-muted">{{ new Date(user.created_at).toLocaleDateString() }}</div>
            </td>
            <td class="px-4 py-4">
              <div class="flex justify-end gap-2">
                <button
                  v-if="user.status === 'ACTIVE'"
                  class="text-[12.5px] font-semibold text-danger hover:text-red-700 disabled:opacity-50"
                  @click="handleBlock(user.id)"
                  :disabled="actionLoading"
                >
                  Block
                </button>
                <button
                  v-if="user.status === 'INACTIVE'"
                  class="text-[12.5px] font-semibold text-cyan hover:text-blue-600 disabled:opacity-50"
                  @click="handleActivate(user.id)"
                  :disabled="actionLoading"
                >
                  Activate
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppShell>
</template>
