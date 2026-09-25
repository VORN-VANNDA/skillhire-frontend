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
    await auth.verifyResetOtp(form)
    router.push({ name: 'reset-password', query: { email: form.email, otp: form.otp } })
  } catch (err) {
    errors.value = err instanceof ApiError && err.errors ? err.errors : [err.message]
  }
}

// There's no dedicated "resend" endpoint for the reset flow — re-requesting
// forgot-password issues a fresh code the same way.
async function onResend() {
  if (!form.email) {
    errors.value = ['Enter your email address first.']
    return
  }
  resending.value = true
  try {
    await auth.forgotPassword({ email: form.email })
    toast.success('We sent a new reset code to your email.')
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
    headline="Enter your reset code."
    :supporting="
      form.email
        ? `Check ${form.email} for the 6-digit code we sent. It expires in 10 minutes.`
        : 'Check your email for the 6-digit code we sent. It expires in 10 minutes.'
    "
  >
    <h2 class="font-display text-[28px] font-medium text-navy">Enter reset code</h2>
    <p class="mt-1.5 text-[14.5px] text-muted">We'll confirm the code before you set a new password.</p>

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
        <label class="mb-1.5 block text-[13.5px] font-semibold text-navy">Reset code</label>
        <OtpInput v-model="form.otp" />
      </div>

      <BaseButton type="submit" :loading="auth.loading" :disabled="form.otp.length !== 6">
        Verify code
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
