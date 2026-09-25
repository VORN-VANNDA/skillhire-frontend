<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppShell from '@/components/brand/AppShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FormErrors from '@/components/ui/FormErrors.vue'
import { useAdminStore } from '@/stores/admin'
import { useToastStore } from '@/stores/toast'

const route = useRoute()
const router = useRouter()
const admin = useAdminStore()
const toast = useToastStore()
const loading = ref(true)
const errors = ref([])
const actionLoading = ref(false)

onMounted(async () => {
  try {
    await admin.fetchCompanyById(route.params.id)
  } catch (err) {
    errors.value = [err.message]
  } finally {
    loading.value = false
  }
})

async function handleBlock() {
  if (!confirm('Block this company?')) return
  try {
    actionLoading.value = true
    await admin.blockCompany(admin.selectedCompany.id)
    toast.success('Company blocked')
  } catch (err) {
    errors.value = [err.message]
  } finally {
    actionLoading.value = false
  }
}

async function handleActivate() {
  if (!confirm('Activate this company?')) return
  try {
    actionLoading.value = true
    await admin.activateCompany(admin.selectedCompany.id)
    toast.success('Company activated')
  } catch (err) {
    errors.value = [err.message]
  } finally {
    actionLoading.value = false
  }
}

function goBack() {
  router.back()
}
</script>

<template>
  <AppShell>
    <div class="mb-8">
      <button
        type="button"
        class="text-[14px] font-semibold text-navy hover:text-cyan mb-4"
        @click="goBack"
      >
        ← Back
      </button>
    </div>

    <FormErrors :errors="errors" v-if="errors.length" class="mb-6" />

    <div v-if="loading" class="text-center text-muted">Loading company details...</div>

    <div v-else-if="admin.selectedCompany" class="space-y-6">
      <div>
        <h1 class="font-display text-[28px] font-medium text-navy">{{ admin.selectedCompany.name }}</h1>
        <p class="mt-1.5 text-[14.5px] text-muted">{{ admin.selectedCompany.email }}</p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div class="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-24px_rgba(11,30,54,0.35)] backdrop-blur-md">
          <h2 class="mb-4 text-[18px] font-semibold text-navy">Company Information</h2>
          <dl class="space-y-4">
            <div>
              <dt class="text-[12.5px] font-semibold text-muted uppercase">Email</dt>
              <dd class="mt-1 text-[14px] text-navy">{{ admin.selectedCompany.email }}</dd>
            </div>
            <div>
              <dt class="text-[12.5px] font-semibold text-muted uppercase">Website</dt>
              <dd class="mt-1">
                <a
                  v-if="admin.selectedCompany.website"
                  :href="admin.selectedCompany.website"
                  target="_blank"
                  rel="noopener"
                  class="text-[14px] text-cyan hover:underline"
                >
                  {{ admin.selectedCompany.website }}
                </a>
                <span v-else class="text-[14px] text-muted">—</span>
              </dd>
            </div>
            <div>
              <dt class="text-[12.5px] font-semibold text-muted uppercase">Location</dt>
              <dd class="mt-1 text-[14px] text-navy">{{ admin.selectedCompany.location || '—' }}</dd>
            </div>
            <div>
              <dt class="text-[12.5px] font-semibold text-muted uppercase">Status</dt>
              <dd class="mt-1">
                <span
                  class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  :class="
                    admin.selectedCompany.status === 'ACTIVE'
                      ? 'bg-cyan/15 text-cyan'
                      : 'bg-danger-bg text-danger'
                  "
                >
                  {{ admin.selectedCompany.status }}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div class="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-24px_rgba(11,30,54,0.35)] backdrop-blur-md">
          <h2 class="mb-4 text-[18px] font-semibold text-navy">Description</h2>
          <p class="text-[14px] text-navy leading-relaxed">
            {{ admin.selectedCompany.description || 'No description provided' }}
          </p>

          <div class="mt-6 space-y-3 border-t border-navy/10 pt-6">
            <div>
              <div class="text-[12.5px] font-semibold text-muted uppercase">Created</div>
              <div class="mt-1 text-[14px] text-navy">
                {{ new Date(admin.selectedCompany.created_at).toLocaleDateString() }}
              </div>
            </div>
            <div>
              <div class="text-[12.5px] font-semibold text-muted uppercase">Last Updated</div>
              <div class="mt-1 text-[14px] text-navy">
                {{ new Date(admin.selectedCompany.updated_at).toLocaleDateString() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-24px_rgba(11,30,54,0.35)] backdrop-blur-md">
        <h2 class="mb-4 text-[18px] font-semibold text-navy">Actions</h2>
        <div class="flex gap-3">
          <BaseButton
            v-if="admin.selectedCompany.status === 'ACTIVE'"
            variant="danger"
            @click="handleBlock"
            :loading="actionLoading"
          >
            Block Company
          </BaseButton>
          <BaseButton
            v-if="admin.selectedCompany.status === 'INACTIVE'"
            variant="primary"
            @click="handleActivate"
            :loading="actionLoading"
          >
            Activate Company
          </BaseButton>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-danger">Company not found</div>
  </AppShell>
</template>
