<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthShell from '@/components/brand/AuthShell.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
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
  fullName: '',
  phoneNumber: '',
  email: '',
  password: '',
})
const errors = ref([])

async function onSubmit() {
  errors.value = []
  try {
    await auth.register(form)
    toast.success('Account created. We sent a 6-digit code to your email.')
    router.push({ name: 'verify-otp', query: { email: form.email } })
  } catch (err) {
    errors.value = err instanceof ApiError && err.errors ? err.errors : [err.message]
  }
}
</script>

<template>
  <AuthShell
    headline="Show what you can actually do."
    supporting="Skip the keyword-matched resume pile. Tell us your skills once and we'll surface roles that actually need them."
    :step="{ current: 1, total: 2 }"
  >
    <h2 class="font-display text-[28px] font-medium text-navy">Create your account</h2>
    <p class="mt-1.5 text-[14.5px] text-muted">
      This creates a job seeker account. Hiring instead? Company accounts are set up by our
      team — see the
      <router-link to="/company/setup-account" class="font-semibold text-cyan hover:underline"
        >activation page</router-link
      >.
    </p>

    <FormErrors :errors="errors" class="mt-5" />

    <form class="mt-6 space-y-4" novalidate @submit.prevent="onSubmit">
      <BaseInput
        v-model="form.fullName"
        label="Full name"
        autocomplete="name"
        placeholder="Sokha Chan"
        required
      />
      <BaseInput
        v-model="form.phoneNumber"
        label="Phone number"
        type="tel"
        autocomplete="tel"
        placeholder="+855 12 345 678"
        required
      />
      <BaseInput
        v-model="form.email"
        label="Email address"
        type="email"
        autocomplete="email"
        placeholder="you@example.com"
        required
      />
      <PasswordInput v-model="form.password" label="Password" show-requirements />

      <BaseButton type="submit" class="mt-2" :loading="auth.loading">Create account</BaseButton>
    </form>

    <p class="mt-6 text-center text-[14px] text-muted">
      Already have an account?
      <router-link to="/login" class="font-semibold text-navy hover:text-cyan">Sign in</router-link>
    </p>
  </AuthShell>
</template>
