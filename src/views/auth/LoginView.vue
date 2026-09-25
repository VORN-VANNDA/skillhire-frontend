<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthShell from '@/components/brand/AuthShell.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import PasswordInput from '@/components/ui/PasswordInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FormErrors from '@/components/ui/FormErrors.vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const toast = useToastStore()

const form = reactive({
  email: String(route.query.email || ''),
  password: '',
})
const errorMessage = ref('')

const needsVerification = computed(() => /verify your email/i.test(errorMessage.value))

async function onSubmit() {
  errorMessage.value = ''
  try {
    await auth.login(form)
    toast.success('Welcome back.')
    router.push(String(route.query.redirect || auth.homePath))
  } catch (err) {
    errorMessage.value = err.message
  }
}
</script>

<template>
  <AuthShell
    headline="Good to see you again."
    supporting="Sign in to keep matching with roles that fit the skills you've actually verified."
  >
    <h2 class="font-display text-[28px] font-medium text-navy">Sign in</h2>
    <p class="mt-1.5 text-[14.5px] text-muted">Use the email and password from your account.</p>

    <div v-if="errorMessage" class="mt-5 rounded-2xl bg-danger-bg px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
      <p class="text-[13.5px] text-danger">{{ errorMessage }}</p>
      <router-link
        v-if="needsVerification"
        :to="{ name: 'verify-otp', query: { email: form.email } }"
        class="mt-1 inline-block text-[13.5px] font-semibold text-danger underline underline-offset-2"
      >
        Verify your email
      </router-link>
    </div>

    <form class="mt-6 space-y-4" novalidate @submit.prevent="onSubmit">
      <BaseInput
        v-model="form.email"
        label="Email address"
        type="email"
        autocomplete="email"
        required
      />
      <div>
        <div class="mb-1.5 flex items-center justify-between">
          <label class="text-[13.5px] font-semibold text-navy">Password</label>
          <router-link to="/forgot-password" class="text-[13px] font-semibold text-cyan hover:underline">
            Forgot password?
          </router-link>
        </div>
        <PasswordInput v-model="form.password" label="Password" hide-label autocomplete="current-password" />
      </div>

      <BaseButton type="submit" class="mt-2" :loading="auth.loading">Sign in</BaseButton>
    </form>

    <p class="mt-6 text-center text-[14px] text-muted">
      New to SkillHire?
      <router-link to="/register" class="font-semibold text-navy hover:text-cyan">Create an account</router-link>
    </p>
    <p class="mt-2 text-center text-[13px] text-muted">
      Setting up a company account?
      <router-link to="/company/setup-account" class="font-semibold text-cyan hover:underline">
        Activate it here
      </router-link>
    </p>
  </AuthShell>
</template>
