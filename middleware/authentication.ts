import { useAdminStore } from '~/stores/admin.store'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (from) => {
  const userStore = useUserStore()
  const adminStore = useAdminStore()
})
