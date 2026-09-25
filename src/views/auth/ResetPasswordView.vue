<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthShell from '@/components/brand/AuthShell.vue'
import PasswordInput from '@/components/ui/PasswordInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FormErrors from '@/components/ui/FormErrors.vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { ApiError } from '@/api/client'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const toast = useToastStore()

// This page only makes sense after the code has been confirmed on the
// previous step — bounce back if someone lands here without that context.
if (!route.query.email || !route.query.otp) {
  router.replace({ name: 'forgot-password' })
}

const form = reactive({
  email: String(route.query.email || ''),
  otp: String(route.query.otp || ''),
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
    await auth.resetPassword(form)
    toast.success('Password reset. Sign in with your new password.')
    router.push({ name: 'login', query: { email: form.email } })
  } catch (err) {
    errors.value = err instanceof ApiError && err.errors ? err.errors : [err.message]
  }
}
</script>

<template>
  <AuthShell headline="Choose a new password." supporting="Make it something you haven't used here before.">
    <h2 class="font-display text-[28px] font-medium text-navy">Set a new password</h2>
    <p class="mt-1.5 text-[14.5px] text-muted">
      Resetting the password for <span class="font-semibold text-navy">{{ form.email }}</span>.
    </p>

    <FormErrors :errors="errors" class="mt-5" />

    <form class="mt-6 space-y-4" novalidate @submit.prevent="onSubmit">
      <PasswordInput v-model="form.newPassword" label="New password" show-requirements />
      <PasswordInput v-model="form.confirmPassword" label="Confirm new password" />

      <BaseButton type="submit" class="mt-2" :loading="auth.loading">Reset password</BaseButton>
    </form>

    <p class="mt-6 text-center text-[14px] text-muted">
      Remembered your old one?
      <router-link to="/login" class="font-semibold text-navy hover:text-cyan">Sign in</router-link>
    </p>
  </AuthShell>
</template>
