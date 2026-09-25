<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthShell from '@/components/brand/AuthShell.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import OtpInput from '@/components/ui/OtpInput.vue'
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
})
const errors = ref([])
const resending = ref(false)

async function onSubmit() {
  errors.value = []
  try {
    await auth.verifyOtp(form)
    toast.success('Email verified. Sign in to continue.')
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
    headline="Check your inbox."
    :supporting="
      form.email
        ? `We sent a 6-digit code to ${form.email}. Enter it below to verify your email.`
        : 'Enter the 6-digit code we emailed you to verify your account.'
    "
    :step="{ current: 2, total: 2 }"
  >
    <h2 class="font-display text-[28px] font-medium text-navy">Verify your email</h2>
    <p class="mt-1.5 text-[14.5px] text-muted">The code expires 10 minutes after it's sent.</p>

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
        <label class="mb-1.5 block text-[13.5px] font-semibold text-navy">Verification code</label>
        <OtpInput v-model="form.otp" />
      </div>

      <BaseButton type="submit" :loading="auth.loading" :disabled="form.otp.length !== 6">
        Verify email
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
  </AuthShell>
</template>
