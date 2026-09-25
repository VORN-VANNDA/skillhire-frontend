<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppShell from '@/components/brand/AppShell.vue'
import PasswordInput from '@/components/ui/PasswordInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FormErrors from '@/components/ui/FormErrors.vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { ApiError } from '@/api/client'

const auth = useAuthStore()
const toast = useToastStore()
const router = useRouter()

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const errors = ref([])

async function onSubmit() {
  errors.value = []
  if (form.newPassword !== form.confirmPassword) {
    errors.value = ['Confirm password must match new password.']
    return
  }
  try {
    await auth.changePassword(form)
    toast.success('Password changed.')
    router.push({ name: 'dashboard' })
  } catch (err) {
    errors.value = err instanceof ApiError && err.errors ? err.errors : [err.message]
  }
}
</script>

<template>
  <AppShell>
    <div class="max-w-md">
      <router-link to="/dashboard" class="text-[13.5px] font-semibold text-muted hover:text-navy">
        &larr; Back to dashboard
      </router-link>
      <h1 class="mt-3 font-display text-[28px] font-medium text-navy">Change password</h1>
      <p class="mt-1.5 text-[14.5px] text-muted">Confirm your current password to set a new one.</p>

      <FormErrors :errors="errors" class="mt-5" />

      <form class="mt-6 space-y-4" novalidate @submit.prevent="onSubmit">
        <PasswordInput
          v-model="form.oldPassword"
          label="Current password"
          autocomplete="current-password"
        />
        <PasswordInput v-model="form.newPassword" label="New password" show-requirements />
        <PasswordInput v-model="form.confirmPassword" label="Confirm new password" />

        <BaseButton type="submit" class="mt-2" :block="false" :loading="auth.loading">
          Update password
        </BaseButton>
      </form>
    </div>
  </AppShell>
</template>
