<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppShell from '@/components/brand/AppShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FormErrors from '@/components/ui/FormErrors.vue'
import { useAdminStore } from '@/stores/admin'
import { useToastStore } from '@/stores/toast'

const admin = useAdminStore()
const toast = useToastStore()
const router = useRouter()
const errors = ref([])

const form = reactive({
  email: '',
  name: '',
  description: '',
  website: '',
  location: '',
})

async function onSubmit() {
  errors.value = []

  if (!form.email || !form.name) {
    errors.value = ['Company name and email are required']
    return
  }

  try {
    const company = await admin.createCompany(form)
    toast.success(`Company "${company.name}" created. Invitation sent to ${company.email}`)
    router.push('/admin/companies')
  } catch (err) {
    errors.value = [err.message]
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
      <h1 class="font-display text-[28px] font-medium text-navy">Create Company Account</h1>
      <p class="mt-1.5 text-[14.5px] text-muted">
        A verification OTP will be sent to the company email
      </p>
    </div>

    <FormErrors :errors="errors" v-if="errors.length" class="mb-6" />

    <form class="max-w-md space-y-5" @submit.prevent="onSubmit">
      <div>
        <label class="mb-1.5 block text-[13.5px] font-semibold text-navy">
          Company Email
        </label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full rounded-2xl bg-navy/[0.04] px-3.5 py-2.5 text-[15px] text-navy shadow-[inset_0_1px_2px_rgba(11,30,54,0.06)] transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan/50"
          placeholder="company@example.com"
        />
      </div>

      <div>
        <label class="mb-1.5 block text-[13.5px] font-semibold text-navy">
          Company Name
        </label>
        <input
          v-model="form.name"
          type="text"
          required
          class="w-full rounded-2xl bg-navy/[0.04] px-3.5 py-2.5 text-[15px] text-navy shadow-[inset_0_1px_2px_rgba(11,30,54,0.06)] transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan/50"
          placeholder="Company Name"
        />
      </div>

      <div>
        <label class="mb-1.5 block text-[13.5px] font-semibold text-navy">
          Description (optional)
        </label>
        <textarea
          v-model="form.description"
          class="w-full rounded-2xl bg-navy/[0.04] px-3.5 py-2.5 text-[15px] text-navy shadow-[inset_0_1px_2px_rgba(11,30,54,0.06)] transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan/50 resize-none"
          rows="3"
          placeholder="Brief company description"
        ></textarea>
      </div>

      <div>
        <label class="mb-1.5 block text-[13.5px] font-semibold text-navy">
          Website (optional)
        </label>
        <input
          v-model="form.website"
          type="url"
          class="w-full rounded-2xl bg-navy/[0.04] px-3.5 py-2.5 text-[15px] text-navy shadow-[inset_0_1px_2px_rgba(11,30,54,0.06)] transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan/50"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label class="mb-1.5 block text-[13.5px] font-semibold text-navy">
          Location (optional)
        </label>
        <input
          v-model="form.location"
          type="text"
          class="w-full rounded-2xl bg-navy/[0.04] px-3.5 py-2.5 text-[15px] text-navy shadow-[inset_0_1px_2px_rgba(11,30,54,0.06)] transition-all duration-150 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan/50"
          placeholder="City, Country"
        />
      </div>

      <BaseButton type="submit" class="mt-6" :loading="admin.loading">
        Create Company
      </BaseButton>
    </form>
  </AppShell>
</template>
