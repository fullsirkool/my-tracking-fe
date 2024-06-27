import { useAdminStore } from '~/stores/admin.store'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (from, to) => {
  const userStore = useUserStore()
  const adminStore = useAdminStore()

  console.log('userStore.user', userStore.user)
  console.log('adminStore.user', adminStore.user)

  if (userStore.user && to.fullPath.endsWith('/profile')) {
    return navigateTo(`/profile/${userStore.user.id}`)
  }

  if (adminStore.user && to.fullPath.endsWith('/profile')) {
    return navigateTo(`/admin/profile/${adminStore.user.id}`)
  }

  return navigateTo('/signin')
})
