import client from './client'

export async function getDashboard() {
  return client.get('/api/admin/dashboard')
}

export async function getAllCompanies(params = {}) {
  return client.get('/api/admin/companies', { params })
}

export async function getCompanyById(id) {
  return client.get(`/api/admin/companies/${id}`)
}

export async function createCompany(payload) {
  return client.post('/api/admin/companies', payload)
}

export async function updateCompany(id, payload) {
  return client.put(`/api/admin/companies/${id}`, payload)
}

export async function blockCompany(id) {
  return client.put(`/api/admin/companies/${id}/block`)
}

export async function activateCompany(id) {
  return client.put(`/api/admin/companies/${id}/activate`)
}

export async function getAllUsers(params = {}) {
  return client.get('/api/admin/users', { params })
}

export async function getUserById(id) {
  return client.get(`/api/admin/users/${id}`)
}

export async function blockUser(id) {
  return client.put(`/api/admin/users/${id}/block`)
}

export async function activateUser(id) {
  return client.put(`/api/admin/users/${id}/activate`)
}
