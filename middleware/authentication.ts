import { useAdminStore } from '~/stores/admin.store'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  const adminStore = useAdminStore()
  const accessToken = useCookie('access-token')
  const refreshToken = useCookie('refresh-token')
  const xAccessToken = useCookie('x-access-token')
  const xRefreshToken = useCookie('x-refresh-token')

  const authUserPaths = ['/signin', '/signup']
  const authAdminPaths = ['/admin/signin']
  
  const privateAdminRouteName = [
    "admin-profile",
    "admin-payment",
    "admin-athletes",
    "challenge-create",
    "challenge-id-edit",
    "article-create",
    "article-id-edit"
  ]
  
  const privateUserRouteName = [
    'challenge-id-register-group',
    'challenge-id-register-individual',
    'profile-id',
  ]

  if (!userStore.user && (accessToken.value || refreshToken.value)) {
    console.log('has user refresh-token')
    await userStore.refreshToken()
  }

  if (!adminStore.user && (xAccessToken.value || xRefreshToken.value)) {
    await adminStore.refreshToken()
  }

  if (userStore.user && authUserPaths.some((p) => p === to.fullPath)) {
    return navigateTo('/')
  }

  if (!userStore.user && privateUserRouteName.includes(to.name as string)) {
    return navigateTo('/')
  }

  if (adminStore.user && authAdminPaths.some((p) => to.fullPath.includes(p))) {
    return navigateTo('/')
  }

  if (!adminStore.user && privateAdminRouteName.includes(to.name as string)) {
    return navigateTo('/')
  }
})
