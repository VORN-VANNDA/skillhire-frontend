<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthShell from '@/components/brand/AuthShell.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import OtpInput from '@/components/ui/OtpInput.vue'
import PasswordInput from '@/components/ui/PasswordInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FormErrors from '@/components/ui/FormErrors.vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { useCooldown } from '@/composables/useCooldown'
import { ApiError } from '@/api/client'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const toast = useToastStore()
const { remaining, start } = useCooldown(30)

const form = reactive({
  email: String(route.query.email || ''),
  otp: '',
  newPassword: '',
  confirmPassword: '',
})
const errors = ref([])
const resending = ref(false)

async function onSubmit() {
  errors.value = []
  if (form.newPassword !== form.confirmPassword) {
    errors.value = ['Confirm password must match new password.']
    return
  }
  try {
    await auth.setupCompanyAccount(form)
    toast.success('Account activated. Sign in to continue.')
    router.push({ name: 'login', query: { email: form.email } })
  } catch (err) {
    errors.value = err instanceof ApiError && err.errors ? err.errors : [err.message]
  }
}

async function onResend() {
  if (!form.email) {
    errors.value = ['Enter your email address first.']
    return
  }
  resending.value = true
  try {
    await auth.resendOtp({ email: form.email })
    toast.success('We sent a new code to your email.')
    start()
  } catch (err) {
    errors.value = [err.message]
  } finally {
    resending.value = false
  }
}
</script>

<template>
  <AuthShell
    headline="Activate your company account."
    supporting="Our team created your SkillHire company account. Enter the code from your email and set a password to get started."
  >
    <h2 class="font-display text-[28px] font-medium text-navy">Activate your account</h2>
    <p class="mt-1.5 text-[14.5px] text-muted">This is a one-time setup for company accounts created by SkillHire.</p>

    <FormErrors :errors="errors" class="mt-5" />

    <form class="mt-6 space-y-5" novalidate @submit.prevent="onSubmit">
      <BaseInput
        v-model="form.email"
        label="Email address"
        type="email"
        autocomplete="email"
        required
      />
      <div>
        <label class="mb-1.5 block text-[13.5px] font-semibold text-navy">Activation code</label>
        <OtpInput v-model="form.otp" />
      </div>
      <PasswordInput v-model="form.newPassword" label="New password" show-requirements />
      <PasswordInput v-model="form.confirmPassword" label="Confirm new password" />

      <BaseButton type="submit" :loading="auth.loading" :disabled="form.otp.length !== 6">
        Activate account
      </BaseButton>
    </form>

    <p class="mt-6 text-center text-[14px] text-muted">
      Didn't get a code?
      <button
        type="button"
        class="font-semibold text-navy hover:text-cyan disabled:cursor-not-allowed disabled:text-muted"
        :disabled="remaining > 0 || resending"
        @click="onResend"
      >
        {{ remaining > 0 ? `Resend in ${remaining}s` : 'Resend code' }}
      </button>
    </p>
    <p class="mt-2 text-center text-[14px] text-muted">
      Already activated?
      <router-link to="/login" class="font-semibold text-navy hover:text-cyan">Sign in</router-link>
    </p>
    <p class="mt-2 text-center text-[13px] text-muted">
      Not a company?
      <router-link to="/register" class="font-semibold text-cyan hover:underline">Create a job seeker account</router-link>
    </p>
  </AuthShell>
</template>
