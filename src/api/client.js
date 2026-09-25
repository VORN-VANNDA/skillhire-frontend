import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach the bearer token to every request once an auth store exists.
// Set lazily (instead of imported at module scope) to avoid a circular
// import between the client and the Pinia store that also needs the client.
let getToken = () => null
export function registerTokenGetter(fn) {
  getToken = fn
}

client.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Normalize every failure into a single ApiError shape so views never
// have to branch on Joi's `errors` array vs. a plain `message` string.
export class ApiError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors || null
  }
}

let onUnauthorized = () => {}
export function registerUnauthorizedHandler(fn) {
  onUnauthorized = fn
}

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    const body = error.response?.data

    if (status === 401) {
      onUnauthorized()
    }

    const message =
      body?.errors?.[0] ||
      body?.message ||
      error.message ||
      'Something went wrong. Please try again.'

    return Promise.reject(new ApiError(message, { status, errors: body?.errors }))
  },
)

export default client
