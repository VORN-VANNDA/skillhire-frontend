import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/verify-otp',
    name: 'verify-otp',
    component: () => import('@/views/auth/VerifyOtpView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPasswordView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/verify-reset-otp',
    name: 'verify-reset-otp',
    component: () => import('@/views/auth/VerifyResetOtpView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/auth/ResetPasswordView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/company/setup-account',
    name: 'company-setup-account',
    component: () => import('@/views/auth/CompanySetupAccountView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: () => import('@/views/auth/ChangePasswordView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('@/views/admin/AdminDashboardView.vue'),
    meta: { requiresAuth: true, requiresRole: 1 },
  },
  {
    path: '/admin/companies',
    name: 'admin-companies',
    component: () => import('@/views/admin/AdminCompaniesView.vue'),
    meta: { requiresAuth: true, requiresRole: 1 },
  },
  {
    path: '/admin/companies/create',
    name: 'admin-create-company',
    component: () => import('@/views/admin/AdminCreateCompanyView.vue'),
    meta: { requiresAuth: true, requiresRole: 1 },
  },
  {
    path: '/admin/companies/:id',
    name: 'admin-company-details',
    component: () => import('@/views/admin/AdminCompanyDetailsView.vue'),
    meta: { requiresAuth: true, requiresRole: 1 },
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('@/views/admin/AdminUsersView.vue'),
    meta: { requiresAuth: true, requiresRole: 1 },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { path: auth.homePath }
  }

  if (to.meta.requiresRole && auth.roleId !== to.meta.requiresRole) {
    return { path: auth.homePath }
  }

  return true
})

export default router
