import { useAdminStore } from '~/stores/admin.store'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const paymentPage = [
    'challenge-id-register-group',
    'challenge-id-register-individual',
  ]
  if (!paymentPage.includes(from.name as string)) {
    return navigateTo('/')
  }
})
