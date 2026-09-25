<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthShell from '@/components/brand/AuthShell.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FormErrors from '@/components/ui/FormErrors.vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { ApiError } from '@/api/client'

const router = useRouter()
const auth = useAuthStore()
const toast = useToastStore()

const form = reactive({ email: '' })
const errors = ref([])

async function onSubmit() {
  errors.value = []
  try {
    await auth.forgotPassword(form)
    toast.success('If that email is registered, a reset code is on its way.')
    router.push({ name: 'verify-reset-otp', query: { email: form.email } })
  } catch (err) {
    errors.value = err instanceof ApiError && err.errors ? err.errors : [err.message]
  }
}
</script>

<template>
  <AuthShell
    headline="Let's get you back in."
    supporting="Enter the email on your account and we'll send a 6-digit reset code."
  >
    <h2 class="font-display text-[28px] font-medium text-navy">Reset your password</h2>
    <p class="mt-1.5 text-[14.5px] text-muted">We'll email you a code to confirm it's you.</p>

    <FormErrors :errors="errors" class="mt-5" />

    <form class="mt-6 space-y-4" novalidate @submit.prevent="onSubmit">
      <BaseInput
        v-model="form.email"
        label="Email address"
        type="email"
        autocomplete="email"
        required
      />
      <BaseButton type="submit" class="mt-2" :loading="auth.loading">Send reset code</BaseButton>
    </form>

    <p class="mt-6 text-center text-[14px] text-muted">
      Remembered it?
      <router-link to="/login" class="font-semibold text-navy hover:text-cyan">Sign in</router-link>
    </p>
  </AuthShell>
</template>
