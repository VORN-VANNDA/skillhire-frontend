<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppShell from '@/components/brand/AppShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FormErrors from '@/components/ui/FormErrors.vue'
import { useAdminStore } from '@/stores/admin'
import { useToastStore } from '@/stores/toast'

const admin = useAdminStore()
const toast = useToastStore()
const router = useRouter()
const loading = ref(true)
const errors = ref([])
const actionLoading = ref(false)

onMounted(async () => {
  try {
    await admin.fetchCompanies()
  } catch (err) {
    errors.value = [err.message]
  } finally {
    loading.value = false
  }
})

async function handleBlock(id) {
  if (!confirm('Block this company? They will not be able to log in.')) return
  try {
    actionLoading.value = true
    await admin.blockCompany(id)
    toast.success('Company blocked')
  } catch (err) {
    errors.value = [err.message]
  } finally {
    actionLoading.value = false
  }
}

async function handleActivate(id) {
  if (!confirm('Activate this company?')) return
  try {
    actionLoading.value = true
    await admin.activateCompany(id)
    toast.success('Company activated')
  } catch (err) {
    errors.value = [err.message]
  } finally {
    actionLoading.value = false
  }
}

function navigateToCreate() {
  router.push('/admin/companies/create')
}

function navigateToCompany(id) {
  router.push(`/admin/companies/${id}`)
}
</script>

<template>
  <AppShell>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="font-display text-[28px] font-medium text-navy">Companies</h1>
        <p class="mt-1.5 text-[14.5px] text-muted">Manage company accounts</p>
      </div>
      <BaseButton @click="navigateToCreate">+ Create Company</BaseButton>
    </div>

    <FormErrors :errors="errors" v-if="errors.length" class="mb-6" />

    <div v-if="loading" class="text-center text-muted">Loading companies...</div>

    <div v-else-if="!admin.companies.length" class="text-center text-muted">No companies found</div>

    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-navy/10">
            <th class="px-4 py-3 text-left text-[12.5px] font-semibold text-muted uppercase">Name</th>
            <th class="px-4 py-3 text-left text-[12.5px] font-semibold text-muted uppercase">Email</th>
            <th class="px-4 py-3 text-left text-[12.5px] font-semibold text-muted uppercase">Website</th>
            <th class="px-4 py-3 text-left text-[12.5px] font-semibold text-muted uppercase">Status</th>
            <th class="px-4 py-3 text-right text-[12.5px] font-semibold text-muted uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in admin.companies" :key="company.id" class="border-b border-navy/5 hover:bg-navy/[0.02]">
            <td class="px-4 py-4">
              <div class="text-[14px] font-medium text-navy">{{ company.name }}</div>
            </td>
            <td class="px-4 py-4">
              <div class="text-[14px] text-muted">{{ company.email }}</div>
            </td>
            <td class="px-4 py-4">
              <div class="text-[14px] text-muted truncate">{{ company.website || '—' }}</div>
            </td>
            <td class="px-4 py-4">
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
            </td>
            <td class="px-4 py-4">
              <div class="flex justify-end gap-2">
                <button
                  class="text-[12.5px] font-semibold text-navy hover:text-cyan"
                  @click="navigateToCompany(company.id)"
                  :disabled="actionLoading"
                >
                  View
                </button>
                <button
                  v-if="company.status === 'ACTIVE'"
                  class="text-[12.5px] font-semibold text-danger hover:text-red-700 disabled:opacity-50"
                  @click="handleBlock(company.id)"
                  :disabled="actionLoading"
                >
                  Block
                </button>
                <button
                  v-if="company.status === 'INACTIVE'"
                  class="text-[12.5px] font-semibold text-cyan hover:text-blue-600 disabled:opacity-50"
                  @click="handleActivate(company.id)"
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
