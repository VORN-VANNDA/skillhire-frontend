import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import * as adminApi from '@/api/admin'

export const useAdminStore = defineStore('admin', () => {
  const loading = ref(false)
  const error = ref('')

  const dashboard = ref(null)
  const companies = ref([])
  const users = ref([])
  const selectedCompany = ref(null)
  const selectedUser = ref(null)

  async function withLoading(fn) {
    loading.value = true
    error.value = ''
    try {
      return await fn()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchDashboard() {
    return withLoading(async () => {
      const { data } = await adminApi.getDashboard()
      dashboard.value = data
      return data
    })
  }

  async function fetchCompanies(params) {
    return withLoading(async () => {
      const { data } = await adminApi.getAllCompanies(params)
      companies.value = Array.isArray(data) ? data : data.companies || []
      return companies.value
    })
  }

  async function fetchCompanyById(id) {
    return withLoading(async () => {
      const { data } = await adminApi.getCompanyById(id)
      selectedCompany.value = data
      return data
    })
  }

  async function createCompany(payload) {
    return withLoading(async () => {
      const { data } = await adminApi.createCompany(payload)
      companies.value.push(data)
      return data
    })
  }

  async function updateCompany(id, payload) {
    return withLoading(async () => {
      const { data } = await adminApi.updateCompany(id, payload)
      const index = companies.value.findIndex(c => c.id === id)
      if (index >= 0) {
        companies.value[index] = data
      }
      return data
    })
  }

  async function blockCompany(id) {
    return withLoading(async () => {
      const { data } = await adminApi.blockCompany(id)
      const index = companies.value.findIndex(c => c.id === id)
      if (index >= 0) {
        companies.value[index] = data
      }
      return data
    })
  }

  async function activateCompany(id) {
    return withLoading(async () => {
      const { data } = await adminApi.activateCompany(id)
      const index = companies.value.findIndex(c => c.id === id)
      if (index >= 0) {
        companies.value[index] = data
      }
      return data
    })
  }

  async function fetchUsers(params) {
    return withLoading(async () => {
      const { data } = await adminApi.getAllUsers(params)
      users.value = Array.isArray(data) ? data : data.users || []
      return users.value
    })
  }

  async function fetchUserById(id) {
    return withLoading(async () => {
      const { data } = await adminApi.getUserById(id)
      selectedUser.value = data
      return data
    })
  }

  async function blockUser(id) {
    return withLoading(async () => {
      const { data } = await adminApi.blockUser(id)
      const index = users.value.findIndex(u => u.id === id)
      if (index >= 0) {
        users.value[index] = data
      }
      return data
    })
  }

  async function activateUser(id) {
    return withLoading(async () => {
      const { data } = await adminApi.activateUser(id)
      const index = users.value.findIndex(u => u.id === id)
      if (index >= 0) {
        users.value[index] = data
      }
      return data
    })
  }

  return {
    loading,
    error,
    dashboard,
    companies,
    users,
    selectedCompany,
    selectedUser,
    fetchDashboard,
    fetchCompanies,
    fetchCompanyById,
    createCompany,
    updateCompany,
    blockCompany,
    activateCompany,
    fetchUsers,
    fetchUserById,
    blockUser,
    activateUser,
  }
})
