<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()

const features = [
  { icon: 'matching', title: 'Smart Matching', desc: 'AI-powered skill matching' },
  { icon: 'lightning', title: 'Fast Hiring', desc: 'Streamlined process' },
  { icon: 'chart', title: 'Analytics', desc: 'Deep insights' },
  { icon: 'shield', title: 'Secure', desc: 'Enterprise security' },
  { icon: 'users', title: 'Collaboration', desc: 'Team coordination' },
  { icon: 'globe', title: 'Global Reach', desc: 'Worldwide talent' },
]

const userTypes = [
  { role: 'For Companies', icon: 'building', desc: 'Post jobs and hire talent', cta: 'Hire Now' },
  { role: 'For Job Seekers', icon: 'briefcase', desc: 'Find your next role', cta: 'Browse Jobs' },
  { role: 'For Admins', icon: 'settings', desc: 'Manage platform', cta: 'Manage' },
]

function navigateTo(path) { router.push(path) }

function getIcon(name) {
  const icons = {
    matching: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0M12 2v4m0 12v4M22 12h-4M2 12h4M20 4l-2.8 2.8M4 20l2.8-2.8M20 20l-2.8-2.8M4 4l2.8 2.8"/></svg>`,
    lightning: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18M3 18l5-5 4 4 8-10"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z"/><path d="M10 12l2 2 4-4"/></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="7" r="3"/><path d="M5 11c0-1 1-2 3-2s3 1 3 2M17 16c1-1.5 1-3 0-4M14 14c1.5-.5 2.5-2 2-3.5s-2-2-3.5-1.5M2 20c0-2 3-4 6-4s6 2 6 4M15 20c0-2 2-3 3-4"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="1"/><path d="M7 4v16M17 4v16M2 9h20M2 14h20"/></svg>`,
    briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M22 12h-6M2 12h6M20.485 3.515l-4.242 4.242M7.757 16.485l-4.242 4.242M20.485 20.485l-4.242-4.242M7.757 7.757l-4.242-4.242"/></svg>`,
  }
  return icons[name] || ''
}
</script>

<template>
  <div>
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-gradient-to-r from-white/70 via-cyan/5 to-gold/5 backdrop-blur-xl border-b border-cyan/20">
      <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2 font-display text-xl font-bold text-navy hover:text-cyan transition">
          <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-gold text-white font-bold shadow-lg">S</span>
          SkillHire
        </router-link>
        <div class="flex gap-3 items-center">
          <button
            class="px-6 py-2.5 text-sm font-semibold text-navy hover:text-cyan transition-colors"
            @click="navigateTo('/login')"
          >
            Sign In
          </button>
          <BaseButton :block="false" @click="navigateTo('/register')" class="!px-6 !py-2.5 !text-sm">Sign Up</BaseButton>
        </div>
      </div>
    </header>

    <!-- HERO: Full-screen water gradient section -->
    <section class="relative bg-water min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-20 left-20 w-96 h-96 bg-cyan/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-gold/20 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-8">
          <span class="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
          <span class="text-sm font-semibold text-white">Join 50K+ professionals</span>
        </div>

        <h1 class="font-display text-[64px] font-bold text-white leading-tight mb-6">
          Find Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-gold">Perfect Match</span>
        </h1>
        <p class="text-[18px] text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
          Whether you're hiring top talent or seeking your dream role, SkillHire connects the right people with the right opportunities using intelligent matching.
        </p>

        <div class="flex gap-4 justify-center flex-wrap">
          <BaseButton :block="false" @click="navigateTo('/register')" class="!bg-gradient-to-r !from-cyan !to-gold !text-navy !font-bold !shadow-lg">
            Get Started Free
          </BaseButton>
         
        </div>
      </div>
    </section>

    <!-- Features: White section with elegant cards -->
    <section class="bg-white py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="font-display text-[44px] font-bold text-navy mb-3">Powerful Features</h2>
          <p class="text-[16px] text-navy/60 max-w-2xl mx-auto">Everything you need for successful hiring and career growth</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div
            v-for="f in features"
            :key="f.title"
            class="group p-8 rounded-2xl bg-gradient-to-br from-navy/[0.02] to-cyan/[0.05] border border-navy/10 hover:border-cyan/40 hover:shadow-[0_20px_40px_rgba(0,180,216,0.1)] transition-all duration-300 text-center"
          >
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan/20 to-gold/20 text-cyan group-hover:text-gold flex items-center justify-center mb-4 transition-colors mx-auto" v-html="getIcon(f.icon)"></div>
            <h3 class="text-[18px] font-bold text-navy mb-2">{{ f.title }}</h3>
            <p class="text-[14px] text-navy/60">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- User Types: Softer Navy gradient section -->
    <section class="relative bg-gradient-to-br from-navy/80 via-navy/75 to-navy/70 py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-cyan/40 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-gold/30 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="font-display text-[44px] font-bold text-white mb-3">Built for Everyone</h2>
          <p class="text-[16px] text-white/70 max-w-2xl mx-auto">Whether you're a company hiring top talent, a professional seeking opportunities, or managing the platform—SkillHire has everything you need to succeed.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div
            v-for="(type, idx) in userTypes.slice(0, 2)"
            :key="type.role"
            class="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
          >
            <div
              class="p-8 rounded-2xl backdrop-blur-md border transition-all h-full flex flex-col"
              :class="idx === 0
                ? 'bg-gradient-to-br from-cyan/30 to-gold/20 border-cyan/60 shadow-[0_20px_60px_rgba(0,180,216,0.3)]'
                : 'bg-white/10 border-white/20 hover:border-white/40 shadow-[0_20px_40px_rgba(255,255,255,0.1)]'
              "
            >
              <div
                class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all"
                :class="idx === 0
                  ? 'bg-gradient-to-br from-cyan to-gold text-white'
                  : 'bg-white/20 text-cyan group-hover:text-gold'
                "
                v-html="getIcon(type.icon)"
              ></div>

              <h3 class="text-[20px] font-bold text-white mb-2">{{ type.role }}</h3>
              <p class="text-[14px] text-white/70 mb-8 flex-grow">{{ type.desc }}</p>

              <BaseButton :block="true" @click="navigateTo('/register')">
                {{ type.cta }}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats: Cyan gradient section -->
    <section class="relative bg-gradient-to-r from-cyan via-cyan/90 to-gold py-20 overflow-hidden">
      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-[48px] font-bold text-white mb-2">1K+</div>
            <div class="text-[13px] text-white/80 font-semibold">Companies</div>
          </div>
          <div class="text-center">
            <div class="text-[48px] font-bold text-white mb-2">50K+</div>
            <div class="text-[13px] text-white/80 font-semibold">Job Seekers</div>
          </div>
          <div class="text-center">
            <div class="text-[48px] font-bold text-white mb-2">95%</div>
            <div class="text-[13px] text-white/80 font-semibold">Satisfaction</div>
          </div>
          <div class="text-center">
            <div class="text-[48px] font-bold text-white mb-2">24/7</div>
            <div class="text-[13px] text-white/80 font-semibold">Support</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA: Water gradient section -->
    <section class="relative bg-water py-24 overflow-hidden">
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 class="font-display text-[40px] font-bold text-white mb-3">Ready to Get Started?</h2>
        <p class="text-[16px] text-white/80 max-w-xl mx-auto mb-10">
          Join thousands transforming their hiring and career journeys
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <BaseButton :block="false" @click="navigateTo('/register')" class="!bg-gold !text-navy !font-bold !shadow-lg">
            Start Free Trial
          </BaseButton>
          <button
            class="px-8 py-3 text-base font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl border border-white/30 transition-all"
            @click="navigateTo('/login')"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>

    <!-- Footer: Navy -->
    <footer class="bg-navy border-t border-cyan/20">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div class="flex items-center gap-2 font-display font-bold text-gold mb-4">
              <span class="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan to-gold text-navy flex items-center justify-center text-sm font-bold">S</span>
              SkillHire
            </div>
            <p class="text-[12px] text-white/60">Modern recruitment platform</p>
          </div>
          <div>
            <h4 class="text-[12px] font-bold text-white uppercase mb-3 tracking-wider">Product</h4>
            <ul class="space-y-2 text-[12px] text-white/60">
              <li><a href="#" class="hover:text-cyan transition">Features</a></li>
              <li><a href="#" class="hover:text-cyan transition">Pricing</a></li>
              <li><a href="#" class="hover:text-cyan transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-[12px] font-bold text-white uppercase mb-3 tracking-wider">Company</h4>
            <ul class="space-y-2 text-[12px] text-white/60">
              <li><a href="#" class="hover:text-cyan transition">About</a></li>
              <li><a href="#" class="hover:text-cyan transition">Blog</a></li>
              <li><a href="#" class="hover:text-cyan transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-[12px] font-bold text-white uppercase mb-3 tracking-wider">Legal</h4>
            <ul class="space-y-2 text-[12px] text-white/60">
              <li><a href="#" class="hover:text-cyan transition">Privacy</a></li>
              <li><a href="#" class="hover:text-cyan transition">Terms</a></li>
              <li><a href="#" class="hover:text-cyan transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-white/10 pt-8 text-center text-[11px] text-white/40">
          <p>&copy; 2026 SkillHire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
