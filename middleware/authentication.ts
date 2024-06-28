import { useAdminStore } from '~/stores/admin.store'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (from) => {
  const userStore = useUserStore()
  const adminStore = useAdminStore()
  const accessToken = useCookie('access-token')
  const refreshToken = useCookie('refresh-token')
  const xAccessToken = useCookie('x-access-token')
  const xRefreshToken = useCookie('x-refresh-token')

  console.log('userStore', userStore.user)
  console.log('adminStore', adminStore.user)

  if (!userStore.user && (accessToken.value || refreshToken.value)) {
    userStore.refreshToken()
  }

  if (!adminStore.user && (xAccessToken.value || xRefreshToken.value)) {
    adminStore.refreshToken()
  }
})
