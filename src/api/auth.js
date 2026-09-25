import client from './client'

// Every call below maps 1:1 to routes/auth.js on the backend.
// Response envelope is always { result, message, data? }; the
// axios interceptor in ./client already unwraps response.data.

export function register({ fullName, phoneNumber, email, password }) {
  return client.post('/auth/register', {
    full_name: fullName,
    phone_number: phoneNumber,
    email,
    password,
  })
}

export function verifyOtp({ email, otp }) {
  return client.post('/auth/verify-otp', { email, otp })
}

export function resendOtp({ email }) {
  return client.post('/auth/resend-otp', { email })
}

export function login({ email, password }) {
  return client.post('/auth/login', { email, password })
}

export function getMe() {
  return client.get('/auth/me')
}

export function logout() {
  return client.put('/auth/logout')
}

export function changePassword({ oldPassword, newPassword, confirmPassword }) {
  return client.put('/auth/change-password', {
    oldPassword,
    newPassword,
    confirmPassword,
  })
}

export function forgotPassword({ email }) {
  return client.post('/auth/forgot-password', { email })
}

export function verifyResetOtp({ email, otp }) {
  return client.post('/auth/verify-reset-otp', { email, otp })
}

export function resetPassword({ email, otp, newPassword, confirmPassword }) {
  return client.post('/auth/reset-password', { email, otp, newPassword, confirmPassword })
}

// Admin creates a company with a temporary OTP; the company uses it once
// here to set their own password and activate the account.
export function setupCompanyAccount({ email, otp, newPassword, confirmPassword }) {
  return client.post('/auth/company/setup-account', {
    email,
    otp,
    newPassword,
    confirmPassword,
  })
}
