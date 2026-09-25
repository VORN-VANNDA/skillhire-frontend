// Matches the fixed seed order of the `roles` table (scripts/script.sql).
export const ROLES = {
  ADMIN: 1,
  COMPANY: 2,
  JOB_SEEKER: 3,
}

export const ROLE_NAMES = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.COMPANY]: 'Company',
  [ROLES.JOB_SEEKER]: 'Job seeker',
}

export function roleName(roleId) {
  return ROLE_NAMES[Number(roleId)] || 'Account'
}

export function roleHome(roleId) {
  switch (Number(roleId)) {
    case ROLES.ADMIN:
      return '/admin/dashboard'
    case ROLES.COMPANY:
      return '/dashboard'
    case ROLES.JOB_SEEKER:
      return '/dashboard'
    default:
      return '/dashboard'
  }
}
