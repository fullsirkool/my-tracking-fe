import { useAdminStore } from '~/stores/admin.store'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  const adminStore = useAdminStore()
  const accessToken = useCookie('access-token')
  const refreshToken = useCookie('refresh-token')
  const xAccessToken = useCookie('x-access-token')
  const xRefreshToken = useCookie('x-refresh-token')

  const publicPaths = ['/profile/']
  const authUserPaths = ['/signin', '/signup']
  const authAdminPaths = ['/admin/signin']
  const privateAdminPaths = [
    '/admin/profile',
    '/admin/payment',
    '/challenge/create',
  ]

  const isSignedIn = computed(
    () => adminStore.isSignedIn || userStore.isSignedIn,
  )
  // DEBUG
  console.log('isSignedIn', isSignedIn.value)
  console.log('to.fullPath', to.fullPath)
  console.log('userStore.user', userStore.user)
  console.log('adminStore.user', adminStore.user)
  console.log(
    'accessToken.value || refreshToken.value',
    accessToken.value || refreshToken.value,
  )
  console.log(
    'xAccessToken.value || xRefreshToken.value',
    xAccessToken.value || xRefreshToken.value,
  )

  if (!userStore.user && (accessToken.value || refreshToken.value)) {
    console.log('has user refresh-token')
    await userStore.refreshToken()
  }

  if (!adminStore.user && (xAccessToken.value || xRefreshToken.value)) {
    console.log('has admin refresh-token')
    await adminStore.refreshToken()
  }

  if (userStore.user && authUserPaths.some((p) => p === to.fullPath)) {
    return navigateTo('/')
  }

  if (userStore.user && to.fullPath === '/profile') {
    return navigateTo('/profile/' + userStore.user.id)
  }

  if (adminStore.user && authAdminPaths.some((p) => to.fullPath.includes(p))) {
    return navigateTo('/')
  }

  if (!adminStore.user && privateAdminPaths.some((p) => p === to.fullPath)) {
    return navigateTo('/')
  }
})
