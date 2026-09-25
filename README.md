# SkillHire — Frontend

Vue 3 + Vite frontend for the SkillHire API (`../skillhire-backend`). This first pass covers the full authentication surface — nothing else yet.

## Stack

- Vue 3 (`<script setup>`) + Vite
- Vue Router (guarded routes: `guestOnly` vs `requiresAuth`)
- Pinia (`stores/auth.js`, `stores/toast.js`)
- Axios (`api/client.js`, `api/auth.js`) — Bearer token auth, no cookies
- Tailwind CSS v4

## Setup

```bash
npm install
cp .env.example .env   # VITE_API_BASE_URL, defaults to http://localhost:5000/api
npm run dev
```

The backend must be running (`../skillhire-backend`, `npm run dev`) with its database migrated for register/login/OTP to actually work.

## What's implemented

Every endpoint in `routes/auth.js` on the backend has a matching page:

| Backend route | Page |
| --- | --- |
| `POST /auth/register` | `/register` |
| `POST /auth/verify-otp` | `/verify-otp` |
| `POST /auth/resend-otp` | button on `/verify-otp` and `/company/setup-account` |
| `POST /auth/login` | `/login` |
| `GET /auth/me` | called on `/dashboard` load |
| `PUT /auth/logout` | "Sign out" in the authenticated header |
| `PUT /auth/change-password` | `/change-password` |
| `POST /auth/forgot-password` | `/forgot-password` |
| `POST /auth/verify-reset-otp` | `/verify-reset-otp` |
| `POST /auth/reset-password` | `/reset-password` |
| `POST /auth/company/setup-account` | `/company/setup-account` |

Notes on backend behavior this UI follows on purpose:

- Public registration only ever creates a **job seeker** account (`role_id` is server-assigned) — the register form doesn't ask for a role. Company accounts are provisioned by an admin and activated through `/company/setup-account`, which is linked from both the login and register pages.
- The reset-password flow has no dedicated resend endpoint, so "resend code" on `/verify-reset-otp` re-calls `forgot-password`, matching what the backend actually supports.
- Validation errors come back from the backend as `{ result: false, message, errors: [...] }` (Joi, one entry per failed rule); single-message failures (wrong password, expired OTP, etc.) come back as just `{ result, message }`. `api/client.js` normalizes both into one `ApiError` shape so every form can render either as a list.

## Structure

```
src/
  api/            axios client + one function per backend endpoint
  stores/         auth (session/token) and toast (notifications)
  router/         routes + guest/auth guards
  components/
    ui/           BaseInput, PasswordInput, OtpInput, BaseButton, FormErrors, ToastHost
    brand/         AuthShell (split-screen auth layout), AppShell (authenticated layout), SkillConstellation
  views/auth/     one view per auth page
  views/          DashboardView, NotFoundView
```

## Not built yet

Role-specific dashboards (admin/company panels), and everything past auth — jobs, applications, profiles, etc. `roleHome()` in `src/constants/roles.js` currently sends every role to the same `/dashboard` placeholder; that's the seam to extend once those areas exist.
